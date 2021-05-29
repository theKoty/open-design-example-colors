import fs from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import { createSdk } from '../../src/utils/sdk'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { designId } = req.query

  if (!designId || typeof designId !== 'string') {
    return res.status(404)
  }

  const sdk = createSdk()
  const design = await sdk.fetchDesignById(designId)
  const artboards = await design.getArtboards()

  const folderPath = `./public/images/artboards/${design.id}`
  const folderPathExists = fs.existsSync(folderPath)

  if (!folderPathExists) {
    fs.mkdirSync(folderPath)
  }

  const artboardsImagesPaths = await Promise.all(
    artboards.map((artboard) => {
      artboard.renderToFile(`${folderPath}/${artboard.id}.png`)
      return `/images/artboards/${design.id}/${artboard.id}.png`
    }),
  )

  sdk.destroy()

  return res.status(200).json(artboardsImagesPaths)
}
