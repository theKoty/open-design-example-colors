import React from 'react'
import dynamic from 'next/dynamic'

import type { FontFamilyDesc } from '../types'

const RecognizedFontFamily = dynamic(() => import('../components/RecognizedFontFamily'), {
  ssr: false,
})

interface Props {
  fonts: FontFamilyDesc[]
}

export default function RecognizedFonts(props: Props) {
  return (
    <div>
      <h2>Design fonts</h2>
      {props.fonts.map((desc, index) => (
        <RecognizedFontFamily key={index} desc={desc} />
      ))}
    </div>
  )
}
