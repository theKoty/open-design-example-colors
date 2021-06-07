import useSWR from 'swr'

export default function DesignProvider(props: {
  designId: string
  children: (props: {
    design: { 'id': string } | null
    pages: Array<{ id: string; name: string }>
    artboards: Array<{
      id: string
      name: string
      pageId: string | null
      bounds: { width: number; height: number }
      layers: Array<{ id: string; name: string; depth: number }>
    }>
    issues: {
      errors: {
        [artboardId: string]: Array<{
          layerId: string
          type: string
          value: string
          message: string
          position: { left: number; top: number } | null
        }>
      }
      warnings: {
        [artboardId: string]: Array<{
          layerId: string
          type: string
          value: string
          message: string
          position: { left: number; top: number } | null
        }>
      }
    }
    error: any
  }) => JSX.Element
}) {
  const { data, error } = useSWR(`/api/design-linter/${props.designId}`)

  return props.children({
    design: data ? data.design : null,
    pages: data ? data.pages : {},
    artboards: data ? data.artboards : [],
    issues: data ? data.issues : [],
    error,
  })
}
