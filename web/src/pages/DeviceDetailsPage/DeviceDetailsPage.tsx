import DeviceDetailsCell from 'src/components/DeviceDetailsCell/DeviceDetailsCell'

type DeviceDetailsPageProps = { id: number }

const DeviceDetailsPage = ({ id }: DeviceDetailsPageProps) => {
  return (
    <>
      <DeviceDetailsCell id={id} />
    </>
  )
}

export default DeviceDetailsPage
