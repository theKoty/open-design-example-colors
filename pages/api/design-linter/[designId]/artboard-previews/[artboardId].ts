import { NextApiRequest, NextApiResponse } from 'next'
import { createSdk } from '../../../../../src/design-linter/utils/sdk'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const designId = String(req.query['designId'])
  const artboardId = decodeURIComponent(String(req.query['artboardId']))
  if (!designId || typeof designId !== 'string' || !artboardId || typeof artboardId !== 'string') {
    return res.status(404)
  }

  const sdk = createSdk()
  const design = await sdk.fetchDesignById(designId)

  const safeArtboardName = artboardId.replace(/[^a-z0-9-]/g, '-')
  const imageBasename = `artboard_${designId}_${safeArtboardName}.png`
  await design.renderArtboardToFile(artboardId, `./public/${imageBasename}`)

  sdk.destroy()

  return res.redirect(`/${imageBasename}`)
}
