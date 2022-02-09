import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import DeviceForm from 'src/components/Device/DeviceForm'

const CREATE_DEVICE_MUTATION = gql`
  mutation CreateDeviceMutation($input: CreateDeviceInput!) {
    createDevice(input: $input) {
      id
    }
  }
`

const NewDevice = () => {
  const [createDevice, { loading, error }] = useMutation(
    CREATE_DEVICE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Device created')
        navigate(routes.devices())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createDevice({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Device</h2>
      </header>
      <div className="rw-segment-main">
        <DeviceForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewDevice
