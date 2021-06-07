import { useEffect, useRef, useState } from 'react'
import styles from './ArtboardPreview.module.css'

function getArtboardPreviewImage(designId: string, artboardId: string) {
  const img = new Image()
  img.src = `/api/design-linter/${designId}/artboard-previews/${encodeURIComponent(artboardId)}`
  img.className = styles.artboardPreviewImage
  return img
}

export default function ArtboardPreview(props: {
  designId: string
  artboard: {
    id: string
    name: string
    pageId: string | null
    bounds: { width: number; height: number }
  } | null
  artboardWarnings: Array<{
    layerId: string
    type: string
    value: string
    message: string
    position: { left: number; top: number } | null
  }>
  artboardErrors: Array<{
    layerId: string
    type: string
    value: string
    message: string
    position: { left: number; top: number } | null
  }>
}) {
  const cacheRef = useRef({})
  const imageContainerRef = useRef(null)
  const [loadingImage, setLoadingImage] = useState(false)

  const artboardId = props.artboard?.id || null
  const artboardBounds = props.artboard?.bounds || { width: 1, height: 1 }

  useEffect(() => {
    cacheRef.current = {}
  }, [props.designId])

  useEffect(() => {
    if (!artboardId) {
      return
    }

    const cachedImage = cacheRef.current[artboardId]
    let img = cachedImage

    if (!img) {
      img = getArtboardPreviewImage(props.designId, artboardId)

      cacheRef.current[artboardId] = img
      img.onerror = () => {
        cacheRef.current[artboardId] = null
      }

      setLoadingImage(true)
    }

    const handleLoad = () => {
      setLoadingImage(false)
    }
    img.addEventListener('load', handleLoad)

    if (imageContainerRef.current) {
      imageContainerRef.current.innerHTML = ''
      imageContainerRef.current.appendChild(img)
    }

    return () => {
      img.removeEventListener('load', handleLoad)
    }
  }, [props.designId, artboardId])

  return (
    <div className={styles.artboardPreview}>
      <div className={styles.artboardPreviewImageArea}>
        {props.artboard && loadingImage ? <span>Loading image…</span> : null}
        {props.artboard ? (
          <div className={styles.artboardPreviewImageContainer} ref={imageContainerRef}></div>
        ) : (
          <div className={styles.emptyState}>
            no artboard selected (select one from the left list)
          </div>
        )}
        <div className={styles.issues}>
          {props.artboardErrors.map((error) => (
            <span
              key={error.layerId}
              className={styles.error}
              style={
                error.position
                  ? {
                      left: (error.position.left / artboardBounds.width) * 100 + '%',
                      top: (error.position.top / artboardBounds.height) * 100 + '%',
                    }
                  : {}
              }
            >
              <span className={styles.issueLabel}>{error.message}</span>
            </span>
          ))}
          {props.artboardWarnings.map((warning) => (
            <span
              key={warning.layerId}
              className={styles.warning}
              style={
                warning.position
                  ? {
                      left: (warning.position.left / artboardBounds.width) * 100 + '%',
                      top: (warning.position.top / artboardBounds.height) * 100 + '%',
                    }
                  : {}
              }
            >
              <span className={styles.issueLabel}>{warning.message}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
