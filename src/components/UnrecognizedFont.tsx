import cn from 'classnames'

import styles from './UnrecognizedFont.module.css'

import type { UnrecognizedFontDesc } from '../types'

interface Props {
  desc: UnrecognizedFontDesc
}

export default function UnrecognizedFont(props: Props) {
  return <div className={styles.fontName}>{props.desc.fontPostScriptName}</div>
}
