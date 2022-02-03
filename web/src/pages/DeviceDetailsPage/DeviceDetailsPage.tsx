import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const DeviceDetailsPage = () => {
  return (
    <>
      <MetaTags title="DeviceDetails" description="DeviceDetails page" />

      <h1>DeviceDetailsPage</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/DeviceDetailsPage/DeviceDetailsPage.tsx</code>
      </p>
      <p>
        My default route is named <code>deviceDetails</code>, link to me with `
        <Link to={routes.deviceDetails()}>DeviceDetails</Link>`
      </p>
    </>
  )
}

export default DeviceDetailsPage
