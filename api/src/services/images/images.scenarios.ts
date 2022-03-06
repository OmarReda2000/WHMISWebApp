import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.ImageCreateArgs>({
  image: {
    one: { data: { data: 'String' } },
    two: { data: { data: 'String' } },
  },
})

export type StandardScenario = typeof standard
