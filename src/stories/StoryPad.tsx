import type { ReactNode } from 'react'
import type { Decorator } from '@storybook/react-vite'
import { Container } from '../components/Container.tsx'
import { Theme, type ThemeName } from '../components/Theme.tsx'

type Props = {
  children: ReactNode
  /** Constrain and pad like a tool page. */
  pad?: boolean
  /** Full-viewport page shell. Off on docs so previews shrink to content. */
  asPage?: boolean
  theme?: ThemeName
}

export function StoryPad({
  children,
  pad = true,
  asPage = false,
  theme = 'phosphor',
}: Props) {
  return (
    <Theme asPage={asPage} theme={theme}>
      {pad ? (
        asPage ? (
          <Container>{children}</Container>
        ) : (
          <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6">
            {children}
          </div>
        )
      ) : (
        children
      )}
    </Theme>
  )
}

export const withStoryPad: Decorator = (Story, context) => {
  const theme = (context.globals.theme as ThemeName | undefined) ?? 'phosphor'
  return (
    <StoryPad asPage={context.viewMode === 'story'} theme={theme}>
      <Story />
    </StoryPad>
  )
}
