type Props = {
  name?: string
  tld?: string
  className?: string
}

/** Signal name + quieter ink TLD. Size inherits from the parent. */
export function BrandMark({ name = 'avtech', tld = '.fyi', className }: Props) {
  return (
    <span className={className}>
      <span className="text-av-signal">{name}</span>
      <span className="text-av-ink font-medium tracking-wide">{tld}</span>
    </span>
  )
}
