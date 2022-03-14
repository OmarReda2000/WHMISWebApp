import { routes, navigate } from '@redwoodjs/router'
import tempIcon from 'src/assets/tempIcon.png'
import { useMutation } from '@redwoodjs/web'

type DeviceBlockProps = {
  device: {
    id: number
    name?: string
    lastCheckedAt?: Date
    lastUpdateAt?: Date
    armed: boolean
  }
}

const UPDATE_LAST_CHECKED_MUTATION = gql`
  mutation UpdateLastCheckedMutation($id: String!) {
    deviceChecked(id: $id) {
      id
    }
  }
`

const DeviceBlock = ({ device }: DeviceBlockProps) => {
  const [deviceChecked] = useMutation(UPDATE_LAST_CHECKED_MUTATION)

  const onClick = () => {
    deviceChecked({ variables: { id: device.id } })
    navigate(routes.deviceDetails({ id: device.id }))
  }

  const showNotification =
    device.lastUpdateAt &&
    (!device.lastCheckedAt || device.lastCheckedAt < device.lastUpdateAt)

  return (
    <div className="relative">
      <button
        onClick={onClick}
        className="w-full flex gap-3 border rounded-lg border-green-700 p-3 text-left focus-outline:none hover:bg-green-600 hover:text-white"
      >
        <img src={tempIcon} className="h-7 my-auto" alt="Device Icon" />
        <p className="font-semibold">{device.name}</p>
      </button>
      {showNotification ? (
        <div
          className={`${
            device.armed ? 'notificationArmed' : 'notificationUnarmed'
          } absolute top-0 right-0 m-1 z-50 w-3 h-3`}
        />
      ) : null}
    </div>
  )
}

export default DeviceBlock
