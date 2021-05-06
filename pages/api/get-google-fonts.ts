import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const fonts = fs.readFileSync('data/google-fonts-list.json')

  return res.status(200).json(fonts)
}
