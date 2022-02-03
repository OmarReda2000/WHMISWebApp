import { render } from '@redwoodjs/testing/web'

import DeviceDetailsPage from './DeviceDetailsPage'

describe('DeviceDetailsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DeviceDetailsPage />)
    }).not.toThrow()
  })
})
