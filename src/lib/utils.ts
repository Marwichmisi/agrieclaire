import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatHa(ha: number): string {
  if (ha < 0.01) return "< 0,01 ha";
  return `${ha.toFixed(2).replace(".", ",")} ha`;
}