export const schema = gql`
  type Device {
    id: Int!
    name: String
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
  }
`
