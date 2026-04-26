import { FC } from "react";
import Image from "next/image";
import {
    RiArrowRightUpLine,
    RiFolderOpenLine,
    RiGithubFill,
    RiMailSendLine,
} from "@remixicon/react";

import { cn } from "@/lib/utils";
import HeroBackground from "@/components/custom/templates/HeroBackground";
import { Button } from "@/components/ui/button";
import { BackgroundGradient } from "@/components/ui/background-gradient";

type IProps = {
    showContent: boolean;
};

const Hero: FC<IProps> = ({ showContent }) => {
    return (
        <HeroBackground>
            <section
                className={cn(
                    "pointer-events-none relative z-[1] grid min-h-dvh place-items-center px-6 py-16 opacity-0 [transform:translateY(64px)_scale(0.98)] [transition:opacity_780ms_ease,_transform_780ms_cubic-bezier(0.22,1,0.36,1)] sm:px-8 lg:px-12",
                    showContent && "opacity-100 [transform:translateY(0)_scale(1)]"
                )}
            >
                <div className="grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:gap-16">
                    <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
                        <p className="mb-5 inline-flex items-center border border-[var(--portfolio-line)] bg-[var(--portfolio-bg-elevated)]/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--portfolio-muted)] shadow-[0_16px_60px_rgba(15,23,42,0.08)] backdrop-blur-md">
                            Full-stack developer
                        </p>

                        <h1 className="m-0 text-balance text-[clamp(3.25rem,9vw,6.75rem)] font-semibold leading-[0.88] tracking-[-0.07em]">
                            Asad Zubair Bhatti
                        </h1>

                        <p className="mx-auto mt-6 max-w-xl text-balance text-lg font-medium leading-8 text-[var(--portfolio-muted)] sm:text-xl lg:mx-0">
                            Full-stack developer building AI-powered, cloud-ready products that feel sharp, fast, and human.
                        </p>

                        <div className="pointer-events-auto mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                            <Button asChild size="lg" className="h-12 px-5">
                                <a href="#contact">
                                    <RiMailSendLine data-icon="inline-start" />
                                    Get in touch
                                </a>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                size="lg"
                                className="h-12 bg-[var(--portfolio-bg-elevated)]/75 px-5 backdrop-blur-md"
                            >
                                <a
                                    href="https://github.com/Asad-Zubair-Bhatti"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <RiGithubFill data-icon="inline-start" />
                                    GitHub
                                    <RiArrowRightUpLine data-icon="inline-end" />
                                </a>
                            </Button>
                            <Button
                                asChild
                                variant="ghost"
                                size="lg"
                                className="h-12 px-5 text-[var(--portfolio-text)]"
                            >
                                <a href="#projects">
                                    <RiFolderOpenLine data-icon="inline-start" />
                                    Projects
                                </a>
                            </Button>
                        </div>
                    </div>

                    <div className="relative mx-auto grid w-full max-w-[420px] place-items-center lg:max-w-[460px]">
                        <div className="absolute -inset-6 border border-[var(--portfolio-line)] bg-[var(--portfolio-bg-elevated)]/40 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-sm [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]" />
                        <div className="absolute inset-8 border border-[var(--portfolio-primary)]/25 [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]" />
                        <BackgroundGradient
                            animate={true}
                            containerClassName="relative w-full shadow-[0_28px_90px_rgba(15,23,42,0.18)]"
                            className="aspect-square overflow-hidden rounded-sm border-[6px] border-neutral-200 bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(255,255,255,0.64))] ring-1 ring-[var(--portfolio-text)]/15 backdrop-blur-md"
                        >
                            <Image
                                src="/img/hero.png"
                                alt="Portrait of Asad Zubair Bhatti"
                                width={500}
                                height={500}
                                priority
                                sizes="(min-width: 1024px) 460px, min(86vw, 420px)"
                                className="size-full object-cover"
                            />
                        </BackgroundGradient>
                        <div className="absolute -bottom-5 left-4 border border-white/80 z-10 bg-[linear-gradient(135deg,rgba(255,255,255,0.94),rgba(255,255,255,0.72))] px-5 py-4 text-left shadow-[0_18px_60px_rgba(15,23,42,0.2)] ring-1 ring-[var(--portfolio-text)]/10 backdrop-blur-xl backdrop-saturate-150 sm:left-8">
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--portfolio-text)]/55">
                                AI + Cloud
                            </p>
                            <p className="mt-1 text-sm font-semibold text-[var(--portfolio-text)] sm:text-base">
                                Product Minded engineering
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </HeroBackground>
    );
};

export default Hero;
