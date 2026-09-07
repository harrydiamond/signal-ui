import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Heading } from './Heading.tsx'

describe('Heading', () => {
  it('renders a quieter caption at level 4', () => {
    render(<Heading level={4}>Caption heading</Heading>)
    const heading = screen.getByRole('heading', { level: 4 })
    expect(heading.className).toContain('uppercase')
    expect(heading.className).toContain('text-av-muted')
  })
})
