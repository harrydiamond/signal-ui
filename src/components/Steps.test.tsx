import { render, screen } from '@testing-library/react'
import { fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Step, Steps } from './Steps.tsx'

function Demo({
  onChange,
}: {
  onChange?: (value: string) => void
}) {
  return (
    <Steps defaultValue="art" label="Studio" onChange={onChange}>
      <Step value="art" label="Artwork" complete />
      <Step value="song" label="Song" />
      <Step value="loop" label="Loop" />
    </Steps>
  )
}

describe('Steps', () => {
  it('marks the current step and announces position', () => {
    render(<Demo />)
    const current = screen.getByRole('button', {
      name: 'Artwork, step 1 of 3, complete',
    })
    expect(current).toHaveAttribute('aria-current', 'step')
    expect(
      screen.getByRole('button', { name: 'Song, step 2 of 3' }),
    ).not.toHaveAttribute('aria-current')
  })

  it('selects a step on click', () => {
    const onChange = vi.fn()
    render(<Demo onChange={onChange} />)
    fireEvent.click(screen.getByRole('button', { name: 'Song, step 2 of 3' }))
    expect(onChange).toHaveBeenCalledWith('song')
    expect(
      screen.getByRole('button', { name: 'Song, step 2 of 3' }),
    ).toHaveAttribute('aria-current', 'step')
  })

  it('moves selection with arrow keys', () => {
    render(<Demo />)
    const list = screen.getByRole('list', { name: 'Studio' })
    screen.getByRole('button', { name: 'Artwork, step 1 of 3, complete' }).focus()
    fireEvent.keyDown(list, { key: 'ArrowRight' })
    expect(
      screen.getByRole('button', { name: 'Song, step 2 of 3' }),
    ).toHaveAttribute('aria-current', 'step')
    expect(
      screen.getByRole('button', { name: 'Song, step 2 of 3' }),
    ).toHaveFocus()
  })
})
