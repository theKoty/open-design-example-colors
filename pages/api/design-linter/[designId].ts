import { LayerFacade } from '@opendesign/sdk/dist/layer-facade'
import { NextApiRequest, NextApiResponse } from 'next'
import { createSdk } from '../../../src/design-linter/utils/sdk'

async function lintLayer(layer: LayerFacade) {
  const issues = {
    errors: [],
    warnings: [],
  }
  const position = layer.octopus['bounds'] || (await layer.getBounds()).logicalBounds

  switch (layer.type) {
    case 'groupLayer':
      if (/^Group (\d+)$/.test(layer.name)) {
        issues.errors.push({
          layerId: layer.id,
          type: 'naming',
          value: layer.name,
          message: 'Default layer name',
          position,
        })
      }
      break
    case 'shapeLayer':
      if (/^(Shape|Oval|Rectangle) (\d+)$/.test(layer.name)) {
        issues.errors.push({
          layerId: layer.id,
          type: 'naming',
          value: layer.name,
          message: 'Default layer name',
          position,
        })
      }
      break
  }

  return issues
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const designId = String(req.query['designId'])
  if (!designId || typeof designId !== 'string') {
    return res.status(404)
  }

  const sdk = createSdk()
  const design = await sdk.fetchDesignById(designId)
  const layers = await design.getFlattenedLayers()
  const issues = await layers.reduce(
    async (prevIssuesPromise, layer) => {
      const prevIssues = await prevIssuesPromise

      const layerIssues = await lintLayer(layer)
      return {
        errors:
          layerIssues.errors.length > 0
            ? {
                ...prevIssues.errors,
                [layer.artboardId]: [
                  ...(prevIssues.errors[layer.artboardId] || []),
                  ...layerIssues.errors,
                ],
              }
            : prevIssues.errors,
        warnings:
          layerIssues.warnings.length > 0
            ? {
                ...prevIssues.warnings,
                [layer.artboardId]: [
                  ...(prevIssues.warnings[layer.artboardId] || []),
                  ...layerIssues.warnings,
                ],
              }
            : prevIssues.warnings,
      }
    },
    Promise.resolve({
      errors: {},
      warnings: {},
    }),
  )

  sdk.destroy()

  return res.status(200).json({
    design,
    pages: design.getPages(),
    artboards: await Promise.all(
      design.getArtboards().map(async (artboard) => {
        return {
          ...artboard,
          bounds: await artboard.getBounds(),
          layers: (await artboard.getFlattenedLayers()).map((layer) => {
            return { id: layer.id, name: layer.name, depth: layer.getDepth() }
          }),
        }
      }),
    ),
    issues,
  })
}
