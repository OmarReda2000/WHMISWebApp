// import { Link, routes } from '@redwoodjs/router'
import DevicesCell from 'src/components/DevicesCell'
import ImagesCell from 'src/components/Image/ImagesCell'
import { useState } from 'react'

const HomePage = () => {
  const [refresh, setRefresh] = useState(false)
  return (
    <>
      <div className="py-3 px-5 bg-green-600">
        <p className="text-xl text-white font-semibold">Home</p>
      </div>

      <div className="bg-gray-200 p-2 grid grid-cols-1 gap-4">
        <div className="px-3">
          <div className="flex gap-2">
            <p className="text-lg font-semibold">Devices</p>
            {/* <button
              className="border rounded-lg border-green-700 px-1 text-left text-xs focus-outline:none hover:bg-green-600 hover:text-white"
              onClick={() => setRefresh(true)}
            >
              Refresh
            </button> */}
          </div>

          <DevicesCell />
        </div>
        <div className="w-full border-t border-gray-300"></div>
        <div className="px-3">
          <p className="text-lg font-semibold">Images</p>
          <ImagesCell />
        </div>
      </div>
    </>
  )
}

export default HomePage
