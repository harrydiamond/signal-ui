type CxPart = string | false | null | undefined

/** Join truthy class name parts. */
export function cx(...parts: CxPart[]): string {
  return parts.filter(Boolean).join(' ')
}
