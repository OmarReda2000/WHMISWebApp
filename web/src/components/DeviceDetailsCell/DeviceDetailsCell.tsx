import type { DeviceDetailsQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query DeviceDetailsQuery($id: Int!) {
    device: device(id: $id) {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ device }: CellSuccessProps<DeviceDetailsQuery>) => {
  return (
    <div className="grid grid-cols-3 gap-x-8 gap-y-4 bg-gray-100 w-max rounded-lg shadow-lg p-4 mx-auto my-4 ">
      <FieldName text="ID" />
      <FieldData text={device.id.toString()} />
      <FieldName text="Name" />
      <FieldData text={device.name} />
    </div>
  )
}

const FieldName = ({ text }: { text: string }) => {
  return <p className="col-span-1 font-semibold">{text}</p>
}

const FieldData = ({ text }: { text: string }) => {
  return <p className="col-span-2">{text}</p>
}
