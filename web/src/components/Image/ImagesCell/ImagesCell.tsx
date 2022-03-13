import type { FindImages } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import ImageBlock from 'src/components/ImageBlock/ImageBlock'
import { useState } from 'react'
import ImageOverlay from 'src/components/ImageOverlay/ImageOverlay'

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

export const Success = ({ images }: CellSuccessProps<FindImages>) => {
  const [image, setImage] = useState(null)

  return (
    <>
      {image ? (
        <ImageOverlay image={image} onClick={() => setImage(null)} />
      ) : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 mx-2 my-3">
        {images.map((image) => (
          <ImageBlock key={image.id} image={image} onClick={setImage} />
        ))}
      </div>
    </>
  )
}
