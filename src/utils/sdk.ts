import { createSdk as _createSdk, Sdk } from '@opendesign/sdk'

export function createSdk() {
  const sdk: Sdk = _createSdk({
    token: process.env.API_TOKEN,
  })
  return sdk
}
