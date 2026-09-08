import type { ReactNode } from 'react'
import {
  ExternalLink,
  Link,
  MetaLabel,
  NavLink,
  SiteFooter,
  SiteNav,
  SkipLink,
  Theme,
  type ThemeName,
} from '../index.ts'

export function themeFromGlobals(globals: { theme?: string }): ThemeName {
  return (globals.theme as ThemeName | undefined) ?? 'phosphor'
}

/** Shared chrome for content-site example pages. */
export function SiteChrome({
  theme,
  active,
  children,
}: {
  theme: ThemeName
  active: 'work' | 'writing' | 'about'
  children: ReactNode
}) {
  return (
    <Theme asPage theme={theme}>
      <SkipLink />
      <SiteNav
        brand={
          <a href="#top" className="flex flex-col no-underline">
            <MetaLabel tone="ink">Northline</MetaLabel>
            <MetaLabel>Studio</MetaLabel>
          </a>
        }
        links={
          <>
            <NavLink href="#work" active={active === 'work'}>
              Work
            </NavLink>
            <NavLink href="#writing" active={active === 'writing'}>
              Writing
            </NavLink>
            <NavLink href="#about" active={active === 'about'}>
              About
            </NavLink>
          </>
        }
      />
      {children}
      <SiteFooter
        brand={<MetaLabel>Northline</MetaLabel>}
        links={
          <>
            <Link href="#privacy">Privacy</Link>
            <ExternalLink href="https://example.com">Archive</ExternalLink>
          </>
        }
        copyright="© Northline"
      />
    </Theme>
  )
}
