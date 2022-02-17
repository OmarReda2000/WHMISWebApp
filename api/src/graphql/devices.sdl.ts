export const schema = gql`
  type Device {
    id: String!
    createdAt: DateTime!
    name: String
    location: String
    occupancy: Int
    connectedAt: DateTime!
    lastUpdateAt: DateTime

    # Not for the user
    lastStatusUpdate: DateTime
    lastCheckedAt: DateTime
  }

  type Query {
    devices: [Device!]! @requireAuth
    device(id: String!): Device @requireAuth
  }

  input CreateDeviceInput {
    name: String
  }

  input UpdateDeviceInput {
    name: String
    location: String
  }

  type Mutation {
    createDevice(input: CreateDeviceInput!): Device! @requireAuth
    updateDevice(id: String!, input: UpdateDeviceInput!): Device! @requireAuth
    deleteDevice(id: String!): Device! @requireAuth
    # deviceChecked(id: String!): Device! @requireAuth
  }
`
