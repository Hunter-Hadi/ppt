import { atom } from 'recoil'

import { ITextContentHighlighterViewportHighlight } from '../types/TextContentHighlighter'

// 创建一个 atom 用于存储高亮颜色
export const highlightColorState = atom({
  key: 'highlightColorState', // 唯一的标识符
  default: 'red', // 默认高亮颜色（例如：黄色）
})

// 创建一个 atom 用于存储下划线颜色
export const underlineColorState = atom({
  key: 'underlineColorState', // 唯一的标识符
  default: 'red', // 默认下划线颜色（例如：蓝色）
})

// 创建一个 atom 用于存储删除线颜色
export const strikethroughColorState = atom({
  key: 'strikethroughColorState', // 唯一的标识符
  default: 'red', // 默认删除线颜色（例如：红色）
})

// 创建一个 atom 用于存储全部的注释标注数据
export const textAnnotatorRecoilList = atom<
  ITextContentHighlighterViewportHighlight[][]
>({
  key: 'textAnnotatorRecoilList', // 唯一的标识符
  default: [], // 默认高亮颜色（例如：黄色）
})
