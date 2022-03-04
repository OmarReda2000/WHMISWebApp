import DeviceDetailsCell from 'src/components/DeviceDetailsCell'

type DeviceDetailsPageProps = { id: string }

const DeviceDetailsPage = ({ id }: DeviceDetailsPageProps) => {
  return (
    <>
      <DeviceDetailsCell id={id} />
    </>
  )
}

export default DeviceDetailsPage
