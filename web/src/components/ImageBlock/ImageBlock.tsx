import { Image } from 'types/graphql'

type ImageBlockProps = {
  image: Image
  onClick?: (image: Image) => void
  onDelete?: ({ variables: { id } }) => void
}

export const base64String = (data: string) =>
  require('buffer').Buffer.from(data, 'hex').toString('base64')

const ImageBlock = ({
  image,
  onClick = null,
  onDelete = null,
}: ImageBlockProps) => {
  const handleClick = () => {
    onClick && onClick(image)
  }

  const handleDelete = (e) => {
    e.preventDefault() // Need to put this in or else it shows two toasts
    if (confirm(`Are you sure you want to delete image ${image.id}?`)) {
      onDelete && onDelete({ variables: { id: image.id } })
    }
  }

  return (
    <div className="relative w-full h-full border rounded-sm shadow-md">
      <button
        className="absolute bottom-0 right-0 w-max h-max p-2 rounded-lg bg-red-700 font-semibold text-white m-2 opacity-50 hover:opacity-100"
        onClick={handleDelete}
      >
        Delete
      </button>
      <input
        type="image"
        className="object-cover w-full h-full"
        src={`data:image/jpg;base64,${base64String(image.data)}`}
        alt={`From device ${
          image.device?.name ? image.device.name : 'unknown'
        }`}
        onClick={handleClick}
      />
    </div>
  )
}

export default ImageBlock
