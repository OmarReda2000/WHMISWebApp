import DeviceDetailsCell from 'src/components/DeviceDetailsCell'
import DeviceImagesCell from 'src/components/DeviceImagesCell'

type DeviceDetailsPageProps = { id: string }

const DeviceDetailsPage = ({ id }: DeviceDetailsPageProps) => {
  return (
    <>
      <DeviceDetailsCell id={id} />
      <div className="p-5">
        <p className="text-lg font-semibold">Images</p>
        <DeviceImagesCell deviceId={id} />
      </div>
    </>
  )
}

export default DeviceDetailsPage
