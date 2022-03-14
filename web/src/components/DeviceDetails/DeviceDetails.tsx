import { useMutation } from '@redwoodjs/web'
import tempIcon from 'src/assets/tempIcon.png'
import { routes, navigate } from '@redwoodjs/router'
import { toast } from '@redwoodjs/web/dist/toast'
import { CheckboxField, Form, Submit, TextField } from '@redwoodjs/forms'
import { useEffect, useState } from 'react'

const FORGET_DEVICE_MUTATION = gql`
  mutation ForgetDeviceMutation($id: String!) {
    deleteDevice(id: $id) {
      id
    }
  }
`

const UPDATE_NAME_MUTATION = gql`
  mutation UpdateNameMutation($id: String!, $input: UpdateDeviceInput!) {
    updateDevice(id: $id, input: $input) {
      id
      name
      location
      occupancyLimit
      armed
    }
  }
`

const DeviceDetails = ({ device }) => {
  const [checkArmed, setCheckArmed] = useState<boolean>(device.armed)

  useEffect(() => {
    setCheckArmed(device.armed)
  }, [device.armed])

  const [forgetDevice] = useMutation(FORGET_DEVICE_MUTATION, {
    onCompleted: () => {
      navigate(routes.home())
      toast.success(`${device.name} removed`)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const [updateDevice] = useMutation(UPDATE_NAME_MUTATION, {
    onCompleted: () => {
      toast.success('Update successful')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onForgetDevice = (e) => {
    e.preventDefault() // Need to put this in or else it shows two toasts
    if (confirm('Are you sure you want to forget ' + device.name + '?')) {
      forgetDevice({ variables: { id: device.id } })
    }
  }

  const onSubmit = (data) => {
    const occupancyLimit = parseInt(data.occupancyLimit)
    delete data.occupancyLimit
    data.occupancyLimit = occupancyLimit

    updateDevice({
      variables: {
        id: device.id,
        input: data,
      },
    })
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
        <Form
          onSubmit={onSubmit}
          className="grid grid-cols-3 gap-x-8 gap-y-4 items-center"
        >
          <FieldName text="Occupancy" />
          <FieldData text={device.occupancy} />

          <FieldName text="Surpassed occupancy" />
          <BooleanFieldData
            bool={
              device.occupancyLimit &&
              device.occupancy &&
              device.occupancy > device.occupancyLimit
            }
          />

          <FieldName text="Door open" />
          <BooleanFieldData bool={device.doorOpen} />

          <FieldName text="Motion detected" />
          <BooleanFieldData bool={device.motionDetected} />

          <FieldName text="Security breach" />
          <BreachBooleanFieldData
            bool={
              device.armed &&
              (device.doorOpen ||
                device.motionDetected ||
                (device.occupancyLimit &&
                  device.occupancy &&
                  device.occupancy > device.occupancyLimit))
            }
          />

          <FieldName text="ID" />
          <FieldData text={device.id.toString()} />

          <FieldName text="First connection" />
          <FieldData text={new Date(device.createdAt).toLocaleString()} />

          <FieldName text="Most recent update" />
          <FieldData text={new Date(device.lastUpdateAt).toLocaleString()} />

          <FieldName text="Most recent connection" />
          <FieldData text={new Date(device.connectedAt).toLocaleString()} />

          <div className="col-span-3 w-full border-t border-gray-300"></div>

          <FieldName text="Name" />
          <EditableFieldData
            name="name"
            text={device.name}
            placeholder="Enter a name"
          />

          <FieldName text="Location" />
          <EditableFieldData
            name="location"
            text={device.location}
            placeholder="Enter a location"
          />

          <FieldName text="Occupancy Limit" />
          <EditableFieldData
            name="occupancyLimit"
            text={device.occupancyLimit}
            placeholder="Enter an occupancy limit"
          />

          <FieldName text="Arm System" />
          <div className="col-span-2">
            <CheckboxField
              name="armed"
              className="justify-center scale-1.5"
              // defaultChecked={checkArmed}
              checked={checkArmed}
              onClick={() => setCheckArmed(!checkArmed)}
            />
          </div>

          <div className="col-span-3 grid grid-cols-2 w-full gap-4">
            <Submit className="col-span-1 p-2 rounded-lg w-full bg-green-700 hover:bg-green-800 font-semibold text-white mt-5">
              Submit Changes
            </Submit>
            <button
              className="col-span-1 p-2 rounded-lg w-full bg-red-700 hover:bg-red-800 font-semibold text-white mt-5"
              onClick={onForgetDevice}
            >
              Forget Device
            </button>
          </div>
        </Form>
      </div>
    </>
  )
}

const FieldName = ({ text }: { text: string }) => {
  return <p className="col-span-1 font-semibold">{text}</p>
}

const FieldData = ({ text }: { text: string }) => {
  return <p className="col-span-2 p-0.5 pl-1.5">{text ? text : 'N/A'}</p>
}

const BooleanFieldData = ({ bool }: { bool: boolean }) => {
  return (
    <div
      className={`col-span-2 w-0.5 p-2 rounded-xl border-2 ${
        bool ? 'bg-green-700 border-green-700' : 'border-gray-400'
      }`}
    />
  )
}

const BreachBooleanFieldData = ({ bool }: { bool: boolean }) => {
  return (
    <div
      className={`col-span-2 w-0.5 p-2 rounded-xl border-2 ${
        bool ? 'bg-red-700 border-red-700' : 'border-gray-400'
      }`}
    />
  )
}

const EditableFieldData = ({
  name,
  text,
  placeholder = '',
}: {
  name: string
  text: string
  placeholder?: string
}) => {
  return (
    <TextField
      name={name}
      className="col-span-2 w-1/2 placeholder-shown:italic p-0.5 pl-1.5 rounded
      focus:outline-none focus:ring-green-700 focus:ring-2"
      defaultValue={text}
      placeholder={placeholder}
    />
  )
}

export default DeviceDetails
