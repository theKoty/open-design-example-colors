import Link from 'next/link'
import classnames from 'classnames'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={classnames(styles.container, 'container')}>
        <Link href='/'>
          <a className={styles.container}>
            <img src='/images/logo.svg' alt='Open Design' />
          </a>
        </Link>
      </div>
    </header>
  )
}
