import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Button,
  Chip,
  ChipCard,
  Container,
  Dropzone,
  Heading,
  List,
  ListRow,
  PageHeader,
  Progress,
  SiteFooter,
  SkipLink,
  Stack,
  Step,
  Steps,
  Theme,
  Toast,
  useToast,
} from '../index.ts'
import { themeFromGlobals } from './ExampleChrome.tsx'

const meta = {
  title: 'Examples/Studio',
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { disable: true },
  },
} satisfies Meta

export default meta
type Story = StoryObj

export const Studio: Story = {
  render: function Render(_args, { globals }) {
    const theme = themeFromGlobals(globals)
    const [step, setStep] = useState('song')
    const [hasFiles, setHasFiles] = useState(false)
    const { toast, showToast, dismissToast } = useToast()

    return (
      <Theme asPage theme={theme}>
        <SkipLink />
        <div className="flex-1">
          <Container>
            <PageHeader
              title="Export"
              description="Artwork → song → loop → render."
              brand={{ name: 'loop', tld: '.studio', href: '#top' }}
            />
            <Stack>
              <Steps label="Studio" value={step} onChange={setStep}>
                <Step value="art" label="Artwork" complete />
                <Step value="song" label="Song" />
                <Step value="loop" label="Loop" />
                <Step value="export" label="Export" />
              </Steps>

              <div className="grid gap-4 sm:grid-cols-2">
                <ChipCard
                  tone="audio"
                  chip="Audio"
                  title="Master bus"
                  description="Stereo stem ready for the loop pass."
                />
                <ChipCard
                  tone="signal"
                  chip="Signal"
                  title="Timecode"
                  description="Chase locked to the house clock."
                />
              </div>

              <Dropzone
                label={
                  hasFiles ? 'show.json' : 'Drop a patch, or click to browse'
                }
                hint={hasFiles ? 'Click to replace' : 'JSON or YAML'}
                hasFiles={hasFiles}
                onFiles={() => {
                  setHasFiles(true)
                  showToast('Patch loaded', 'success')
                }}
              />

              <Progress value={0.62} label="Encoding" />

              <section>
                <div className="mb-2 flex items-center gap-2">
                  <Chip tone="meter">Queue</Chip>
                  <Heading level={2} className="m-0">
                    Render jobs
                  </Heading>
                </div>
                <List>
                  <ListRow label="Intro sting" value="DONE" />
                  <ListRow label="Main set" value="62%" />
                  <ListRow label="Outro wash" value="WAIT" />
                </List>
              </section>

              <div className="flex flex-wrap gap-2">
                <Button
                  variant="primary"
                  onClick={() => showToast('Export started', 'success')}
                >
                  Start export
                </Button>
                <Button
                  variant="danger"
                  onClick={() => showToast('Export cancelled', 'error')}
                >
                  Cancel
                </Button>
              </div>
            </Stack>
          </Container>
        </div>
        <SiteFooter>loop.studio · session demo</SiteFooter>
        {toast ? (
          <Toast
            message={toast.message}
            tone={toast.tone}
            onDismiss={dismissToast}
          />
        ) : null}
      </Theme>
    )
  },
}
