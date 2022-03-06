import { Image } from 'types/graphql'

type ImageBlockProps = {
  image: Image
  onClick?: (image: Image) => void
}

export const base64String = (data: string) =>
  require('buffer').Buffer.from(data, 'hex').toString('base64')

const ImageBlock = ({ image, onClick = null }: ImageBlockProps) => {
  const handleClick = () => {
    onClick && onClick(image)
  }

  return (
    <div className="w-full h-full border rounded-sm shadow-md">
      <input
        type="image"
        className="object-cover w-full h-full"
        src={`data:image/jpg;base64,${base64String(image.data)}`}
        alt={`From device ${image.device.name}`}
        onClick={handleClick}
      />
    </div>
  )
}

export default ImageBlock
