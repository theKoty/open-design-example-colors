import { NextApiRequest, NextApiResponse } from 'next'
import { createSdk } from '../../src/utils/sdk'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { designId } = req.query

  if (!designId || typeof designId !== 'string') {
    return res.status(404)
  }

  const sdk = createSdk()
  const design = await sdk.fetchDesignById(designId)
  const layers = await design.findLayers({
    type: ['textLayer', 'shapeLayer'],
  })

  sdk.destroy()

  return res.status(200).json(layers)
}
