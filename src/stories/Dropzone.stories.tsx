import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent } from 'storybook/test'
import { Dropzone } from '../components/Dropzone.tsx'
import { withStoryPad } from './StoryPad.tsx'

const meta = {
  title: 'Components/Dropzone',
  component: Dropzone,
  decorators: [withStoryPad],
  args: {
    label: 'Drop a patch, or click to browse',
    hint: 'JSON or YAML',
    onFiles: fn(),
  },
  parameters: {
    docs: {
      description: {
        component:
          'Fill-based file drop. Dragging lights a signal edge; a chosen file uses the audio wash. Pass icon and copy from the app.',
      },
    },
  },
} satisfies Meta<typeof Dropzone>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas, canvasElement, args }) => {
    await expect(
      canvas.getByRole('button', {
        name: 'Drop a patch, or click to browse',
      }),
    ).toBeVisible()
    const input = canvasElement.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement
    const file = new File(['ok'], 'show.json', { type: 'application/json' })
    await userEvent.upload(input, file)
    await expect(args.onFiles).toHaveBeenCalled()
  },
}

export const WithFile: Story = {
  args: {
    hasFiles: true,
    label: 'show.json',
    hint: 'Click to replace',
  },
}

export const Disabled: Story = {
  args: { disabled: true },
}
