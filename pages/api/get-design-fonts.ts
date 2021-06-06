import { NextApiRequest, NextApiResponse } from 'next'
import { createSdk } from '../../src/utils/sdk'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const designId = req.query.designId || process.env.NEXT_PUBLIC_EXAMPLE_DESIGN_ID

  if (!designId || typeof designId !== 'string') {
    return res.status(404)
  }

  const sdk = createSdk()
  const design = await sdk.fetchDesignById(designId)
  const fonts = await design.getFonts()

  sdk.destroy

  return res.status(200).json(fonts)
}
