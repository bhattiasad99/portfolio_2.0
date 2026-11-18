import type { ReactNode } from "react";

type WorkBackgroundProps = {
  media: ReactNode;
  children: ReactNode;
};

export default function WorkBackground({
  media,
  children,
}: WorkBackgroundProps) {
  return (
    <>
      <div className="absolute inset-0 bg-[#101413]" aria-hidden="true">
        {media}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,15,14,.32),rgba(8,15,14,.14)_25%,rgba(8,15,14,.85)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,15,14,.65),transparent_80%)]" />
      </div>
      {children}
    </>
  );
}
