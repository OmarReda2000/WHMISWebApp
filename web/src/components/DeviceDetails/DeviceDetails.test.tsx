import { render } from '@redwoodjs/testing/web'

import DeviceDetails from './DeviceDetails'

describe('DeviceDetails', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DeviceDetails device={null} />)
    }).not.toThrow()
  })
})
