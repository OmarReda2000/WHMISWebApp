import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.DeviceCreateArgs>({
  device: { one: { data: {} }, two: { data: {} } },
})

export type StandardScenario = typeof standard
