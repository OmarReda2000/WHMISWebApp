import DeviceCell from 'src/components/Device/DeviceCell'

type DevicePageProps = {
  id: number
}

const DevicePage = ({ id }: DevicePageProps) => {
  return <DeviceCell id={id} />
}

export default DevicePage
