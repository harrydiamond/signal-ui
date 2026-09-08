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
  Input,
  Heading,
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
import { Composition } from './Composition.tsx'

function IconMark() {
  return <span className="av-icon-placeholder" />
}

function SampleSite({ theme }: { theme: 'phosphor' | 'editorial' }) {
  const [mode, setMode] = useState('ratio')
  const [a, setA] = useState('2')
  const [b, setB] = useState('1')

  return (
    <Theme asPage theme={theme}>
      <SkipLink />
      <div className="flex-1">
        <Container>
          <PageHeader
            title="Delay"
            description={
              theme === 'editorial'
                ? 'Content-site composition under the editorial theme.'
                : 'A second site built only from these primitives — same phosphor console, different product.'
            }
            brand={{ name: 'stage', tld: '.tools', href: '#top' }}
          />

          <Stack>
            <Card>
              <CardBody>
                <fieldset>
                  <legend className={`${fieldLabel} mb-1.5`}>Direction</legend>
                  <div className="av-story-grid">
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
                <div className="av-story-grid">
                  <Field label={mode === 'ratio' ? 'Meters' : 'Milliseconds'}>
                    <Input
                      value={a}
                      onChange={e => setA(e.target.value)}
                      inputMode="decimal"
                    />
                  </Field>
                  <Field label="Temperature (°C)">
                    <Input
                      value={b}
                      onChange={e => setB(e.target.value)}
                      inputMode="decimal"
                    />
                  </Field>
                </div>
                <div className="av-story-row">
                  <Button variant="primary">Calculate</Button>
                  <Button variant="ghost">Reset</Button>
                </div>
              </CardBody>
              <CardFooter>
                <MetaLine className="av-type-label">Delay</MetaLine>
                <LedText hot className="av-type-readout">
                  5.83
                </LedText>
                <ProseMuted>ms at 20 °C</ProseMuted>
              </CardFooter>
            </Card>

            <section>
              <Heading level={2}>Related</Heading>
              <ProseMuted>Row tiles for the catalog.</ProseMuted>
              <div className="mt-3 flex flex-col gap-3">
                <Tile
                  href="#tap"
                  title="Tap tempo"
                  description="Lock a BPM from a click."
                  icon={<IconMark />}
                  density="row"
                />
                <Tile
                  href="#spl"
                  title="dB primer"
                  description="Voltage, power, and SPL ratios."
                  variant="reference"
                  icon={<IconMark />}
                  density="row"
                />
              </div>
            </section>
          </Stack>
        </Container>
      </div>
      <SiteFooter>
        Built with avtech UI ·{' '}
        <Link href="#intro">Style locked in Storybook</Link>
      </SiteFooter>
    </Theme>
  )
}

const meta = {
  title: 'Components/Composition',
  component: Composition,
  parameters: {
    docs: {
      description: {
        component:
          'Proof the primitives can stand up another site. Switch Theme toolbar to compare phosphor vs editorial.',
      },
    },
  },
} satisfies Meta<typeof Composition>

export default meta
type Story = StoryObj<typeof meta>

export const SamplePage: Story = {
  render: (_args, { globals }) => (
    <SampleSite
      theme={
        (globals.theme as 'phosphor' | 'editorial' | undefined) ?? 'phosphor'
      }
    />
  ),
}
