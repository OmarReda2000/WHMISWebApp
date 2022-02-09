// import { Link, routes } from '@redwoodjs/router'
import DevicesCell from 'src/components/DevicesCell'

const HomePage = () => {
  return (
    <>
      <div className="py-3 px-5 bg-green-600">
        <p className="text-xl text-white font-semibold">Devices</p>
      </div>
      <div className="bg-gray-200 p-2">
        <DevicesCell />
      </div>
    </>
  )
}

export default HomePage
