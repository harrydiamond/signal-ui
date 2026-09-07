import type { ReactNode } from 'react'
import type { Decorator } from '@storybook/react-vite'
import { Container } from '../components/Container.tsx'
import { Theme } from '../components/Theme.tsx'

type Props = {
  children: ReactNode
  /** Constrain and pad like a tool page. */
  pad?: boolean
  /** Full-viewport page chrome. Off on docs so previews shrink to content. */
  asPage?: boolean
}

export function StoryPad({ children, pad = true, asPage = false }: Props) {
  return (
    <Theme asPage={asPage}>
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

export const withStoryPad: Decorator = (Story, context) => (
  <StoryPad asPage={context.viewMode === 'story'}>
    <Story />
  </StoryPad>
)
