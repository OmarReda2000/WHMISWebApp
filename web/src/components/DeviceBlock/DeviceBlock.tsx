import { routes, navigate } from '@redwoodjs/router'
import tempIcon from 'src/assets/tempIcon.png'
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
      className="flex gap-3 border rounded-lg border-green-700 p-3 text-left focus-outline:none hover:bg-green-600 hover:text-white"
    >
      <img src={tempIcon} className="h-7 my-auto" alt="Device Icon" />
      <p className="font-semibold">{device.name}</p>
    </button>
  )
}

export default DeviceBlock
