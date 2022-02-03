import {
  devices,
  device,
  createDevice,
  updateDevice,
  deleteDevice,
} from './devices'
import type { StandardScenario } from './devices.scenarios'

describe('devices', () => {
  scenario('returns all devices', async (scenario: StandardScenario) => {
    const result = await devices()

    expect(result.length).toEqual(Object.keys(scenario.device).length)
  })

  scenario('returns a single device', async (scenario: StandardScenario) => {
    const result = await device({ id: scenario.device.one.id })

    expect(result).toEqual(scenario.device.one)
  })

  scenario('deletes a device', async (scenario: StandardScenario) => {
    const original = await deleteDevice({ id: scenario.device.one.id })
    const result = await device({ id: original.id })

    expect(result).toEqual(null)
  })
})
