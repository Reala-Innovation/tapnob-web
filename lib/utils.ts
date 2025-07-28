import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleContactClick = () => {
  if (typeof window !== "undefined") {
    window.open(
      "https://wa.me/2347063702228?text=Hello%20Tapnob%20Support,%20I%20need%20help",
      "_blank"
    );
  }
};
