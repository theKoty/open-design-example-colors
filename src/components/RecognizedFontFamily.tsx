import cn from 'classnames'
import { useEffect } from 'react'
import WebFont from 'webfontloader'

import { isVariantUsedInDesign } from '../utils/font-utils'

import type { FontFamilyDesc } from '../types'

import styles from './RecognizedFontFamily.module.css'

interface Props {
  desc: FontFamilyDesc
}

export default function RecognizedFontFamily(props: Props) {
  const { name, variants, googleData } = props.desc

  useEffect(() => {
    WebFont.load({
      google: {
        families: [name],
      },
    })
  }, [name])

  return (
    <div className={styles.container}>
      <div
        className={styles.fontNameStyled}
        style={{
          fontFamily: name,
        }}
      >
        {name}
      </div>
      <div className={styles.variants}>
        {Object.entries(googleData.files).map(([key, value]) => {
          const used = isVariantUsedInDesign(key, variants)
          return (
            <a
              key={value}
              className={cn(styles.variant, {
                [styles.variantUsed]: used,
              })}
              href={value}
              download
              title={used ? 'Used in the design' : 'Not used in the design'}
            >
              {key}
            </a>
          )
        })}
      </div>
    </div>
  )
}
