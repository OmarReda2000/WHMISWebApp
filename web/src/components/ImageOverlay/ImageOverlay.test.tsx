import { render } from '@redwoodjs/testing/web'

import ImageOverlay from './ImageOverlay'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ImageOverlay', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ImageOverlay image={null} />)
    }).not.toThrow()
  })
})
