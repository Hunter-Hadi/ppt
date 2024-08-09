import { Rect } from 'fabric/fabric-impl';
type RectOptions = ConstructorParameters<typeof Rect>[0];

export type IFabricAddObjectType = 'image' | 'text-box' | 'text' | 'i-text'
export type ICanvasObjectData = {
  x?: number
  y?: number
  id: string
  value: string
} & (
  { type: IFabricAddObjectType, imageType?: 'insertImage' } |
  { type: 'redact', imageType?: 'redact' } & RectOptions
);