import { FC } from "react";
import { DotGridBackground } from "@/components/animate-ui/components/backgrounds/dotgrid";

type ExperienceBackgroundProps = {
  children: React.ReactNode;
};

const DotGridBackgroundComponent: FC<ExperienceBackgroundProps> = ({ children }) => {
  return (
    <DotGridBackground
      dotColor="rgba(15,23,42,0.09)"
      dotSize={1.5}
      dotSpacing={26}
      fadeDirection="radial"
      className="bg-[#f7f8fc]"
    >
      {/* Horizontal rule accent at top */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--portfolio-line)] to-transparent" />
      <div className="relative z-[1]">{children}</div>
    </DotGridBackground>
  );
};

const BACKGROUNDS = {
  dotGrid: {
    component: DotGridBackgroundComponent,
  },
};

const ExperienceBackground: FC<ExperienceBackgroundProps> = ({ children }) => {
  const currentComponent = BACKGROUNDS.dotGrid;
  const Component = currentComponent.component;

  return <Component>{children}</Component>;
};

export default ExperienceBackground;
