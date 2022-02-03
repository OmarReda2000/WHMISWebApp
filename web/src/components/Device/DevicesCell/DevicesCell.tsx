import type { FindDevices } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { Link, routes } from '@redwoodjs/router'

import Devices from 'src/components/Device/Devices'

export const QUERY = gql`
  query FindDevices {
    devices {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No devices yet. '}
      <Link
        to={routes.newDevice()}
        className="rw-link"
      >
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ devices }: CellSuccessProps<FindDevices>) => {
  return <Devices devices={devices} />
}
