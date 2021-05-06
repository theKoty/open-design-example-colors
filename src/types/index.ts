export type GoogleFile = {
  [fontVariant: string]: string
}

export type GoogleFontDesc = {
  categoty: string
  family: string
  files: GoogleFile
  subsets: string[]
  variants: string[]
}

export type GoolgeFontsResponse = {
  items: GoogleFontDesc[]
}

export type ArtboardLayerIds = {
  [artboardId: string]: string[]
}

export type DesignFontDesc = {
  artboardLayerIds: ArtboardLayerIds
  fontPostScriptName: string
}

export type FontDesc = {
  artboardLayerIds: ArtboardLayerIds
  fontPostScriptName: string
  googleFontName: string
  variant: string
}

export type FontFamilyDesc = {
  name: string
  googleData: GoogleFontDesc
  variants: Set<string>
}

export type RecognizedFontDesc = FontDesc & {
  googleData: GoogleFontDesc
}

export type UnrecognizedFontDesc = FontDesc
