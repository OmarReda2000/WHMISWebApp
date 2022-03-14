import { CellSuccessProps, CellFailureProps, useMutation } from '@redwoodjs/web'
import DeviceBlock from 'src/components/DeviceBlock'
import { toast } from '@redwoodjs/web/dist/toast'

export const beforeQuery = () => {
  return {
    pollInterval: 1000 * 10,
  }
}

export const QUERY = gql`
  query DevicesQuery {
    devices {
      id
      name
      lastCheckedAt
      lastUpdateAt
      armed
    }
  }
`

const ARM_ALL_DEVICES_MUTATION = gql`
  mutation ArmAllDevicesMutation($arm: Boolean!) {
    updateArmDevices(arm: $arm) {
      armed
    }
  }
`

export const Loading = () => (
  <div className="w-full h-full flex justify-center p-2">
    <span className="font-semibold text-gray-500 lg:text-2xl md:text-xl text-lg text-center">
      Loading...
    </span>
  </div>
)

export const Empty = () => (
  <div className="w-full h-full flex justify-center p-2">
    <span className="font-semibold text-gray-500 lg:text-2xl md:text-xl text-lg text-center">
      No devices detected
    </span>
  </div>
)

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ devices }: CellSuccessProps) => {
  const [updateArmDevices] = useMutation(ARM_ALL_DEVICES_MUTATION, {
    onCompleted: () => {
      toast.success(`Armed all devices`)
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY }],
  })

  const [updateDisarmDevices] = useMutation(ARM_ALL_DEVICES_MUTATION, {
    onCompleted: () => {
      toast.success(`Disarmed all devices`)
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY }],
  })

  const handleArmDevices = (arm: boolean) => {
    arm
      ? updateArmDevices({ variables: { arm } })
      : updateDisarmDevices({ variables: { arm } })
  }

  return (
    <>
      <div className="flex flex-row items-stretch space-x-4 mx-2 sm:flex-row mt-1">
        <button
          className="w-max p-2 rounded-lg bg-green-700 hover:bg-green-800 font-semibold text-white"
          onClick={() => handleArmDevices(true)}
        >
          Arm all devices
        </button>
        <button
          className="w-max p-2 rounded-lg bg-red-700 hover:bg-red-800 font-semibold text-white"
          onClick={() => handleArmDevices(false)}
        >
          Disarm all devices
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-2 my-3">
        {devices.map((device) => (
          <DeviceBlock key={device.id} device={device} />
        ))}
      </div>
    </>
  )
}
