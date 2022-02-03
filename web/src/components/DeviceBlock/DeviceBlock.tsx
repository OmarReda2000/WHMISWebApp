import { routes, navigate } from '@redwoodjs/router'

type DeviceBlockProps = {
  device: {
    id: number
    name?: string
  }
}
const DeviceBlock = ({ device }: DeviceBlockProps) => {
  return (
    <button
      onClick={() => navigate(routes.deviceDetails({ id: device.id }))}
      className="border rounded-lg border-green-700 p-3 text-left focus-outline:none hover:bg-green-600 hover:text-white"
    >
      <p className="font-semibold">{device.name}</p>
    </button>
  )
}

export default DeviceBlock
