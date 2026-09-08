import { render, screen } from '@testing-library/react'
import { fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Dropzone } from './Dropzone.tsx'

describe('Dropzone', () => {
  it('exposes a button and reports dropped files', () => {
    const onFiles = vi.fn()
    render(
      <Dropzone
        label="Drop a patch"
        hint="JSON or YAML"
        onFiles={onFiles}
      />,
    )
    const button = screen.getByRole('button', { name: 'Drop a patch' })
    expect(button).toBeInTheDocument()
    expect(screen.getByText('JSON or YAML')).toBeInTheDocument()

    const file = new File(['ok'], 'show.json', { type: 'application/json' })
    fireEvent.drop(button, {
      dataTransfer: { files: [file] },
    })
    expect(onFiles).toHaveBeenCalledTimes(1)
    expect(onFiles.mock.calls[0][0][0]).toBe(file)
    expect(button).toHaveAttribute('data-has-files', 'true')
  })

  it('does not accept drops when disabled', () => {
    const onFiles = vi.fn()
    render(<Dropzone disabled onFiles={onFiles} label="Drop files" />)
    fireEvent.drop(screen.getByRole('button', { name: 'Drop files' }), {
      dataTransfer: { files: [new File(['x'], 'x.txt')] },
    })
    expect(onFiles).not.toHaveBeenCalled()
  })
})
