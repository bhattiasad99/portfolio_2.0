import { FC } from "react";

type ExperienceBackgroundProps = {
  children: React.ReactNode;
};

const EditorialGridBackground: FC<ExperienceBackgroundProps> = ({ children }) => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-white" />
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
