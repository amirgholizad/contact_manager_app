import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a timestamp into a standard date string
 * @param timestamp Unix timestamp in milliseconds
 * @returns Formatted date string (Month Day, Year)
 */
export function formatDate(timestamp: number): string {
  const date = new Date(timestamp)
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  return date.toLocaleDateString("en-US", options)
}
