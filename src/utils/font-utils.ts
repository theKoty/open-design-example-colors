import type {
  DesignFontDesc,
  FontDesc,
  FontFamilyDesc,
  GoolgeFontsResponse,
  RecognizedFontDesc,
  UnrecognizedFontDesc,
} from '../types'

export const FONT_WEIGHT_NAMES = {
  '100': 'Thin',
  '200': 'ExtraLight',
  '300': 'Light',
  '400': 'Normal',
  '500': 'Medium',
  '600': 'SemiBold',
  '700': 'Bold',
  '800': 'Extra Bold',
  '900': 'Black',
  '950': 'ExtraBlack',
  'regular': 'Regular',
}

export function getGoogleFontName(fontName: string): string {
  // NOTE: Insert a space before all caps and remove variant (-Bold etc.)
  const camelEdges = /([A-Z](?=[A-Z][a-z])|[^A-Z\s](?=[A-Z])|[a-zA-Z](?=[^a-zA-Z\s]))/g
  return getFontNameWithoutVariant(fontName).replace(camelEdges, '$1 ')
}

export function getFontNameWithoutVariant(fontName: string): string {
  const [name, removedVariant] = fontName.split('-')
  return name
}

export function getVariantFromFontName(fontName: string): string {
  const [name, variant] = fontName.split('-')
  return variant || ''
}

export function getFontsDesc(designFonts: DesignFontDesc[]): FontDesc[] {
  return designFonts.map(({ artboardLayerIds, fontPostScriptName }) => {
    const googleFontName = getGoogleFontName(fontPostScriptName)
    const variant = getVariantFromFontName(fontPostScriptName)

    return {
      artboardLayerIds,
      fontPostScriptName,
      googleFontName,
      variant,
    }
  })
}

export function getRecognizedGoogleFonts(
  googleFonts: GoolgeFontsResponse,
  fontsDesc: FontDesc[],
): [RecognizedFontDesc[], UnrecognizedFontDesc[]] {
  const recognized: RecognizedFontDesc[] = []
  const unrecognized: UnrecognizedFontDesc[] = [...fontsDesc]

  googleFonts.items.forEach((googleData) => {
    for (let i = unrecognized.length - 1; i >= 0; --i) {
      const fontDesc = unrecognized[i]
      if (fontDesc.googleFontName === googleData.family) {
        recognized.push({ googleData, ...fontDesc })
        unrecognized.splice(i, 1)
      }
    }
  })

  return [recognized, unrecognized]
}

export function mergeFontsByFamily(recognizedFonts: RecognizedFontDesc[]): FontFamilyDesc[] {
  const familiesDesc: FontFamilyDesc[] = []

  recognizedFonts.forEach((recognizedFont) => {
    const family = familiesDesc.find(({ name }) => name === recognizedFont.googleFontName)

    if (family) {
      family.variants = new Set([...family.variants, recognizedFont.variant])
    } else {
      familiesDesc.push({
        name: recognizedFont.googleFontName,
        googleData: recognizedFont.googleData,
        variants: new Set([recognizedFont.variant]),
      })
    }
  })

  return familiesDesc
}

export function isVariantUsedInDesign(variant: string, variants: Set<string>) {
  const weightName = FONT_WEIGHT_NAMES[variant]

  return variants.has(variant) || variants.has(weightName)
}
