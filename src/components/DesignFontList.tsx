import React, { useEffect, useState } from 'react'

import Loading from './Loading'
import RecognizedFonts from './RecognizedFonts'
import UnrecognizedFonts from './UnrecognizedFonts'

import { getFontsDesc, getRecognizedGoogleFonts, mergeFontsByFamily } from '../utils/font-utils'

import type { FontFamilyDesc, UnrecognizedFontDesc } from '../types'

export default function DesignFontList() {
  const [recognizedFonts, setRecognizedFonts] = useState<FontFamilyDesc[]>([])
  const [unrecognizedFonts, setUnrecognizedFonts] = useState<UnrecognizedFontDesc[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const getDesignFonts = async () => {
    setLoading(true)
    const [googleResponse, designResponse] = await Promise.all([
      fetch('/api/get-google-fonts'),
      fetch('/api/get-design-fonts'),
    ])
    const [googleFonts, designFonts] = await Promise.all([
      googleResponse.json(),
      designResponse.json(),
    ])

    const fontsDesc = getFontsDesc(designFonts)
    const [recognizedFonts, unrecognizedFonts] = getRecognizedGoogleFonts(googleFonts, fontsDesc)
    const fontFamilies = mergeFontsByFamily(recognizedFonts)

    setRecognizedFonts(fontFamilies)
    setUnrecognizedFonts(unrecognizedFonts)
    setLoading(false)
  }

  useEffect(() => {
    getDesignFonts()
  }, [])

  return (
    <>
      {loading && <Loading title='Loading font list…' />}
      {!loading && (
        <>
          <RecognizedFonts fonts={recognizedFonts} />
          {Boolean(unrecognizedFonts.length) && <UnrecognizedFonts fonts={unrecognizedFonts} />}
        </>
      )}
    </>
  )
}
