import { NextApiRequest, NextApiResponse } from 'next'
import { createSdk } from '../../src/utils/sdk'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { figmaFileKey } = req.query

  if (!figmaFileKey || typeof figmaFileKey !== 'string') {
    return res.status(404)
  }

  const sdk = createSdk()
  const response = await sdk.importFigmaDesign({
    figmaFileKey,
    figmaToken: process.env.FIGMA_TOKEN,
  })

  sdk.destroy()

  return res.status(200).json(response)
}
