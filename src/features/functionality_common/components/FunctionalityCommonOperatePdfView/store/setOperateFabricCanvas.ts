import { atom } from 'recoil'


export const fabricCanvasJsonStringListRecoil = atom<string[]>({
  key: 'fabricCanvasJsonStringList', // 唯一的标识符
  default: [], // 默认高亮颜色（例如：黄色）
})//当前的pdf index  CanvasJson

export const fabricCanvasSignObjectListRecoil = atom<string[]>({
  key: 'fabricCanvasJsonStringList',
  default: [],
})//当前有多少sign object

export const fabricCanvasZoomRecoil = atom<number>({
  key: 'fabricCanvasZoomRecoil',
  default: 1,
})//当前有多少sign object
