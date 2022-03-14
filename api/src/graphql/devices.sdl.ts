export const schema = gql`
  type Device {
    id: String!
    createdAt: DateTime!
    name: String
    location: String
    occupancy: Int
    occupancyLimit: Int
    connectedAt: DateTime!
    lastUpdateAt: DateTime
    doorOpen: Boolean
    motionDetected: Boolean
    armed: Boolean

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
    occupancyLimit: Int
    armed: Boolean
  }

  type Mutation {
    createDevice(input: CreateDeviceInput!): Device! @requireAuth
    updateDevice(id: String!, input: UpdateDeviceInput!): Device! @requireAuth
    updateArmDevices(arm: Boolean!): [Device!]! @requireAuth
    deleteDevice(id: String!): Device! @requireAuth
    deviceChecked(id: String!): Device! @requireAuth
  }
`
