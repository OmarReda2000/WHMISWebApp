import type { DevicesQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import DeviceBlock from 'src/components/DeviceBlock'

export const QUERY = gql`
  query DevicesQuery {
    devices {
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

export const Success = ({ devices }: CellSuccessProps<DevicesQuery>) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 mx-2 my-3">
      {devices.map((device) => (
        <DeviceBlock key={device.id} device={device} />
      ))}
    </div>
  )
}
