import type { Prisma } from '@prisma/client'

import { db } from 'src/lib/db'

export const devices = () => {
  return db.device.findMany()
}

export const device = ({ id }: Prisma.DeviceWhereUniqueInput) => {
  return db.device.findUnique({
    where: { id },
  })
}

interface CreateDeviceArgs {
  input: Prisma.DeviceCreateInput
}

export const createDevice = ({ input }: CreateDeviceArgs) => {
  return db.device.create({
    data: input,
  })
}

interface UpdateDeviceArgs extends Prisma.DeviceWhereUniqueInput {
  input: Prisma.DeviceUpdateInput
}

export const updateDevice = ({ id, input }: UpdateDeviceArgs) => {
  return db.device.update({
    data: input,
    where: { id },
  })
}

export const deleteDevice = ({ id }: Prisma.DeviceWhereUniqueInput) => {
  return db.device.delete({
    where: { id },
  })
}