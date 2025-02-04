import toolsCodeMap from './pdfToolsCodeMap.json'

export type IToolUrkKeyType =
  | 'pdf-to-png'
  | 'pdf-to-jpeg'
  | 'merge-pdf'
  | 'split-pdf'
  | 'png-to-pdf'
  | 'jpeg-to-pdf'
  | 'heic-to-pdf'
  | 'pdf-to-html'
  | 'sign-pdf'
  | 'compress-pdf'
  | 'pdf-ocr'
  | 'add-page-numbers-to-pdf'
  | 'rotate-pdf'
  | 'unlock-pdf'
  | 'pdf-annotator'
  | 'protect-pdf'
  | 'watermark-pdf'
  | 'redact-pdf'
  | 'flatten-pdf'
  | 'delete-pages-from-pdf'
  | 'extract-pdf-pages'
export interface IToolData {
  icon: string
  title: string
  detailTitle?: string
  description: string
  secondaryDescription: string //进入页面后的提示
  urlKey: IToolUrkKeyType
  urlPrefixPath?: string
  accept?: string
}
const routerChildrenObject = toolsCodeMap.childrenObject as {
  [key in IToolUrkKeyType]: IToolUrkKeyType
}
const toolsTopUrlKey = toolsCodeMap.topUrlKey
export const toolsObjectData: { [key in IToolUrkKeyType]: IToolData } = {
  'merge-pdf': {
    icon: 'MergePDF',
    title: 'pages:tools__index_page__constant_obj__merge_pdf__title',
    description:
      'pages:tools__index_page__constant_obj__merge_pdf__main_description',
    secondaryDescription:
      'pages:tools__index_page__constant_obj__merge_pdf__secondary_description',
    urlKey: routerChildrenObject['merge-pdf'],
    urlPrefixPath: toolsTopUrlKey,
  },
  'split-pdf': {
    icon: 'SplitPDF',
    title: 'pages:tools__index_page__constant_obj__split_a_pdf__title',
    description:
      'pages:tools__index_page__constant_obj__split_a_pdf__main_description',
    secondaryDescription:
      'pages:tools__index_page__constant_obj__split_a_pdf__secondary_description',
    urlKey: routerChildrenObject['split-pdf'],
    urlPrefixPath: toolsTopUrlKey,
  },
  'pdf-to-png': {
    icon: 'PDFToPNG',
    title: 'pages:tools__index_page__constant_obj__pdf_to_png__title',
    description:
      'pages:tools__index_page__constant_obj__pdf_to_png__main_description',
    secondaryDescription:
      'pages:tools__index_page__constant_obj__pdf_to_png__secondary_description',
    urlKey: routerChildrenObject['pdf-to-png'],
    urlPrefixPath: toolsTopUrlKey,
  },
  'pdf-to-jpeg': {
    icon: 'PDFToJPEG',
    title: 'pages:tools__index_page__constant_obj__pdf_to_jpeg__title',
    description:
      'pages:tools__index_page__constant_obj__pdf_to_jpeg__main_description',
    secondaryDescription:
      'pages:tools__index_page__constant_obj__pdf_to_jpeg__secondary_description',
    urlKey: routerChildrenObject['pdf-to-jpeg'],
    urlPrefixPath: toolsTopUrlKey,
  },
  'png-to-pdf': {
    icon: 'PNGToPDF',
    title: 'pages:tools__index_page__constant_obj__png_to_pdf__title',
    description:
      'pages:tools__index_page__constant_obj__png_to_pdf__main_description',
    secondaryDescription:
      'pages:tools__index_page__constant_obj__png_to_pdf__secondary_description',
    urlKey: routerChildrenObject['png-to-pdf'],
    urlPrefixPath: toolsTopUrlKey,
    accept: 'image/png',
  },
  'jpeg-to-pdf': {
    icon: 'JPEGToPDF',
    title: 'pages:tools__index_page__constant_obj__jpeg_to_pdf__title',
    description:
      'pages:tools__index_page__constant_obj__jpeg_to_pdf__main_description',
    secondaryDescription:
      'pages:tools__index_page__constant_obj__jpeg_to_pdf__secondary_description',
    urlKey: routerChildrenObject['jpeg-to-pdf'],
    urlPrefixPath: toolsTopUrlKey,
    accept: 'image/jpg,image/jpeg',
  },
  'heic-to-pdf': {
    icon: 'HEICToPDF',
    title: 'pages:tools__index_page__constant_obj__heic_to_pdf__title',
    description:
      'pages:tools__index_page__constant_obj__heic_to_pdf__main_description',
    secondaryDescription:
      'pages:tools__index_page__constant_obj__heic_to_pdf__secondary_description',
    urlKey: routerChildrenObject['heic-to-pdf'],
    urlPrefixPath: toolsTopUrlKey,
    accept: 'image/heic',
  },
  'pdf-to-html': {
    icon: 'PDFToHTML',
    title: 'pages:tools__index_page__constant_obj__pdf_to_html__title',
    description:
      'pages:tools__index_page__constant_obj__pdf_to_html__description',
    secondaryDescription:
      'pages:tools__index_page__constant_obj__pdf_to_html__description',
    urlKey: routerChildrenObject['pdf-to-html'],
    urlPrefixPath: toolsTopUrlKey,
  },
  'sign-pdf': {
    icon: 'SignPDF',
    title: 'pages:tools__index_page__constant_obj__sign_pdf__title',
    description:
      'pages:tools__index_page__constant_obj__sign_pdf__main_description',
    secondaryDescription:
      'pages:tools__index_page__constant_obj__sign_pdf__secondary_description',
    urlKey: routerChildrenObject['sign-pdf'],
    urlPrefixPath: toolsTopUrlKey,
  },
  'compress-pdf': {
    icon: 'CompressPDF',
    title: 'pages:tools__index_page__constant_obj__compress_pdf__title',
    description:
      'pages:tools__index_page__constant_obj__compress_pdf__main_description',
    secondaryDescription:
      'pages:tools__index_page__constant_obj__compress_pdf__main_description',
    urlKey: routerChildrenObject['compress-pdf'],
    urlPrefixPath: toolsTopUrlKey,
  },
  'pdf-ocr': {
    icon: 'OcrPDF',
    title: 'pages:tools__index_page__constant_obj__ocr_pdf__title',
    description:
      'pages:tools__index_page__constant_obj__ocr_pdf__main_description',
    secondaryDescription:
      'pages:tools__index_page__constant_obj__ocr_pdf__main_description',
    urlKey: routerChildrenObject['pdf-ocr'],
    urlPrefixPath: toolsTopUrlKey,
  },
  'rotate-pdf': {
    icon: 'RotatePDF',
    title: 'pages:tools__index_page__constant_obj__rotate_pdf__title',
    description:
      'pages:tools__index_page__constant_obj__rotate_pdf__main_description',
    secondaryDescription:
      'pages:tools__index_page__constant_obj__rotate_pdf__secondary_description',
    urlKey: routerChildrenObject['rotate-pdf'],
    urlPrefixPath: toolsTopUrlKey,
  },
  'add-page-numbers-to-pdf': {
    icon: 'NumberPages',
    title: 'pages:tools__index_page__constant_obj__pdf_page_numbers__title',
    detailTitle:
      'pages:tools__index_page__constant_obj__pdf_page_numbers__detail__title',
    description:
      'pages:tools__index_page__constant_obj__pdf_page_numbers__main_description',
    secondaryDescription:
      'pages:tools__index_page__constant_obj__pdf_page_numbers__secondary_description',
    urlKey: routerChildrenObject['add-page-numbers-to-pdf'],
    urlPrefixPath: toolsTopUrlKey,
  },
  'unlock-pdf': {
    icon: 'UnlockPDF',
    title: 'pages__pdf_tools__unlock_pdf:title',
    description: 'pages__pdf_tools__unlock_pdf:description',
    secondaryDescription: 'pages__pdf_tools__unlock_pdf:description',
    urlKey: routerChildrenObject['unlock-pdf'],
    urlPrefixPath: toolsTopUrlKey,
  },
  'protect-pdf': {
    icon: 'ProtectPDF',
    title: 'pages__pdf_tools__protect_pdf:title',
    description: 'pages__pdf_tools__protect_pdf:description',
    secondaryDescription: 'pages__pdf_tools__protect_pdf:description',
    urlKey: routerChildrenObject['protect-pdf'],
  },
  'watermark-pdf': {
    icon: 'WaterMarkPDF',
    title: 'pages:tools__index_page__constant_obj__pdf_page_watermark__title',
    description:
      'pages:tools__index_page__constant_obj__pdf_page_watermark__main_description',
    secondaryDescription: '',
    urlKey: routerChildrenObject['watermark-pdf'],
    urlPrefixPath: toolsTopUrlKey,
  },
  'pdf-annotator': {
    icon: 'PDFAnnotator',
    title: 'pages__pdf_tools__pdf_annotator:title',
    description: 'pages__pdf_tools__pdf_annotator:description',
    secondaryDescription: 'pages__pdf_tools__pdf_annotator:description',
    urlKey: routerChildrenObject['pdf-annotator'],
  },
  'delete-pages-from-pdf': {
    icon: 'DeletePagePDF',
    title: 'pages:tools__index_page__constant_obj__pdf_page_deletepage__title',
    detailTitle:
      'pages:tools__index_page__constant_obj__pdf_page_deletepage__detail__title',
    description:
      'pages:tools__index_page__constant_obj__pdf_page_deletepage__main_description',
    secondaryDescription: '',
    urlKey: routerChildrenObject['delete-pages-from-pdf'],
    urlPrefixPath: toolsTopUrlKey,
  },
  'extract-pdf-pages': {
    icon: 'ExtractPagePDF',
    title: 'pages:tools__index_page__constant_obj__pdf_page_extractpage__title',
    description:
      'pages:tools__index_page__constant_obj__pdf_page_extractpage__main_description',
    secondaryDescription: '',
    urlKey: routerChildrenObject['extract-pdf-pages'],
    urlPrefixPath: toolsTopUrlKey,
  },
  'flatten-pdf': {
    icon: 'FlattenPDF',
    title: 'pages__pdf_tools__flatten_pdf:title',
    description: 'pages__pdf_tools__flatten_pdf:min_description',
    secondaryDescription: 'pages__pdf_tools__flatten_pdf:description',
    urlKey: routerChildrenObject['flatten-pdf'],
    urlPrefixPath: toolsTopUrlKey,
  },
  'redact-pdf': {
    icon: 'RedactPDF',
    title: 'pages__pdf_tools__redact_pdf:title',
    description:
      'pages__pdf_tools__redact_pdf:description',
    secondaryDescription: '',
    urlKey: routerChildrenObject['redact-pdf'],
    urlPrefixPath: toolsTopUrlKey,
  },
}
export const pdfToolsList = Object.keys(toolsObjectData).map((key) => ({
  key,
  ...toolsObjectData[key],
}))
