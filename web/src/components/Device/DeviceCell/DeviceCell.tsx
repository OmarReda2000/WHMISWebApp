import type { FindDeviceById } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Device from 'src/components/Device/Device'

export const QUERY = gql`
  query FindDeviceById($id: Int!) {
    device: device(id: $id) {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Device not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ device }: CellSuccessProps<FindDeviceById>) => {
  return <Device device={device} />
}
