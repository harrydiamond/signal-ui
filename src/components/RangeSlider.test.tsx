import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import {
  RangeSlider,
  SLIDER_LED_COLS_FALLBACK,
  SLIDER_LED_ROWS,
} from './RangeSlider.tsx'

describe('RangeSlider', () => {
  it('renders labels and current value', () => {
    render(
      <RangeSlider
        id="res"
        min={0}
        max={4}
        step={1}
        value={2}
        onChange={() => {}}
        minLabel="SD"
        maxLabel="4K"
        ariaLabel="Resolution"
      />,
    )
    expect(screen.getByLabelText('Resolution')).toHaveValue('2')
    expect(screen.getByText('SD')).toBeInTheDocument()
    expect(screen.getByText('4K')).toBeInTheDocument()
  })

  it('calls onChange when the value changes', () => {
    const onChange = vi.fn()
    render(
      <RangeSlider
        id="fps"
        min={0}
        max={5}
        step={1}
        value={2}
        onChange={onChange}
        minLabel="24"
        maxLabel="120"
        ariaLabel="Frame rate"
      />,
    )
    fireEvent.change(screen.getByLabelText('Frame rate'), {
      target: { value: '4' },
    })
    expect(onChange).toHaveBeenCalledWith(4)
  })

  it('applies quality variant class and accent style', () => {
    render(
      <RangeSlider
        id="quality"
        min={0}
        max={9}
        step={1}
        value={9}
        onChange={() => {}}
        minLabel="0%"
        maxLabel="100%"
        ariaLabel="Quality"
        variant="quality"
      />,
    )
    const input = screen.getByLabelText('Quality')
    expect(input.className).toContain('tool-slider--quality')
    expect(input.style.getPropertyValue('--slider-pct')).toBe('100%')
    expect(input.style.getPropertyValue('--slider-accent')).toContain('hsl')
  })

  it('renders a multi-row LED matrix track', () => {
    const { container } = render(
      <RangeSlider
        id="led"
        min={0}
        max={4}
        step={1}
        value={2}
        onChange={() => {}}
        minLabel="Low"
        maxLabel="High"
        ariaLabel="Level"
      />,
    )
    const track = container.querySelector('[aria-hidden="true"]')
    expect(track?.children).toHaveLength(
      SLIDER_LED_COLS_FALLBACK * SLIDER_LED_ROWS,
    )
  })
})
