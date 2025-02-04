import dayjs from 'dayjs'
import { createContext } from 'react'
import { atom } from 'recoil'

import { IControlDiv } from '../hooks/useFunctionalityCommonFabricCanvasEvent'

export const fabricCanvasJsonStringListRecoil = atom<string[]>({
  key: 'fabricCanvasJsonStringList', // 唯一的标识符
  default: [], // 默认高亮颜色（例如：黄色）
}) //当前的pdf index  CanvasJson

export const fabricCanvasSignObjectListRecoil = atom<string[]>({
  key: 'fabricCanvasSignObjectListRecoil',
  default: [],
}) //当前有多少sign object

export const fabricCanvasZoomRecoil = atom<number>({
  key: 'fabricCanvasZoomRecoil',
  default: 1,
})

export const functionalitySignPdfOperationOBjectDefault = {
  // 操作列表功能的储存值
  yourSignature: [],
  yourInitials: [],
  index: {
    yourSignature: 0, //左边有功能，点击直接添加，所以储存index
    yourInitials: 0,
  },
  textField:
    'functionality__sign_pdf:components__sign_pdf__operation_oBject_default__type__text_field__type_something',
  dateField: dayjs().format('MM/DD/YYYY'), //虽然不是时时，但是也没必要因为是天数
  checkbox: '✔',
}

export const FunctionalitySignPdfOperationOBjectAtom = atom<{
  //用户输入的签名的数据，左右都需要，所以存放在这里
  yourSignature: string[]
  yourInitials: string[]
  index: {
    yourSignature: number
    yourInitials: number
  }
  textField: string
  dateField: string
  checkbox: string
}>({
  key: 'FunctionalitySignPdfOperationOBjectAtom', // 这个 key 在全局范围内必须是唯一的
  default: functionalitySignPdfOperationOBjectDefault,
})
export interface IFunctionalitySignPdfShowPdfViewObjectToolsPopupProps {
  controlDiv: IControlDiv
  scaleFactor: number
  editor: React.MutableRefObject<any | null>
}

export const TopDetailSignPdfSelectInfoContext = createContext<{
  viewObjectToolsData: IFunctionalitySignPdfShowPdfViewObjectToolsPopupProps | null
  setViewObjectToolsData: (data: any) => void
}>({
  viewObjectToolsData: null,
  setViewObjectToolsData: () => {},
}) //让外部可以操作里面的数据
