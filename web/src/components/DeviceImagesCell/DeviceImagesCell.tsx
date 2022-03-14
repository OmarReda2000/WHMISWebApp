import type { DeviceImagesQuery } from 'types/graphql'
import { CellSuccessProps, CellFailureProps, useMutation } from '@redwoodjs/web'
import ImageBlock from '../ImageBlock/ImageBlock'
import { useState } from 'react'
import ImageOverlay from '../ImageOverlay/ImageOverlay'
import { toast } from '@redwoodjs/web/dist/toast'
import { DELETE_IMAGE_MUTATION } from '../Image/ImagesCell'

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

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const DELETE_ALL_IMAGES_BY_DEVICE_MUTATION = gql`
  mutation DeleteAllImagesByDeviceMutation($deviceId: String!) {
    deleteAllImagesByDevice(deviceId: $deviceId) {
      id
    }
  }
`

export const Success = ({
  imagesByDevice,
  deviceId,
}: CellSuccessProps<DeviceImagesQuery> & { deviceId: string }) => {
  const [image, setImage] = useState(null)

  const [deleteImage] = useMutation(DELETE_IMAGE_MUTATION, {
    onCompleted: () => {
      toast.success(`Image removed`)
      setImage(null)
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY, variables: { deviceId } }],
    awaitRefetchQueries: true,
  })

  const [deleteAllImagesByDevice] = useMutation(
    DELETE_ALL_IMAGES_BY_DEVICE_MUTATION,
    {
      onCompleted: () => {
        toast.success(`Removed all devices for device ${deviceId}`)
        setImage(null)
      },
      onError: (error) => {
        toast.error(error.message)
      },
      refetchQueries: [{ query: QUERY, variables: { deviceId } }],
      awaitRefetchQueries: true,
    }
  )

  return (
    <>
      {image ? (
        <ImageOverlay
          image={image}
          onClick={() => setImage(null)}
          onDelete={deleteImage}
        />
      ) : null}
      <div className="flex flex-row items-stretch space-x-4 mx-2 sm:flex-row">
        <button
          className="w-max p-2 rounded-lg bg-red-700 hover:bg-red-800 font-semibold text-white mt-1"
          onClick={() => deleteAllImagesByDevice({ variables: { deviceId } })}
        >
          Delete all images
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-2 my-3">
        {imagesByDevice.map((image) => {
          return (
            <ImageBlock
              key={image.id}
              image={image}
              onClick={setImage}
              onDelete={deleteImage}
            />
          )
        })}
      </div>
    </>
  )
}
