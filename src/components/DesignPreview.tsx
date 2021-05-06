import React, { useEffect, useState } from 'react'

import styles from './DesignPreview.module.css'

export default function DesignPreview() {
  const [loading, setLoading] = useState<boolean>(true)
  const [imagesPaths, setImagesPaths] = useState<string[]>([])

  const renderDesigns = async () => {
    setLoading(true)
    const res = await fetch('/api/render-design')
    const filePaths = await res.json()
    setImagesPaths(filePaths)
    setLoading(false)
  }

  useEffect(() => {
    renderDesigns()
  }, [])

  return (
    <>
      <h2>Design preview</h2>
      <div className={styles.container}>
        {loading && !imagesPaths.length && <div className={styles.placeholder} />}
        {imagesPaths.map((imagePath, index) => (
          <img key={index} className={styles.image} src={imagePath} />
        ))}
      </div>
    </>
  )
}
