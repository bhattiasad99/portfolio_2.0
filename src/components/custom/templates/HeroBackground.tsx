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
        <HexagonBackground
            backgroundClassName="[mask-image:linear-gradient(to_bottom,#000_0%,#000_62%,transparent_88%)] [-webkit-mask-image:linear-gradient(to_bottom,#000_0%,#000_62%,transparent_88%)]"
            hexagonSize={96}
            hexagonMargin={4}
        >
            <div className="pointer-events-none relative z-[2]">
                {children}
            </div>
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
