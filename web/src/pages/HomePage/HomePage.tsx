// import { Link, routes } from '@redwoodjs/router'
import DevicesCell from 'src/components/DevicesCell'
const HomePage = () => {
  return (
    <div className="h-screen bg-gray-200 max-h-screen">
      <div className="py-5 bg-green-800">
        <p className="text-6xl text-white font-semibold text-center ">WHOSS</p>
        <p className="text-xl text-white text-center">
          Wireless Home Occupancy Security System
        </p>
      </div>
      <div className="py-5 px-5 bg-green-600">
        <p className="text-xl text-white font-semibold">Devices</p>
      </div>
      <div className="bg-gray-200 p-2">
        <DevicesCell />
      </div>
    </div>
  )
}

export default HomePage
