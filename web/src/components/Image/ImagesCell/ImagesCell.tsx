import type { FindImages } from 'types/graphql'
import { CellSuccessProps, CellFailureProps, useMutation } from '@redwoodjs/web'
import ImageBlock from 'src/components/ImageBlock/ImageBlock'
import { useState } from 'react'
import ImageOverlay from 'src/components/ImageOverlay/ImageOverlay'
import { toast } from '@redwoodjs/web/dist/toast'

export const beforeQuery = () => {
  return {
    pollInterval: 1000 * 10,
  }
}

export const QUERY = gql`
  query FindImages {
    images {
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

export const DELETE_IMAGE_MUTATION = gql`
  mutation DeleteImageMutation($id: Int!) {
    deleteImage(id: $id) {
      id
    }
  }
`

export const DELETE_ALL_IMAGES_MUTATION = gql`
  mutation DeleteAllImagesMutation {
    deleteAllImages {
      id
    }
  }
`

export const Success = ({ images }: CellSuccessProps<FindImages>) => {
  const [image, setImage] = useState(null)

  const [deleteImage] = useMutation(DELETE_IMAGE_MUTATION, {
    onCompleted: () => {
      toast.success(`Image removed`)
      setImage(null)
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const [deleteAllImages] = useMutation(DELETE_ALL_IMAGES_MUTATION, {
    onCompleted: () => {
      toast.success(`Removed all images`)
      setImage(null)
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

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
          onClick={() => deleteAllImages()}
        >
          Delete all images
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-2 my-3">
        {images.map((image) => (
          <ImageBlock
            key={image.id}
            image={image}
            onClick={setImage}
            onDelete={deleteImage}
          />
        ))}
      </div>
    </>
  )
}
