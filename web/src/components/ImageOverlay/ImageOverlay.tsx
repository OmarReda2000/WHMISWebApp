import { base64String, DELETE_IMAGE_MUTATION } from '../ImageBlock/ImageBlock'
import Overlay from '../Overlay/Overlay'
import { Image } from 'types/graphql'
import { toast } from '@redwoodjs/web/dist/toast'
import { useMutation } from '@redwoodjs/web'
import { QUERY } from 'src/components/Image/ImagesCell/ImagesCell'

type ImageOverlayProps = {
  image: Image
  onClick?: (item: unknown) => void
}

const ImageOverlay = ({ image, onClick = null }: ImageOverlayProps) => {
  const date = new Date(image.time)

  const [deleteImage] = useMutation(DELETE_IMAGE_MUTATION, {
    onCompleted: () => {
      toast.success(`${image.id} removed`)
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteIamge = (e) => {
    e.preventDefault() // Need to put this in or else it shows two toasts
    if (confirm(`Are you sure you want to delete image ${image.id}?`)) {
      deleteImage({ variables: { id: image.id } })
    }
  }

  return (
    <Overlay onClick={onClick}>
      <div className="flex flex-col items-center">
        <div className="relative lg:w-2/3 md:w-4/5 w-5/6 bg-opacity-100">
          <button
            className="absolute bottom-0 right-0 w-max h-max p-2 rounded-lg bg-red-700 font-semibold text-white m-4 opacity-50 hover:opacity-100"
            onClick={onDeleteIamge}
          >
            Delete
          </button>
          <input
            type="image"
            className="w-full" // lg:w-[80rem] md:w-[56rem] w-[36rem]
            src={`data:image/jpg;base64,${base64String(image.data)}`}
            alt={`From device ${
              image.device?.name ? image.device.name : 'unknown'
            }`}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
        <div className="text-white font-semibold bg-black p-2">
          <div>{`Timestamp: ${date.toLocaleString()}`}</div>
          <div>{`Location: ${
            image.device?.location ? image.device.location : 'N/A'
          }`}</div>
        </div>
      </div>
    </Overlay>
  )
}

export default ImageOverlay
