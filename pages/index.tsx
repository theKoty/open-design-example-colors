import React from 'react'

import DesignFontList from '../src/components/DesignFontList'
import DesignPreview from '../src/components/DesignPreview'

export default function IndexPage() {
  return (
    <div className='container'>
      <DesignPreview />
      <DesignFontList />
    </div>
  )
}
