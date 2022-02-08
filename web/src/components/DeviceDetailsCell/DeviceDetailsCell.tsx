import type { DeviceDetailsQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import DeviceDetails from 'src/components/DeviceDetails'

export const QUERY = gql`
  query DeviceDetailsQuery($id: Int!) {
    device: device(id: $id) {
      id
      name
      createdAt
      location
      occupancy
      connectedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ device }: CellSuccessProps<DeviceDetailsQuery>) => {
  return <DeviceDetails device={device} />
}
