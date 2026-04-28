"use client";

import { useCallback, useRef, type MouseEvent, type ReactNode } from "react";
import gsap from "gsap";

import { cn } from "@/lib/utils";

const TRAIL_IMAGES = [
  "https://assets.codepen.io/16327/Revised+Flair.png",
  "https://assets.codepen.io/16327/Revised+Flair-1.png",
  "https://assets.codepen.io/16327/Revised+Flair-2.png",
  "https://assets.codepen.io/16327/Revised+Flair-3.png",
  "https://assets.codepen.io/16327/Revised+Flair-4.png",
  "https://assets.codepen.io/16327/Revised+Flair-5.png",
  "https://assets.codepen.io/16327/Revised+Flair-6.png",
  "https://assets.codepen.io/16327/Revised+Flair-7.png",
  "https://assets.codepen.io/16327/Revised+Flair-8.png",
];

type ImageTrailProps = {
  children: ReactNode;
  className?: string;
  gap?: number;
  imageSize?: number;
};

const ImageTrail = ({
  children,
  className,
  gap = 100,
  imageSize = 50,
}: ImageTrailProps) => {
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const indexRef = useRef(0);
  const lastMousePositionRef = useRef({ x: 0, y: 0 });
  const hasMousePositionRef = useRef(false);

  const playAnimation = useCallback((image: HTMLImageElement) => {
    gsap
      .timeline()
      .from(image, {
        opacity: 0,
        scale: 0,
        ease: "elastic.out(1,0.3)",
      })
      .to(
        image,
        {
          rotation: gsap.utils.random([-360, 360]),
        },
        "<"
      )
      .to(
        image,
        {
          y: "120vh",
          ease: "back.in(0.4)",
          duration: 1,
        },
        0
      );
  }, []);

  const animateImage = useCallback(
    (x: number, y: number) => {
      const images = imageRefs.current.filter(Boolean);

      if (!images.length) {
        return;
      }

      const image = images[indexRef.current % images.length];

      if (!image) {
        return;
      }

      gsap.killTweensOf(image);
      gsap.set(image, { clearProps: "all" });
      gsap.set(image, {
        opacity: 1,
        left: x,
        top: y,
        xPercent: -50,
        yPercent: -50,
      });

      playAnimation(image);
      indexRef.current += 1;
    },
    [playAnimation]
  );

  const handleMouseMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const mousePosition = {
        x: event.clientX,
        y: event.clientY,
      };

      if (!hasMousePositionRef.current) {
        lastMousePositionRef.current = mousePosition;
        hasMousePositionRef.current = true;
        animateImage(mousePosition.x, mousePosition.y);
        return;
      }

      const lastMousePosition = lastMousePositionRef.current;
      const travelDistance = Math.hypot(
        lastMousePosition.x - mousePosition.x,
        lastMousePosition.y - mousePosition.y
      );

      if (travelDistance > gap) {
        animateImage(mousePosition.x, mousePosition.y);
        lastMousePositionRef.current = mousePosition;
      }
    },
    [animateImage, gap]
  );

  const handleMouseLeave = useCallback(() => {
    hasMousePositionRef.current = false;
  }, []);

  return (
    <div
      className={cn("relative", className)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {children}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-50">
        {[...TRAIL_IMAGES, ...TRAIL_IMAGES].map((src, index) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={`${src}-${index}`}
            ref={(image) => {
              imageRefs.current[index] = image;
            }}
            alt=""
            className="pointer-events-none fixed opacity-0 will-change-transform"
            decoding="async"
            height={imageSize}
            src={src}
            style={{ width: imageSize }}
            width={imageSize}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageTrail;
