import styles from './Content.module.css'

export default function Content({ children = null }) {
  return <div className={styles.content}>{children}</div>
}
