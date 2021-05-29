import _uniqby from 'lodash.uniqby'
import rgbHex from 'rgb-hex'

interface Color {
  r: number
  g: number
  b: number
  a: number
}

function parseColor(color: Color) {
  if (!color) return

  const { r, g, b, a } = color
  const colorHex = `#${rgbHex(r, g, b, undefined)}`
  const colorRgba = `rgba(${r}, ${g}, ${b}, ${a})`
  return { colorHex, colorRgba }
}

function getEffectColors(effect) {
  return effect?.map(({ color }) => parseColor(color))?.filter((c) => c) || []
}

export function parseColorsFromLayers(layers) {
  return layers.reduce((acc, { octopus: layer }) => {
    const { fills, borders, shadows } = layer?.effects || {}
    const textColor = layer?.text?.defaultStyle?.color

    return {
      ...(acc || {}),
      [layer.type]: _uniqby(
        [
          ...(acc[layer.type] || []),
          ...getEffectColors(fills),
          ...getEffectColors(borders),
          ...getEffectColors(shadows),
          ...(textColor ? [parseColor(textColor)] : []),
        ],
        'colorHex',
      ),
    }
  }, {})
}
