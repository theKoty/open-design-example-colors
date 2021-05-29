import styles from './Artboards.module.css'

interface Props {
  imagesPaths: string[] | null
}

export default function Colors({ imagesPaths }: Props) {
  if (!imagesPaths) {
    return <div>fetching artboards...</div>
  }

  return (
    <section>
      <h2 className='headline-2'>Artboards</h2>

      <div className={styles.wrapper}>
        {imagesPaths?.map((path: string) => (
          <img key={path} className={styles.image} src={path} />
        ))}
      </div>
    </section>
  )
}
