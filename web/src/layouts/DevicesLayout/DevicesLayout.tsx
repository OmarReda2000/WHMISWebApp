import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type DeviceLayoutProps = {
  children: React.ReactNode
}

const DevicesLayout = ({ children }: DeviceLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link
            to={routes.devices()}
            className="rw-link"
          >
            Devices
          </Link>
        </h1>
        <Link
          to={routes.newDevice()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New Device
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default DevicesLayout
