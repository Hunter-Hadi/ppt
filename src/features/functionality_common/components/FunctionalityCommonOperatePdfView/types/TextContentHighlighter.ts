export interface ITextContentHighlighterRectangle {
  // 矩形接口
  left: number // 矩形左边距
  top: number // 矩形上边距
  width: number // 矩形宽度
  height: number // 矩形高度
}

export interface ITextContentHighlighterPageRectangle
  extends ITextContentHighlighterRectangle {
  // 带页面编号的矩形接口
  pageNumber?: number // 页面编号， 可选
}

export interface ITextContentHighlighterScaled {
  // 缩放后的矩形接口
  x1: number // 矩形左上角X坐标
  y1: number // 矩形左上角Y坐标

  x2: number // 矩形右下角X坐标
  y2: number // 矩形右下角Y坐标

  width: number // 矩形宽度
  height: number // 矩形高度

  pageNumber?: number // 页面编号， 可选
}

export interface ITextContentHighlighterPosition {
  // 位置接口
  boundingRect: ITextContentHighlighterPageRectangle // 包围矩形
  rects: Array<ITextContentHighlighterPageRectangle> // 矩形数组
  pageNumber: number // 页面编号
}

export interface ITextContentHighlighterScaledPosition {
  // 缩放位置接口
  boundingRect: ITextContentHighlighterScaled // 包围矩形
  rects: Array<ITextContentHighlighterScaled> // 矩形数组
  pageNumber: number // 页面编号
  usePdfCoordinates?: boolean // 是否使用PDF坐标， 可选
}

export interface ITextContentHighlighterContent {
  // 内容接口
  text?: string // 文本内容， 可选
  image?: string // 图片内容， 可选
}

export interface ITextContentHighlighterComment {
  // 评论接口
  text: string // 评论文本
  emoji: string // 表情符号
}

export interface ITextContentHighlighterNewHighlight {
  // 新高亮接口
  position: ITextContentHighlighterScaledPosition // 位置
  id: string
}

export interface ITextContentHighlighterIHighlight
  extends ITextContentHighlighterNewHighlight {
  // 高亮接口
}
export interface ITextContentHighlighterAnnotationInfo {
  type: 'highlight' | 'underline' | 'strikethrough'
  color: string
  transparency?: number
}

export interface ITextContentHighlighterViewportHighlight {
  // 视口高亮接口
  position: ITextContentHighlighterPosition // 位置
  id: string // 高亮唯一标识
  annotation?: ITextContentHighlighterAnnotationInfo[]
}

export interface ITextContentHighlighterViewport {
  // 视口接口
  convertToPdfPoint: (x: number, y: number) => Array<number> // 转换为PDF坐标点
  convertToViewportRectangle: (pdfRectangle: Array<number>) => Array<number> // 将PDF矩形转换为视口矩形
  width: number // 视口宽度
  height: number // 视口高度
}

export interface ITextContentHighlighterPage {
  // 页面接口
  node: HTMLElement // 页面对应的HTML元素
  number: number // 页面编号
}
