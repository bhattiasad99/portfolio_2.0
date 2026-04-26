import React, { FC } from "react";

import { cn } from "@/lib/utils";

type IProps = {
    showContent: boolean;
};

const Hero: FC<IProps> = ({ showContent }) => {
    return (
        <section
            className={cn(
                "relative z-[1] grid min-h-dvh pointer-events-none place-items-center p-8 opacity-0 [transform:translateY(64px)_scale(0.98)] [transition:opacity_780ms_ease,_transform_780ms_cubic-bezier(0.22,1,0.36,1)]",
                showContent && "opacity-100 [transform:translateY(0)_scale(1)]"
            )}
        >
            <h1 className="m-0 text-[clamp(3rem,12vw,7rem)] font-semibold tracking-[-0.07em]">
                Hello world
            </h1>
        </section>
    );
};

export default Hero;
