import EditDeviceCell from 'src/components/Device/EditDeviceCell'

type DevicePageProps = {
  id: number
}

const EditDevicePage = ({ id }: DevicePageProps) => {
  return <EditDeviceCell id={id} />
}

export default EditDevicePage
