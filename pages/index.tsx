import { useCallback, useEffect, useState } from 'react'
import Colors from '../src/components/Colors'
import Artboards from '../src/components/Artboards'
import { parseColorsFromLayers } from '../src/utils/parse-colors-from-layers'

export default function IndexPage() {
  const [designId] = useState(process.env.NEXT_PUBLIC_EXAMPLE_DESIGN_ID)

  const [colors, setColors] = useState(null)
  const [artboardsImagesPaths, setArtboardsImagesPaths] = useState(null)

  const getLayers = useCallback(async () => {
    const res = await fetch(`/api/get-layers?designId=${designId}`, {
      method: 'GET',
      credentials: 'include',
    })

    const layers = await res.json()
    const colors = parseColorsFromLayers(layers)
    setColors(colors)
  }, [designId])

  const getArtboardImages = useCallback(async () => {
    const res = await fetch(`/api/get-artboards-images?designId=${designId}`, {
      method: 'GET',
      credentials: 'include',
    })

    const artboardsImagesPaths = await res.json()
    setArtboardsImagesPaths(artboardsImagesPaths)
  }, [designId])

  useEffect(() => {
    getLayers()
    getArtboardImages()
  }, [])

  return (
    <div className='container'>
      <Artboards imagesPaths={artboardsImagesPaths} />
      <Colors colors={colors} />
    </div>
  )
}
