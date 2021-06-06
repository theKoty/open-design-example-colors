import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import { createSdk } from '../../src/utils/sdk'

const PUBLIC_FOLDER = './public/'

function createDesignFolder(designId: string) {
  const folderPath = `${PUBLIC_FOLDER}${designId}`

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath)
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const designId = req.query.designId || process.env.NEXT_PUBLIC_EXAMPLE_DESIGN_ID

  if (!designId || typeof designId !== 'string') {
    return res.status(404)
  }

  const sdk = createSdk()
  const design = await sdk.fetchDesignById(designId)
  const artboards = design.getArtboards()

  createDesignFolder(designId)

  const filePaths = []
  await Promise.all(
    artboards.map((artboard) => {
      const filePath = `${designId}/${artboard.id}.png`
      filePaths.push(filePath)
      return artboard.renderToFile(`${PUBLIC_FOLDER}${filePath}`)
    }),
  )

  sdk.destroy()

  return res.status(200).json(filePaths)
}
