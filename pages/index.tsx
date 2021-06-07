import { useState } from 'react'
import ArtboardList from '../src/design-linter/components/ArtboardList'
import ArtboardPreview from '../src/design-linter/components/ArtboardPreview'
import DesignProvider from '../src/design-linter/providers/DesignProvider'

export default function LinterPage() {
  const [selectedArtboard, setSelectedArtboard] = useState(null)

  const designId = process.env.NEXT_PUBLIC_EXAMPLE_DESIGN_ID

  if (!designId) {
    return null
  }

  return (
    <DesignProvider designId={designId}>
      {({ design, pages, artboards, issues, error }) =>
        design ? (
          <div className='container'>
            <div style={{ display: 'flex', flexDirection: 'row', marginTop: 32, marginBottom: 32 }}>
              <ArtboardList
                pages={pages}
                artboards={artboards}
                selectedArtboardId={selectedArtboard?.id || null}
                issues={issues}
                onArtboardSelectRequest={setSelectedArtboard}
              />
              <ArtboardPreview
                designId={designId}
                artboard={selectedArtboard}
                artboardWarnings={
                  selectedArtboard ? issues.warnings[selectedArtboard.id] || [] : []
                }
                artboardErrors={selectedArtboard ? issues.errors[selectedArtboard.id] || [] : []}
              />
            </div>
          </div>
        ) : (
          <div className='container'>
            <p>{error ? String(error) : 'Linting the design…'}</p>
          </div>
        )
      }
    </DesignProvider>
  )
}
