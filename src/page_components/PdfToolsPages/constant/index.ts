import toolsCodeMap from './pdfToolsCodeMap.json';

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
  | 'ocr-pdf';
export interface IToolData {
  icon: string;
  title: string;
  description: string;
  secondaryDescription: string; //进入页面后的提示
  urlKey: IToolUrkKeyType;
  urlPrefixPath?: string;
}
const routerChildrenObject = toolsCodeMap.childrenObject as {
  [key in IToolUrkKeyType]: IToolUrkKeyType;
};
const toolsTopUrlKey = toolsCodeMap.topUrlKey;
export const toolsObjectData: { [key in IToolUrkKeyType]: IToolData } = {
  'merge-pdf': {
    icon: 'CropOriginal',
    title: 'pages:tools__index_page__constant_obj__merge_pdf__title',
    description:
      'pages:tools__index_page__constant_obj__merge_pdf__main_description',
    secondaryDescription:
      'pages:tools__index_page__constant_obj__merge_pdf__secondary_description',
    urlKey: routerChildrenObject['merge-pdf'],
    urlPrefixPath: toolsTopUrlKey,
  },
  'split-pdf': {
    icon: 'CropOriginal',
    title: 'pages:tools__index_page__constant_obj__split_a_pdf__title',
    description:
      'pages:tools__index_page__constant_obj__split_a_pdf__main_description',
    secondaryDescription:
      'pages:tools__index_page__constant_obj__split_a_pdf__secondary_description',
    urlKey: routerChildrenObject['split-pdf'],
    urlPrefixPath: toolsTopUrlKey,
  },
  'pdf-to-png': {
    icon: 'CropOriginal',
    title: 'pages:tools__index_page__constant_obj__pdf_to_png__title',
    description:
      'pages:tools__index_page__constant_obj__pdf_to_png__main_description',
    secondaryDescription:
      'pages:tools__index_page__constant_obj__pdf_to_png__secondary_description',
    urlKey: routerChildrenObject['pdf-to-png'],
    urlPrefixPath: toolsTopUrlKey,
  },
  'pdf-to-jpeg': {
    icon: 'CropOriginal',
    title: 'pages:tools__index_page__constant_obj__pdf_to_jpeg__title',
    description:
      'pages:tools__index_page__constant_obj__pdf_to_jpeg__main_description',
    secondaryDescription:
      'pages:tools__index_page__constant_obj__pdf_to_jpeg__secondary_description',
    urlKey: routerChildrenObject['pdf-to-jpeg'],
    urlPrefixPath: toolsTopUrlKey,
  },
  'png-to-pdf': {
    icon: 'CropOriginal',
    title: 'pages:tools__index_page__constant_obj__png_to_pdf__title',
    description:
      'pages:tools__index_page__constant_obj__png_to_pdf__main_description',
    secondaryDescription:
      'pages:tools__index_page__constant_obj__png_to_pdf__secondary_description',
    urlKey: routerChildrenObject['png-to-pdf'],
    urlPrefixPath: toolsTopUrlKey,
  },
  'jpeg-to-pdf': {
    icon: 'CropOriginal',
    title: 'pages:tools__index_page__constant_obj__jpeg_to_pdf__title',
    description:
      'pages:tools__index_page__constant_obj__jpeg_to_pdf__main_description',
    secondaryDescription:
      'pages:tools__index_page__constant_obj__jpeg_to_pdf__secondary_description',
    urlKey: routerChildrenObject['jpeg-to-pdf'],
    urlPrefixPath: toolsTopUrlKey,
  },
  'heic-to-pdf': {
    icon: 'CropOriginal',
    title: 'pages:tools__index_page__constant_obj__heic_to_pdf__title',
    description:
      'pages:tools__index_page__constant_obj__heic_to_pdf__main_description',
    secondaryDescription:
      'pages:tools__index_page__constant_obj__heic_to_pdf__secondary_description',
    urlKey: routerChildrenObject['heic-to-pdf'],
    urlPrefixPath: toolsTopUrlKey,
  },
  'pdf-to-html': {
    icon: 'CropOriginal',
    title: 'pages:tools__index_page__constant_obj__pdf_to_html__title',
    description:
      'pages:tools__index_page__constant_obj__pdf_to_html__description',
    secondaryDescription:
      'pages:tools__index_page__constant_obj__pdf_to_html__description',
    urlKey: routerChildrenObject['pdf-to-html'],
    urlPrefixPath: toolsTopUrlKey,
  },
  'sign-pdf': {
    icon: 'CropOriginal',
    title: 'pages:tools__index_page__constant_obj__sign_pdf__title',
    description:
      'pages:tools__index_page__constant_obj__sign_pdf__main_description',
    secondaryDescription:
      'pages:tools__index_page__constant_obj__sign_pdf__secondary_description',
    urlKey: routerChildrenObject['sign-pdf'],
    urlPrefixPath: toolsTopUrlKey,
  },
  'compress-pdf': {
    icon: 'CropOriginal',
    title: 'pages:tools__index_page__constant_obj__compress_pdf__title',
    description:
      'pages:tools__index_page__constant_obj__compress_pdf__main_description',
    secondaryDescription:
      'pages:tools__index_page__constant_obj__compress_pdf__main_description',
    urlKey: routerChildrenObject['compress-pdf'],
    urlPrefixPath: toolsTopUrlKey,
  },
  'ocr-pdf': {
    icon: 'CropOriginal',
    title: 'OCR PDF',
    description:
      'OCR scanned PDF documents, so you can easily choose to copy and search for text',
    secondaryDescription:
      'OCR your PDF to extract text from scanned documents.',
    urlKey: routerChildrenObject['ocr-pdf'],
    urlPrefixPath: toolsTopUrlKey,
  },
};
