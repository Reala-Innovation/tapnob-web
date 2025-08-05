import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleContactClick = () => {
  if (typeof window !== "undefined") {
    window.open("https://t.me/mubitech23", "_blank");
  }
};
