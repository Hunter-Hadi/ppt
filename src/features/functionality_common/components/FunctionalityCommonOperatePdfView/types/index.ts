export type IFabricAddObjectType = 'image' | 'text-box' | 'text' | 'i-text'
export type ICanvasObjectData = {
  x?: number
  y?: number
  id: string
  type: IFabricAddObjectType
  value: string
}
