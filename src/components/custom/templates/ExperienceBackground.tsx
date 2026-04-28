import { FC } from "react";

type ExperienceBackgroundProps = {
  children: React.ReactNode;
};

const EditorialGridBackground: FC<ExperienceBackgroundProps> = ({ children }) => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(69,110,255,0.16),transparent_34%),radial-gradient(circle_at_85%_18%,rgba(255,0,128,0.14),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.92),rgba(247,248,252,0.98))]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(12,20,34,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(12,20,34,0.05)_1px,transparent_1px)] bg-[size:36px_36px] opacity-55" />
      <div className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(247,248,252,0),rgba(247,248,252,0.82))]" />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
};

const BACKGROUNDS = {
  editorialGrid: {
    component: EditorialGridBackground,
  },
};

const ExperienceBackground: FC<ExperienceBackgroundProps> = ({ children }) => {
  const currentComponent = BACKGROUNDS.editorialGrid;
  const Component = currentComponent.component;

  return <Component>{children}</Component>;
};

export default ExperienceBackground;
