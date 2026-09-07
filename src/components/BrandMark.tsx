import { cx } from '../cx.ts'

type Props = {
  name?: string
  tld?: string
  className?: string
}

/** Signal name + quieter white TLD. Size inherits from the parent. */
export function BrandMark({ name = 'avtech', tld = '.fyi', className }: Props) {
  return (
    <span className={className}>
      <span className="text-av-signal">{name}</span>
      <span className="font-medium tracking-wide text-white">{tld}</span>
    </span>
  )
}
