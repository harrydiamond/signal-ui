import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Choice,
  Container,
  Field,
  Heading,
  Input,
  LedText,
  Link,
  Meta as MetaLine,
  PageHeader,
  ProseMuted,
  SiteFooter,
  SkipLink,
  Stack,
  Theme,
  Tile,
} from '../index.ts'
import { fieldLabel } from '../type.ts'
import { themeFromGlobals } from './ExampleChrome.tsx'

const meta = {
  title: 'Examples/Instrument',
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { disable: true },
  },
} satisfies Meta

export default meta
type Story = StoryObj

export const Instrument: Story = {
  render: function Render(_args, { globals }) {
    const theme = themeFromGlobals(globals)
    const [mode, setMode] = useState('ratio')
    const [meters, setMeters] = useState('12')
    const [temp, setTemp] = useState('20')

    return (
      <Theme asPage theme={theme}>
        <SkipLink />
        <div className="flex-1">
          <Container>
            <PageHeader
              title="Delay"
              description="Distance ↔ milliseconds from the speed of sound."
              badge="Live"
              brand={{ name: 'stage', tld: '.tools', href: '#top' }}
            />
            <Stack>
              <Card>
                <CardBody>
                  <fieldset>
                    <legend className={`${fieldLabel} mb-1.5`}>Direction</legend>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <Choice
                        selected={mode === 'ratio'}
                        onClick={() => setMode('ratio')}
                      >
                        Distance → ms
                      </Choice>
                      <Choice
                        selected={mode === 'time'}
                        onClick={() => setMode('time')}
                      >
                        ms → Distance
                      </Choice>
                    </div>
                  </fieldset>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <Field label={mode === 'ratio' ? 'Meters' : 'Milliseconds'}>
                      <Input
                        value={meters}
                        onChange={e => setMeters(e.target.value)}
                        inputMode="decimal"
                      />
                    </Field>
                    <Field label="Temperature (°C)">
                      <Input
                        value={temp}
                        onChange={e => setTemp(e.target.value)}
                        inputMode="decimal"
                      />
                    </Field>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button variant="primary">Calculate</Button>
                    <Button variant="ghost">Reset</Button>
                    <Button variant="panel">Store cue</Button>
                  </div>
                </CardBody>
                <CardFooter>
                  <MetaLine className="tracking-wider uppercase">Delay</MetaLine>
                  <LedText hot className="text-3xl">
                    34.9
                  </LedText>
                  <ProseMuted>ms at {temp} °C</ProseMuted>
                </CardFooter>
              </Card>
              <section>
                <Heading level={2}>Related</Heading>
                <ProseMuted>Catalog tiles under the same Theme.</ProseMuted>
                <div className="mt-3 flex flex-col gap-3">
                  <Tile
                    href="#tap"
                    title="Tap tempo"
                    description="Lock a BPM from a click."
                    density="row"
                  />
                  <Tile
                    href="#spl"
                    title="dB primer"
                    description="Voltage, power, and SPL ratios."
                    variant="reference"
                    density="row"
                  />
                </div>
              </section>
            </Stack>
          </Container>
        </div>
        <SiteFooter>
          Built with signal-ui · <Link href="#intro">Storybook</Link>
        </SiteFooter>
      </Theme>
    )
  },
}
