import type { DeviceDetailsQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import DeviceDetails from 'src/components/DeviceDetails'

export const beforeQuery = (props) => {
  return {
    pollInterval: 1000 * 10,
    variables: { id: props.id },
  }
}

export const QUERY = gql`
  query DeviceDetailsQuery($id: String!) {
    device: device(id: $id) {
      id
      name
      location
      occupancy
      occupancyLimit
      doorOpen
      motionDetected
      armed
      lastUpdateAt
      connectedAt
      createdAt
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
