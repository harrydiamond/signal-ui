import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Theme } from './Theme.tsx'
import { Portal } from './Portal.tsx'

describe('Portal', () => {
  it('renders into document.body and copies the nearest theme', () => {
    render(
      <Theme theme="editorial">
        <p>Page</p>
        <Portal>
          <span>Portaled</span>
        </Portal>
      </Theme>,
    )

    const overlay = document.body.querySelector('[data-av-overlay]')
    expect(overlay).toBeTruthy()
    expect(overlay).toHaveAttribute('data-av-theme', 'editorial')
    expect(overlay).toHaveClass('av-theme')
    expect(overlay).toHaveTextContent('Portaled')
    expect(screen.getByText('Page')).toBeInTheDocument()
  })

  it('mounts into a custom container', () => {
    const mount = document.createElement('div')
    document.body.appendChild(mount)
    render(
      <Theme>
        <Portal container={mount}>
          <span>Custom</span>
        </Portal>
      </Theme>,
    )
    expect(mount).toHaveTextContent('Custom')
    mount.remove()
  })
})
