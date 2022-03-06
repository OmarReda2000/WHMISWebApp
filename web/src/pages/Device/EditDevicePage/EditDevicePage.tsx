import EditDeviceCell from 'src/components/Device/EditDeviceCell'

type DevicePageProps = {
  id: string
}

const EditDevicePage = ({ id }: DevicePageProps) => {
  return <EditDeviceCell id={id} />
}

export default EditDevicePage
