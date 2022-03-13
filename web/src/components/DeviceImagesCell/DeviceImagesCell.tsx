import type { DeviceImagesQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import ImageBlock from '../ImageBlock/ImageBlock'
import { useState } from 'react'
import ImageOverlay from '../ImageOverlay/ImageOverlay'

export const beforeQuery = (props) => {
  return {
    pollInterval: 1000 * 10,
    variables: { deviceId: props.deviceId },
  }
}

export const QUERY = gql`
  query DeviceImagesQuery($deviceId: String!) {
    imagesByDevice(deviceId: $deviceId) {
      id
      data
      time
      device {
        name
        location
      }
    }
  }
`

export const Loading = () => (
  <div className="w-full h-full flex justify-center p-2">
    <span className="font-semibold text-gray-500 lg:text-2xl md:text-xl text-lg text-center">
      Loading...
    </span>
  </div>
)

export const Empty = () => {
  return (
    <div className="w-full h-full flex justify-center p-2">
      <span className="font-semibold text-gray-500 lg:text-2xl md:text-xl text-lg text-center">
        No images available
      </span>
    </div>
  )
}

export const Success = ({
  imagesByDevice,
}: CellSuccessProps<DeviceImagesQuery>) => {
  const [image, setImage] = useState(null)

  return (
    <>
      {image ? (
        <ImageOverlay image={image} onClick={() => setImage(null)} />
      ) : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-2 my-3">
        {imagesByDevice.map((image) => {
          return <ImageBlock key={image.id} image={image} onClick={setImage} />
        })}
      </div>
    </>
  )
}
