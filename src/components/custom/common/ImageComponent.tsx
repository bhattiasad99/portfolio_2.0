import Image from "next/image";
import type { ImageProps } from "next/image";

type ImageComponentProps = Omit<ImageProps, "src"> & {
  source?: ImageProps["src"];
  src?: ImageProps["src"];
};

const ImageComponent = ({ alt = "", source, src, ...props }: ImageComponentProps) => {
  const imageSrc = src ?? source;

  if (!imageSrc) {
    return null;
  }

  return <Image alt={alt} src={imageSrc} {...props} />;
};

export default ImageComponent;
