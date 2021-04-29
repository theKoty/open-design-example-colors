import { createSdk, Sdk } from '@opendesign/sdk'

const sdk: Sdk = createSdk({
  token: process.env.API_TOKEN,
})

export default sdk
