import React from 'react'

import UnrecognizedFont from './UnrecognizedFont'

import type { UnrecognizedFontDesc } from '../types'

import styles from './UnrecognizedFonts.module.css'

interface Props {
  fonts: UnrecognizedFontDesc[]
}

export default function UnrecognizedFonts(props: Props) {
  return (
    <>
      <h2>Unrecognized design fonts</h2>
      <div className={styles.banner}>The application only recognizes free Google Fonts</div>
      {props.fonts.map((desc, index) => (
        <UnrecognizedFont key={index} desc={desc} />
      ))}
    </>
  )
}
