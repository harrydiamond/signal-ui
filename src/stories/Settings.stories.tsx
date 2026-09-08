import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Alert,
  Button,
  Card,
  CardBody,
  Checkbox,
  Container,
  Field,
  Input,
  PageHeader,
  ProseMuted,
  Select,
  SiteFooter,
  SkipLink,
  Stack,
  Switch,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Textarea,
  Theme,
} from '../index.ts'
import { themeFromGlobals } from './ExampleChrome.tsx'

const meta = {
  title: 'Examples/Settings',
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { disable: true },
  },
} satisfies Meta

export default meta
type Story = StoryObj

export const Settings: Story = {
  render: function Render(_args, { globals }) {
    const theme = themeFromGlobals(globals)
    const [notify, setNotify] = useState(true)
    const [meters, setMeters] = useState(false)
    const [digest, setDigest] = useState(true)

    return (
      <Theme asPage theme={theme}>
        <SkipLink />
        <div className="flex-1">
          <Container>
            <PageHeader
              title="Settings"
              description="Profile, notifications, and display preferences."
              brand={{ name: 'stage', tld: '.tools', href: '#top' }}
            />
            <Stack>
              <Alert tone="info" title="Synced">
                Changes apply to this device immediately.
              </Alert>
              <Card>
                <CardBody>
                  <Tabs defaultValue="profile">
                    <TabList aria-label="Settings sections">
                      <Tab value="profile">Profile</Tab>
                      <Tab value="notify">Notifications</Tab>
                      <Tab value="display">Display</Tab>
                    </TabList>
                    <TabPanel value="profile" className="space-y-4">
                      <Field label="Display name">
                        <Input defaultValue="Harry" />
                      </Field>
                      <Field label="Role" hint="Shown on shared patches.">
                        <Select defaultValue="operator">
                          <option value="operator">Operator</option>
                          <option value="designer">Designer</option>
                          <option value="admin">Admin</option>
                        </Select>
                      </Field>
                      <Field label="Bio">
                        <Textarea rows={3} defaultValue="Live systems." />
                      </Field>
                      <Checkbox
                        label="Show name on public cue sheets"
                        defaultChecked
                      />
                    </TabPanel>
                    <TabPanel value="notify" className="space-y-4">
                      <Switch
                        label="Push alerts"
                        checked={notify}
                        onCheckedChange={setNotify}
                      />
                      <Switch
                        label="Weekly digest"
                        checked={digest}
                        onCheckedChange={setDigest}
                      />
                    </TabPanel>
                    <TabPanel value="display" className="space-y-4">
                      <Switch
                        label="Metric units"
                        checked={meters}
                        onCheckedChange={setMeters}
                      />
                      <ProseMuted>
                        Theme still comes from the Storybook toolbar — this page
                        only demos preference controls.
                      </ProseMuted>
                    </TabPanel>
                  </Tabs>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <Button variant="primary">Save</Button>
                    <Button variant="ghost">Cancel</Button>
                  </div>
                </CardBody>
              </Card>
            </Stack>
          </Container>
        </div>
        <SiteFooter>Account · stage.tools</SiteFooter>
      </Theme>
    )
  },
}
