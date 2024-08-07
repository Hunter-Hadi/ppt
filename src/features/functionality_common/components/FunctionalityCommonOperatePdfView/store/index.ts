import { atom } from 'recoil'

export const currentScrollOffsetRecoil = atom({
  key: 'currentScrollOffsetRecoil', // 唯一的标识符
  default: 0, // 默认高亮颜色（例如：黄色）
})
