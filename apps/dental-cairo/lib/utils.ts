import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formats a number of Egyptian pounds, e.g. 12500 -> "12,500 EGP". */
export function formatEgp(amount: number) {
  return `${new Intl.NumberFormat("en-EG").format(amount)} EGP`;
}
