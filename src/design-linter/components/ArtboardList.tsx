import classNames from 'classnames'
import { useCallback, useState } from 'react'

import styles from './ArtboardList.module.css'

export default function ArtboardList(props: {
  pages: Array<{ id: string; name: string }>
  artboards: Array<{
    id: string
    name: string
    pageId: string | null
    layers: Array<{ id: string; name: string; depth: number }>
  }>
  issues: {
    errors: {
      [artboardId: string]: Array<{ layerId: string; type: string; value: string; message: string }>
    }
    warnings: {
      [artboardId: string]: Array<{ layerId: string; type: string; value: string; message: string }>
    }
  }
  selectedArtboardId: string | null
  onArtboardSelectRequest:
    | ((artboard: { id: string; name: string; pageId: string | null }) => void)
    | null
}) {
  const [artboardsByPage] = useState(() => {
    return props.artboards.reduce((byPage, artboard) => {
      return {
        ...byPage,
        [artboard.pageId]: [...(byPage[artboard.pageId] || []), artboard],
      }
    }, {} as { [pageId: string]: typeof props['artboards'] })
  })

  return (
    <ul className={styles.pageList}>
      {props.pages.map((page) => (
        <li key={page.id}>
          <ArtboardList.PageItem page={page} />
          <ul className={styles.artboardList}>
            {(artboardsByPage[page.id] || []).map((artboard) => (
              <li key={artboard.id}>
                <ArtboardList.ArtboardItem
                  artboard={artboard}
                  selected={artboard.id === props.selectedArtboardId}
                  warningCount={props.issues.warnings[artboard.id]?.length || 0}
                  errorCount={props.issues.errors[artboard.id]?.length || 0}
                  onSelectRequest={props.onArtboardSelectRequest}
                />
                {artboard.id === props.selectedArtboardId && (
                  <ul className={styles.layerList}>
                    {artboard.layers.map((layer) => (
                      <ArtboardList.LayerItem
                        key={layer.id}
                        layer={layer}
                        warningCount={
                          props.issues.warnings[artboard.id]?.filter(
                            (issue) => issue.layerId === layer.id,
                          ).length || 0
                        }
                        errorCount={
                          props.issues.errors[artboard.id]?.filter(
                            (issue) => issue.layerId === layer.id,
                          ).length || 0
                        }
                      />
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}

ArtboardList.PageItem = function (props: { page: { id: string; name: string } }) {
  return (
    <div className={styles.pageItem}>
      <span className={styles.pageName}>{props.page.name}</span>
    </div>
  )
}

ArtboardList.ArtboardItem = function (props: {
  artboard: { id: string; name: string }
  selected: boolean
  warningCount: number
  errorCount: number
  onSelectRequest: ((artboard: { id: string; name: string }) => void) | null
}) {
  return (
    <div
      className={classNames(
        styles.artboardItem,
        props.selected ? styles.selectedArtboardItem : null,
      )}
      onClick={useCallback(() => {
        if (props.selected) {
          return props.onSelectRequest?.(null)
        }
        props.onSelectRequest?.(props.artboard)
      }, [props.selected, props.artboard, props.onSelectRequest])}
    >
      <span className={styles.artboardName}>{props.artboard.name}</span>
      {props.warningCount ? (
        <span className={classNames(styles.warningCount, styles.countLarge)}>
          {props.warningCount}
        </span>
      ) : null}
      {props.errorCount ? (
        <span className={classNames(styles.errorCount, styles.countLarge)}>{props.errorCount}</span>
      ) : null}

      <svg
        className={classNames(styles.arrow, { [styles.arrowOpen]: props.selected })}
        xmlns='http://www.w3.org/2000/svg'
        width='12'
        height='12'
        viewBox='0 0 24 24'
      >
        <path d='M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z' />
      </svg>
    </div>
  )
}

ArtboardList.LayerItem = function (props: {
  layer: { id: string; name: string; depth: number }
  warningCount: number
  errorCount: number
}) {
  return (
    <div
      className={styles.layerItem}
      style={{
        paddingLeft: props.layer.depth + 'rem',
      }}
    >
      <span className={styles.layerName}>{props.layer.name}</span>
      {props.warningCount ? (
        <span className={styles.warningCount}>{props.warningCount}</span>
      ) : null}
      {props.errorCount ? <span className={styles.errorCount}>{props.errorCount}</span> : null}
    </div>
  )
}
