import type { DeviceImagesQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import ImageBlock from '../ImageBlock/ImageBlock'
import { useState } from 'react'
import ImageOverlay from '../ImageOverlay/ImageOverlay'

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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

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
