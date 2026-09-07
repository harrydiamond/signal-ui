import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Choice } from './Choice.tsx'
import { ChoiceGroup, RadioGroup } from './ChoiceGroup.tsx'

describe('ChoiceGroup', () => {
  it('selects one chip at a time', () => {
    const onChange = vi.fn()
    render(
      <ChoiceGroup label="Mode" value="voltage" onChange={onChange}>
        <Choice value="voltage">voltage</Choice>
        <Choice value="power">power</Choice>
      </ChoiceGroup>,
    )
    expect(screen.getByRole('group', { name: 'Mode' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'power' }))
    expect(onChange).toHaveBeenCalledWith('power')
  })
})

describe('RadioGroup', () => {
  it('uses radio semantics and moves with arrows', () => {
    const onChange = vi.fn()
    render(
      <RadioGroup label="Mode" value="voltage" onChange={onChange}>
        <Choice value="voltage">voltage</Choice>
        <Choice value="power">power</Choice>
      </RadioGroup>,
    )
    const voltage = screen.getByRole('radio', { name: 'voltage' })
    expect(voltage).toHaveAttribute('aria-checked', 'true')
    voltage.focus()
    fireEvent.keyDown(screen.getByRole('radiogroup', { name: 'Mode' }), {
      key: 'ArrowRight',
    })
    expect(onChange).toHaveBeenCalledWith('power')
  })
})
