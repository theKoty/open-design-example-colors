import { useCallback, useMemo } from 'react'
import colorHelper from 'color-to-name'
import styles from './Colors.module.css'

interface Props {
  colors: any
}

export default function ColorPalette({ colors }: Props) {
  const kebabcase = useCallback((s) => s.replace(/ /g, '-'), [])

  const variables = useMemo(
    () => `:root {
${Object.keys(colors)
  ?.map((layerType: string) =>
    colors[layerType]
      ?.map(({ colorHex }) => {
        const { name } = colorHelper.findClosestColor(colorHex)
        return `  --color-${layerType.replace('Layer', '')}-${kebabcase(name)}: ${colorHex}`
      })
      .join(';\n'),
  )
  .join(';\n\n')};\n}`,
    [colors],
  )

  return <textarea readOnly className={styles.codeOutput} rows={23} value={variables} />
}
