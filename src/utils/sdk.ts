import { createSdk as _createSdk } from '@opendesign/sdk'

export function createSdk() {
  return _createSdk({
    token: process.env.API_TOKEN,
    console: { level: 'debug' },
  })
}
