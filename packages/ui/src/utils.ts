import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          txt: [
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "subtitle1",
            "subtitle2",
            "subtitle3",
            "body1",
            "body2",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return customTwMerge(clsx(inputs));
}
