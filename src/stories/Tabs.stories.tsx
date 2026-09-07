import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent } from 'storybook/test'
import { Tab, TabList, TabPanel, Tabs } from '../components/Tabs.tsx'
import { Prose } from '../components/Text.tsx'
import { withStoryPad } from './StoryPad.tsx'

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  decorators: [withStoryPad],
  parameters: {
    docs: {
      description: {
        component:
          'Hairline is the list rule. The selected tab is a signal underline, not a bordered chip.',
      },
    },
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { defaultValue: 'io' },
  render: args => (
    <Tabs {...args}>
      <TabList aria-label="Patch sections">
        <Tab value="io">I/O</Tab>
        <Tab value="map">Map</Tab>
        <Tab value="notes">Notes</Tab>
      </TabList>
      <TabPanel value="io">
        <Prose>Universe 1 on the first output.</Prose>
      </TabPanel>
      <TabPanel value="map">
        <Prose>Channels 1–16 are dimmers.</Prose>
      </TabPanel>
      <TabPanel value="notes">
        <Prose>Hold 2s on cue 14.</Prose>
      </TabPanel>
    </Tabs>
  ),
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText('Universe 1 on the first output.'),
    ).toBeVisible()
    await userEvent.click(canvas.getByRole('tab', { name: 'Map' }))
    await expect(canvas.getByText('Channels 1–16 are dimmers.')).toBeVisible()
  },
}
