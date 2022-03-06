// import { Link, routes } from '@redwoodjs/router'
import DevicesCell from 'src/components/DevicesCell'
import ImagesCell from 'src/components/Image/ImagesCell'

const HomePage = () => {
  return (
    <>
      <div className="py-3 px-5 bg-green-600">
        <p className="text-xl text-white font-semibold">Home</p>
      </div>
      <div className="bg-gray-200 p-2 grid grid-cols-1 gap-4">
        <div className="px-3">
          <p className="text-lg font-semibold">Devices</p>
          <DevicesCell />
        </div>
        <div className="px-3">
          <p className="text-lg font-semibold">Images</p>
          <ImagesCell />
        </div>
      </div>
    </>
  )
}

export default HomePage
