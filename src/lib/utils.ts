import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import crypto from "crypto"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateProductId() {
  const randomNumbers = crypto.randomInt(0, 1e12).toString().padStart(12, '0');
  return `PE${randomNumbers}`;
}