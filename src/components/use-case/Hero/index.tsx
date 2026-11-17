"use client";

/* Blob URLs let the loader and the rendered scene share the downloaded media. */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from "react";
import gsap from "gsap";
import HeroBackground from "@/components/custom/templates/HeroBackground";
import WorkBackground from "@/components/custom/templates/WorkBackground";
import { PORTRAIT } from "@/config/portfolio-media";
import type { PortfolioMedia } from "@/hooks/use-portfolio-media";
import styles from "./hero.module.css";

type HeroProps = {
  showContent: boolean;
  media: PortfolioMedia;
};

const PROJECTS = [
  {
    title: "Project one",
    category: "Product design & engineering",
    style: "indigo",
  },
  { title: "Project two", category: "AI & automation", style: "sage" },
  { title: "Project three", category: "Cloud & integrations", style: "sand" },
];

function segment(value: number, start: number, end: number) {
  return Math.min(1, Math.max(0, (value - start) / (end - start)));
}

function smooth(value: number) {
  return value * value * (3 - 2 * value);
}

export default function Hero({ showContent, media }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLImageElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!showContent) return;
    const section = sectionRef.current!;
    const viewport = viewportRef.current!;
    const portrait = portraitRef.current!;
    const copy = copyRef.current!;
    const nav = navRef.current!;
    const reveal = revealRef.current!;
    const surface = surfaceRef.current!;
    const work = workRef.current!;
    const track = trackRef.current!;
    const video = videoRef.current!;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let target = 0;
    let progress = 0;
    let previousProgress = -1;
    let width = 1;
    let height = 1;
    let portraitWidth = 1;
    let portraitHeight = 1;
    let portraitLeft = 0;
    let portraitTop = 0;
    let startY = 0;
    let scrollDistance = 1;
    let travel = 0;

    const updateScroll = () => {
      target = segment(window.scrollY, startY, startY + scrollDistance);
    };

    const measure = () => {
      width = viewport.clientWidth;
      height = viewport.clientHeight;
      const mobile = width < 760;
      portraitHeight = mobile
        ? Math.min(height * 0.74, width * 1.22)
        : height * 0.99;
      portraitWidth = (portraitHeight * PORTRAIT.width) / PORTRAIT.height;
      portraitLeft = mobile
        ? width - portraitWidth
        : width * 0.96 - portraitWidth;
      portraitTop = height - portraitHeight;
      startY = section.getBoundingClientRect().top + window.scrollY;
      scrollDistance = Math.max(1, section.offsetHeight - height);
      travel = Math.max(0, track.scrollWidth - width + (mobile ? 24 : 64));
      portrait.style.width = `${portraitWidth}px`;
      portrait.style.height = `${portraitHeight}px`;
      portrait.style.left = `${portraitLeft}px`;
      portrait.style.top = `${portraitTop}px`;
      previousProgress = -1;
      updateScroll();
    };

    const render = () => {
      const p = progress;
      const zoomProgress = smooth(segment(p, 0.025, 0.57));
      const scale = Math.exp(Math.log(85) * zoomProgress);
      const pupilStartX = portraitLeft + portraitWidth * PORTRAIT.pupilX;
      const pupilStartY = portraitTop + portraitHeight * PORTRAIT.pupilY;
      const center = smooth(segment(p, 0.02, 0.34));
      const pupilX = gsap.utils.interpolate(pupilStartX, width / 2, center);
      const pupilY = gsap.utils.interpolate(pupilStartY, height / 2, center);
      const x = pupilX - portraitWidth * PORTRAIT.pupilX * scale - portraitLeft;
      const y = pupilY - portraitHeight * PORTRAIT.pupilY * scale - portraitTop;
      portrait.style.transform = `translate3d(${x}px,${y}px,0) scale(${scale})`;
      portrait.style.visibility = p >= 0.58 ? "hidden" : "visible";
      // Enter darkness while the original camera is still moving into the eye.
      const pupilDarkness = smooth(segment(p, 0.39, 0.47));
      portrait.style.filter = `brightness(${1 - pupilDarkness})`;
      const copyOpacity = 1 - segment(p, 0.015, 0.12);
      copy.style.opacity = String(copyOpacity);
      nav.style.opacity = String(copyOpacity);
      copy.inert = copyOpacity < 0.1;
      nav.inert = copyOpacity < 0.1;

      // The video stays at frame zero and invisible until the pupil is black.
      // Reveal the whole scene from that darkness instead of growing a disc.
      const videoReveal = smooth(segment(p, 0.47, 0.58));
      reveal.style.opacity = String(videoReveal);
      reveal.style.clipPath = "none";
      surface.style.transform = `scale(${1 + videoReveal * 0.1})`;

      const workOpacity = smooth(segment(p, 0.59, 0.65));
      work.style.opacity = String(workOpacity);
      work.inert = workOpacity < 0.98;
      work.style.visibility = workOpacity === 0 ? "hidden" : "visible";
      // Projects arrive after the reveal. The later scroll scrubs both the clip
      // and horizontal rail, with independent ranges and no autonomous playback.
      track.style.transform = `translate3d(${-travel * segment(p, 0.74, 0.98)}px,0,0)`;
    };

    const tick = (_time: number, deltaTime: number) => {
      if (motionQuery.matches) return;
      progress +=
        (target - progress) * (1 - Math.exp(-Math.min(deltaTime, 64) / 95));
      if (Math.abs(target - progress) < 0.00001) progress = target;
      if (Math.abs(progress - previousProgress) > 0.000001) {
        render();
        previousProgress = progress;
      }
      const seekTime =
        segment(progress, 0.66, 0.98) *
        Math.max(0, (video.duration || 0) - 0.045);
      if (
        video.readyState >= 2 &&
        !video.seeking &&
        Math.abs(video.currentTime - seekTime) > 1 / 48
      ) {
        video.currentTime = seekTime;
      }
    };

    const onMotionChange = () => {
      measure();
      if (!motionQuery.matches) render();
      else {
        // Restore CSS layout when the visitor switches motion preferences live.
        [portrait, copy, nav, reveal, surface, work, track].forEach((element) =>
          element.removeAttribute("style"),
        );
        copy.inert = false;
        nav.inert = false;
        work.inert = false;
        video.pause();
        if (video.readyState >= 1) video.currentTime = 0;
      }
    };

    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(track);
    measure();
    if (!motionQuery.matches) {
      progress = target;
      render();
    }
    gsap.ticker.add(tick);
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", measure);
    motionQuery.addEventListener("change", onMotionChange);

    return () => {
      gsap.ticker.remove(tick);
      observer.disconnect();
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", measure);
      motionQuery.removeEventListener("change", onMotionChange);
    };
  }, [showContent]);

  useEffect(() => {
    if (showContent) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [showContent]);

  const exploreWork = () => {
    const section = sectionRef.current!;
    const height = viewportRef.current!.clientHeight;
    const top = section.getBoundingClientRect().top + window.scrollY;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      workRef.current?.scrollIntoView({ behavior: "auto" });
      return;
    }
    window.scrollTo({
      top: top + (section.offsetHeight - height) * 0.65,
      behavior: "smooth",
    });
  };

  return (
    <HeroBackground>
      <section
        ref={sectionRef}
        className={styles.sequence}
        aria-label="Introduction and selected work"
      >
        <div ref={viewportRef} className={styles.viewport}>
          <header ref={navRef} className={styles.navigation}>
            <span className={styles.monogram}>AZB.</span>
            <a href="#experience">Experience ↗</a>
          </header>
          <img
            ref={portraitRef}
            src={media.portrait || "/img/hero.png"}
            alt="Asad Zubair Bhatti, in a thoughtful pose"
            width={3584}
            height={4800}
            className={styles.portrait}
            fetchPriority="high"
          />
          <div ref={copyRef} className={styles.introduction}>
            <p className={styles.eyebrow}>Software developer</p>
            <h1>
              Asad Zubair
              <br />
              Bhatti<span>.</span>
            </h1>
            <p className={styles.description}>
              Building thoughtful software.
              <br />
              From the first idea to production.
            </p>
            <button
              type="button"
              onClick={exploreWork}
              className={styles.explore}
            >
              Explore my work <span aria-hidden="true">↓</span>
            </button>
          </div>
          <div ref={revealRef} className={styles.reveal}>
            <WorkBackground
              media={
                <div ref={surfaceRef} className={styles.surface}>
                  {media.poster && (
                    <img src={media.poster} alt="" className={styles.footage} />
                  )}
                  <video
                    ref={videoRef}
                    src={media.video || undefined}
                    poster={media.poster || undefined}
                    muted
                    playsInline
                    preload="auto"
                    aria-hidden="true"
                    className={styles.footage}
                  />
                </div>
              }
            >
              <section
                ref={workRef}
                id="projects"
                className={styles.work}
                aria-label="Selected work"
              >
                <div className={styles.workHeading}>
                  <p className={styles.eyebrow}>Selected work</p>
                  <h2>Ideas, brought to life.</h2>
                  <p>Project previews · More details coming soon</p>
                </div>
                <div ref={trackRef} className={styles.projectTrack}>
                  {PROJECTS.map((project) => (
                    <article key={project.title} className={styles.project}>
                      <div
                        className={`${styles.projectPreview} ${styles[project.style]}`}
                        aria-hidden="true"
                      >
                        <div className={styles.previewWindow}>
                          <div className={styles.previewSidebar} />
                          <div className={styles.previewContent}>
                            <span />
                            <span />
                            <span />
                            <div />
                            <div />
                          </div>
                        </div>
                      </div>
                      <div className={styles.projectDetails}>
                        <p>{project.category}</p>
                        <h3>{project.title}</h3>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit.
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
                <span className={styles.scrollHint}>Scroll to explore →</span>
              </section>
            </WorkBackground>
          </div>
        </div>
      </section>
    </HeroBackground>
  );
}
