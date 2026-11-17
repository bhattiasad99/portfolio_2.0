"use client";

import { useEffect, useState } from "react";
import {
  ORIGINAL_PORTRAIT_URL,
  PORTFOLIO_MEDIA,
} from "@/config/portfolio-media";

type AssetName = keyof typeof PORTFOLIO_MEDIA;
export type PortfolioMedia = {
  portrait: string;
  poster: string;
  video: string;
  progress: number;
  settled: boolean;
  degraded: boolean;
};

function decodeAsset(url: string, name: AssetName): Promise<void> {
  if (name !== "video") {
    const image = new Image();
    image.src = url;
    return image.decode();
  }

  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    const cleanup = () => {
      clearTimeout(timeout);
      video.removeAttribute("src");
      video.load();
    };
    const timeout = window.setTimeout(() => {
      cleanup();
      reject(new Error("Video decoding timed out"));
    }, 6000);
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.onloadeddata = () => {
      cleanup();
      resolve();
    };
    video.onerror = () => {
      cleanup();
      reject(new Error("Video decoding failed"));
    };
    video.src = url;
  });
}

export function usePortfolioMedia(): PortfolioMedia {
  const [media, setMedia] = useState<PortfolioMedia>({
    portrait: "",
    poster: "",
    video: "",
    progress: 0,
    settled: false,
    degraded: false,
  });

  useEffect(() => {
    const controller = new AbortController();
    const objectUrls: string[] = [];
    const completed: Partial<Record<AssetName, string>> = {};
    const fractions = { portrait: 0, poster: 0, video: 0 };
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const names: AssetName[] = reducedMotion
      ? ["portrait", "poster"]
      : ["portrait", "poster", "video"];
    let disposed = false;
    let degraded = false;
    const timeout = window.setTimeout(() => controller.abort(), 25000);

    const report = () => {
      if (disposed) return;
      const fraction =
        names.reduce((sum, name) => sum + fractions[name], 0) / names.length;
      setMedia((previous) => ({
        ...previous,
        ...completed,
        progress: Math.round(fraction * 100),
      }));
    };

    const download = async (name: AssetName) => {
      try {
        let response = await fetch(PORTFOLIO_MEDIA[name], {
          signal: controller.signal,
        }).catch((error) => {
          if (name !== "portrait" || controller.signal.aborted) throw error;
          // Some hosts omit CORS headers on a missing optimized portrait.
          return fetch(ORIGINAL_PORTRAIT_URL, { signal: controller.signal });
        });
        if (name === "portrait" && response.status === 404) {
          response = await fetch(ORIGINAL_PORTRAIT_URL, {
            signal: controller.signal,
          });
        }
        if (!response.ok) throw new Error("Asset download failed");
        const total = Number(response.headers.get("Content-Length")) || 0;
        const chunks: Uint8Array<ArrayBuffer>[] = [];
        const reader = response.body?.getReader();
        let blob: Blob;
        if (reader) {
          let received = 0;
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            chunks.push(value);
            received += value.byteLength;
            if (total) {
              fractions[name] = Math.min(0.95, (received / total) * 0.95);
              report();
            }
          }
          blob = new Blob(chunks, {
            type: response.headers.get("Content-Type") ?? "",
          });
        } else {
          blob = await response.blob();
        }
        if (disposed) return;
        const url = URL.createObjectURL(blob);
        objectUrls.push(url);
        await decodeAsset(url, name);
        if (disposed) return;
        completed[name] = url;
      } catch {
        degraded = true;
        // The page stays usable when a remote asset fails or a download times out.
        if (name === "portrait") completed.portrait = "/img/hero.png";
      }
      fractions[name] = 1;
      report();
    };

    void Promise.allSettled(names.map(download)).then(() => {
      clearTimeout(timeout);
      if (!disposed) {
        setMedia((previous) => ({
          ...previous,
          ...completed,
          progress: 100,
          settled: true,
          degraded,
        }));
      }
    });

    return () => {
      disposed = true;
      clearTimeout(timeout);
      controller.abort();
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  return media;
}
