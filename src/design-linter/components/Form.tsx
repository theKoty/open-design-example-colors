import classnames from 'classnames'
import { useCallback } from 'react'

import styles from './Form.module.css'

export default function Form({ children = null, onSubmit = null }) {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {children}
    </form>
  )
}

Form.TextInput = function ({ label, placeholder = '', value = '', onChange = null }) {
  const handleChange = useCallback(
    (e) => {
      onChange?.(e.target.value || '')
    },
    [onChange],
  )

  return (
    <div className={styles.formRow}>
      <label className={styles.inputLabel}>{label}</label>
      <input
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}

Form.SubmitButton = function ({ label }) {
  return (
    <div className={styles.formRow}>
      <button type='submit' className={styles.submitButton}>
        {label}
      </button>
    </div>
  )
}
