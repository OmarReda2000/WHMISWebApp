import { routes, navigate } from '@redwoodjs/router'

const DeviceBlock = ({ device }) => {
  return (
    <button
      onClick={() => navigate(routes.deviceDetails({ id: 1 }))}
      className="border rounded-lg border-green-700 p-3 text-left focus-outline:none hover:bg-green-600 hover:text-white"
    >
      <p className="font-semibold">{device.name}</p>
    </button>
  )
}

export default DeviceBlock
