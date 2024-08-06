import { atom } from 'recoil'

// 创建一个 atom 用于存储高亮颜色
export const fabricCanvasJsonStringListRecoil = atom<string[]>({
  key: 'fabricCanvasJsonStringList', // 唯一的标识符
  default: [], // 默认高亮颜色（例如：黄色）
})
// 创建一个 atom 用于存储高亮颜色
export const fabricCanvasSignObjectListRecoil = atom<string[]>({
  key: 'fabricCanvasJsonStringList', // 唯一的标识符
  default: [], // 默认高亮颜色（例如：黄色）
})
