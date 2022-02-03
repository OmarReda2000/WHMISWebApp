export const schema = gql`
  type Device {
    id: Int!
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
    device(id: Int!): Device @requireAuth
  }

  input CreateDeviceInput {
    name: String
  }

  input UpdateDeviceInput {
    name: String
  }

  type Mutation {
    createDevice(input: CreateDeviceInput!): Device! @requireAuth
    updateDevice(id: Int!, input: UpdateDeviceInput!): Device! @requireAuth
    deleteDevice(id: Int!): Device! @requireAuth
    # deviceChecked(id: Int!): Device! @requireAuth
  }
`
