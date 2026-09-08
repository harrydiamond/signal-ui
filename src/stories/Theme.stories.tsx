import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../components/Button.tsx'
import { Card, CardBody } from '../components/Card.tsx'
import { Theme, type ThemeName } from '../components/Theme.tsx'
import { Heading } from '../components/Heading.tsx'
import { Prose, ProseMuted } from '../components/Text.tsx'

const meta = {
  title: 'Foundations/Theme',
  component: Theme,
  parameters: {
    docs: {
      description: {
        component:
          'Applies kit atmosphere, type, and focus rules. `phosphor` is console chrome; `editorial` follows system light/dark with a solid page color. Chromatic snapshots both themes via modes.',
      },
    },
  },
} satisfies Meta<typeof Theme>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args, { globals }) => {
    const theme = (globals.theme as ThemeName | undefined) ?? 'phosphor'
    return (
      <Theme {...args} theme={theme}>
        <div className="px-4 py-6">
          <Card>
            <CardBody>
              <Heading level={2}>{theme}</Heading>
              <ProseMuted className="mt-2">
                {theme === 'editorial'
                  ? 'Solid page color, soft-elevation cards, system light/dark. Override `--av-font-heading` / `--av-font-body` to inject consumer faces.'
                  : 'Phosphor paints the page plate, washes, grain, and focus rings.'}
              </ProseMuted>
              {theme === 'editorial' ? (
                <Prose className="mt-4">
                  Body prose uses muted link underlines and sans headings.
                </Prose>
              ) : null}
              <div className="mt-5">
                <Button variant={theme === 'editorial' ? 'primary' : 'default'}>
                  {theme === 'editorial' ? 'Primary' : 'Default'}
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </Theme>
    )
  },
}

export const AsPage: Story = {
  args: { asPage: true },
  render: (args, { globals }) => {
    const theme = (globals.theme as ThemeName | undefined) ?? 'phosphor'
    return (
      <Theme {...args} theme={theme}>
        <div className="flex-1 px-4 py-6">
          <Prose>
            asPage stretches Theme to the viewport and stacks as a column.
          </Prose>
        </div>
      </Theme>
    )
  },
}
