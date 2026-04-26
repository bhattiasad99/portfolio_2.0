import { HexagonBackground } from "@/components/animate-ui/components/backgrounds/hexagon";
import { FC } from "react";

type IProps = {
    children: React.ReactNode;
}

type HexagonBackgroundProps = {
    children: React.ReactNode;
}

const HexagonBackgroundComponent: FC<HexagonBackgroundProps> = ({ children }) => {
    return (
        <HexagonBackground hexagonSize={96} hexagonMargin={4}>
            <div className="pointer-events-none relative z-[2]">
                {children}
            </div>
            <div className="pointer-events-none absolute inset-x-0 -bottom-px z-[3] h-[34dvh] min-h-72 bg-[linear-gradient(to_bottom,rgba(255,255,255,0),var(--portfolio-bg)_72%,var(--portfolio-bg))]" />
        </HexagonBackground>
    )
}

const BACKGROUNDS = {
    hexagon: {
        component: HexagonBackgroundComponent
    }
}

const HeroBackground = ({ children }: IProps) => {
    const currentComponent = BACKGROUNDS.hexagon;
    const Component = currentComponent.component;
    return (
        <Component>
            {children}
        </Component>
    );
}

export default HeroBackground;
