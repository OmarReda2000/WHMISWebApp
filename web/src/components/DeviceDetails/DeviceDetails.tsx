import { useMutation } from '@redwoodjs/web'
import tempIcon from 'src/assets/tempIcon.png'
import { routes, navigate } from '@redwoodjs/router'

// const UPDATE_LAST_CHECKED_MUTATION = gql`
//   mutation UpdateLastCheckedMutation($id: Int!) {
//     deviceChecked(id: $id) {
//       id
//     }
//   }
// `

const FORGET_DEVICE_MUTATION = gql`
  mutation ForgetDeviceMutation($id: Int!) {
    deleteDevice(id: $id) {
      id
    }
  }
`

const DeviceDetails = ({ device }) => {
  // const [deviceChecked] = useMutation(UPDATE_LAST_CHECKED_MUTATION)
  // deviceChecked({ variables: { id: device.id } })

  const [forgetDevice] = useMutation(FORGET_DEVICE_MUTATION, {
    onCompleted: () => {
      navigate(routes.home())
    },
  })

  const onForgetDevice = () => {
    if (confirm('Are you sure you want to forget ' + device.name + '?')) {
      forgetDevice({ variables: { id: device.id } })
    }
  }

  return (
    <>
      <div className="my-6">
        <img src={tempIcon} className="h-32 mx-auto" alt="Device Icon" />
        <p className="text-2xl font-semibold text-green-700 text-center mt-1">
          {device.name}
        </p>
      </div>
      <div className="bg-gray-100 w-max rounded-lg shadow-lg p-4 mx-auto my-4">
        <div className="grid grid-cols-3 gap-x-8 gap-y-4  ">
          <FieldName text="ID" />
          <FieldData text={device.id.toString()} />
          <FieldName text="Name" />
          <FieldData text={device.name} />
          <FieldName text="Location" />
          <FieldData text={device.location} />
          <FieldName text="Occupancy" />
          <FieldData text={device.occupancy} />
          <FieldName text="First connection" />
          <FieldData text={new Date(device.createdAt).toLocaleString()} />
          <FieldName text="Most recent connection" />
          <FieldData text={new Date(device.createdAt).toLocaleString()} />
        </div>
        <button
          className="p-2 rounded-lg w-full bg-green-700 hover:bg-green-800 font-semibold text-white mt-5"
          onClick={onForgetDevice}
        >
          Forget Device
        </button>
      </div>
    </>
  )
}

const FieldName = ({ text }: { text: string }) => {
  return <p className="col-span-1 font-semibold">{text}</p>
}

const FieldData = ({ text }: { text: string }) => {
  return <p className="col-span-2">{text ? text : 'N/A'}</p>
}

export default DeviceDetails
