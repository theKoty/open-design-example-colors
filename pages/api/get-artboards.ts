import { NextApiRequest, NextApiResponse } from 'next'
import sdk from '../../src/utils/sdk'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { designId } = req.query

  if (!designId || typeof designId !== 'string') {
    return res.status(404)
  }

  const design = await sdk.fetchDesignById(designId)
  const artboards = await design.getArtboards()

  const response = await Promise.all(
    artboards.map(async (artboard) => {
      const content = await artboard.getContent()
      return { artboard, frame: content.frame }
    }),
  )

  return res.status(200).json(response)
}
