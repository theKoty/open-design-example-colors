import React from 'react'

import styles from './Loading.module.css'

interface Props {
  title?: string
}

export default function Loading(props: Props) {
  return <div className={styles.loading}>{props.title || 'Loading…'}</div>
}
