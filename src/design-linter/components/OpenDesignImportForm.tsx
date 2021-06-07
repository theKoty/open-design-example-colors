import classnames from 'classnames'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'

import Content from './Content'
import Form from './Form'

// import styles from './OpenDesignImportForm.module.css'

export default function OpenDesignImportForm() {
  const router = useRouter()
  const [designId, setDesignId] = useState('')
  const handleSubmit = useCallback(() => {
    router.push(`/open-design/${designId.trim()}`)
  }, [designId])

  return (
    <Content>
      <Form onSubmit={handleSubmit}>
        <Form.TextInput
          label='Design ID:'
          placeholder='Open Design API Design UUID'
          value={designId}
          onChange={setDesignId}
        />
        <Form.SubmitButton label='Open Design' />
      </Form>
    </Content>
  )
}
