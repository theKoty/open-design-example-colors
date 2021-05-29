import styles from './Colors.module.css'

interface Props {
  colors: any
}

export default function ColorPalette({ colors }: Props) {
  return (
    <div>
      {Object.keys(colors)?.map((layerType: string) => (
        <div key={layerType}>
          <h2 className='headline-3'>{layerType.replace('Layer', ' colors')}</h2>

          <div className={styles.wrapper}>
            {colors[layerType].map(({ colorHex, colorRgba }) => (
              <div className={styles.item} key={layerType}>
                <div className={styles.itemColor} style={{ backgroundColor: colorRgba }} />

                <div>
                  <strong>rgba:</strong> {colorRgba}
                  <br />
                  <strong>hex:</strong> {colorHex}
                  <br />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
