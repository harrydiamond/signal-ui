import { render, screen } from '@testing-library/react'
import { fireEvent } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Tab, TabList, TabPanel, Tabs } from './Tabs.tsx'

function Demo() {
  return (
    <Tabs defaultValue="io">
      <TabList aria-label="Sections">
        <Tab value="io">I/O</Tab>
        <Tab value="map">Map</Tab>
      </TabList>
      <TabPanel value="io">Input patch</TabPanel>
      <TabPanel value="map">Channel map</TabPanel>
    </Tabs>
  )
}

describe('Tabs', () => {
  it('shows the default panel and hides the rest', () => {
    render(<Demo />)
    expect(screen.getByRole('tab', { name: 'I/O' })).toHaveAttribute(
      'aria-selected',
      'true',
    )
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Input patch')
    expect(screen.getByText('Channel map')).not.toBeVisible()
  })

  it('selects a tab on click', () => {
    render(<Demo />)
    fireEvent.click(screen.getByRole('tab', { name: 'Map' }))
    expect(screen.getByRole('tab', { name: 'Map' })).toHaveAttribute(
      'aria-selected',
      'true',
    )
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Channel map')
  })

  it('moves selection with arrow keys', () => {
    render(<Demo />)
    const list = screen.getByRole('tablist')
    screen.getByRole('tab', { name: 'I/O' }).focus()
    fireEvent.keyDown(list, { key: 'ArrowRight' })
    expect(screen.getByRole('tab', { name: 'Map' })).toHaveAttribute(
      'aria-selected',
      'true',
    )
    expect(screen.getByRole('tab', { name: 'Map' })).toHaveFocus()
  })
})
