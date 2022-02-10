import { render } from '@redwoodjs/testing/web'

import DeviceBlock from './DeviceBlock'

describe('DeviceBlock', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DeviceBlock device={null} />)
    }).not.toThrow()
  })
})
