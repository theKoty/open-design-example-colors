import ColorPalette from './ColorPalette'
import ColorVariables from './ColorVariables'

export default function Colors({ colors }) {
  if (!colors) {
    return <div>fetching layers...</div>
  }

  return (
    <>
      <section>
        <h2 className='headline-2'>Color palette</h2>
        <ColorPalette colors={colors} />
      </section>

      <section>
        <h2 className='headline-2'>Color variables</h2>
        <ColorVariables colors={colors} />
      </section>
    </>
  )
}
