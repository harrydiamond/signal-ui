import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge class names with Tailwind conflict resolution. */
export function cx(...parts: ClassValue[]): string {
  return twMerge(clsx(parts))
}
