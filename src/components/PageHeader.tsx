import { Badge } from './Badge.tsx'
import { BrandMark } from './BrandMark.tsx'
import { Heading } from './Heading.tsx'
import { Link } from './Link.tsx'
import { Prose } from './Text.tsx'

type Props = {
  title: string
  description?: string
  badge?: string
  brand?: { name?: string; tld?: string; href?: string }
}

export function PageHeader({
  title,
  description,
  badge,
  brand = { name: 'avtech', tld: '.fyi', href: '/' },
}: Props) {
  return (
    <header className="border-av-hairline mb-8 border-b pb-6 sm:mb-10 sm:pb-8">
      <p className="text-av-muted m-0 text-sm font-medium">
        <Link href={brand.href ?? '/'}>
          <BrandMark name={brand.name} tld={brand.tld} />
        </Link>
      </p>
      {badge ? (
        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
          <Heading level={1}>{title}</Heading>
          <Badge label={badge} tone="meter" />
        </div>
      ) : (
        <Heading level={1} className="mt-2">
          {title}
        </Heading>
      )}
      {description ? <Prose className="mt-3">{description}</Prose> : null}
    </header>
  )
}
