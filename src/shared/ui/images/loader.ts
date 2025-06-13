import {BASE_URL} from "@root/site.config";

export const imgLoader = ({
  src,
  width,
  quality,
}: {
src: string;
width: number;
quality?: number;
}): string => {
return `${BASE_URL}${src}?w=${width}&q=${quality || 75}`;
};