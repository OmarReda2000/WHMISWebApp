import { base64String } from '../ImageBlock/ImageBlock'
import Overlay from '../Overlay/Overlay'
import { Image } from 'types/graphql'

type ImageOverlayProps = {
  image: Image
  onClick?: (item: unknown) => void
}

const ImageOverlay = ({ image, onClick = null }: ImageOverlayProps) => {
  const date = new Date(image.time)

  return (
    <Overlay onClick={onClick}>
      <div className="flex flex-col items-center">
        <input
          type="image"
          className="lg:w-2/3 md:w-4/5 w-5/6 bg-opacity-100" // lg:w-[80rem] md:w-[56rem] w-[36rem]
          src={`data:image/jpg;base64,${base64String(image.data)}`}
          alt={`From device ${image.device.name}`}
          onClick={(e) => e.stopPropagation()}
        />
        <div className="text-white font-semibold bg-black p-2">
          {`Timestamp: ${date.toLocaleString()}`}
        </div>
      </div>
    </Overlay>
  )
}

export default ImageOverlay
