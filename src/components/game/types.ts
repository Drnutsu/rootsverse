export interface TextureColor {
  floorColor: string
  highlightBorder: string
  wallColor: {
    left: string
    right: string
  }
}

export interface ThemeColor {
  land: TextureColor
  sea: TextureColor
}

export interface MapProps {
  themeColor: ThemeColor
}

export interface StageProps {
  width: number
  height: number
  marginLeft: number
  themeColor: ThemeColor
}
