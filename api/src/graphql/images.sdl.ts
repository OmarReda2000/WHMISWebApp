export const schema = gql`
  type Image {
    id: Int!
    data: String!
    time: DateTime!
    device: Device
    deviceId: String
  }

  type Query {
    images: [Image!]! @requireAuth
    image(id: Int!): Image @requireAuth
    imagesByDevice(deviceId: String!): [Image!]! @requireAuth
  }

  input CreateImageInput {
    data: String!
    deviceId: String
  }

  input UpdateImageInput {
    data: String
    deviceId: String
  }

  type Mutation {
    createImage(input: CreateImageInput!): Image! @requireAuth
    updateImage(id: Int!, input: UpdateImageInput!): Image! @requireAuth
    deleteImage(id: Int!): Image! @requireAuth
  }
`
