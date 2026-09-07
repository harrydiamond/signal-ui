import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Textarea } from './Textarea.tsx'

describe('Textarea', () => {
  it('forwards a ref to the textarea', () => {
    const ref = createRef<HTMLTextAreaElement>()
    render(<Textarea aria-label="Notes" ref={ref} defaultValue="Cue 14" />)
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement)
    expect(ref.current).toBe(screen.getByLabelText('Notes'))
  })
})
