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
export interface IToolData {
  icon: string;
  title: string;
  description: string;
  secondaryDescription: string;//进入页面后的提示
  urlKey: IToolUrkKeyType;
  accept: string;
  urlPrefixPath?: string
}
const routerChildrens = (toolsCodeMap.childrens as { [key in IToolUrkKeyType]: IToolUrkKeyType });
const toolsTopUrlKey = toolsCodeMap.topUrlKey;
export const toolsObjectData: { [key in IToolUrkKeyType]: IToolData } = {
  'merge-pdf': {
    icon: 'CropOriginal',
    title: 'pages:tools__index_page__constant_obj__merge_pdfs__title',
    description:
      'pages:tools__index_page__constant_obj__merge_pdfs__main_description',
    secondaryDescription:
      'pages:tools__index_page__constant_obj__merge_pdfs__secondary_description',
    urlKey: routerChildrens['merge-pdf'],
    accept: 'application/pdf',
    urlPrefixPath: toolsTopUrlKey,
  },
  'split-pdf': {
    icon: 'CropOriginal',
    title: 'pages:tools__index_page__constant_obj__split_a_pdf__title',
    description:
      'pages:tools__index_page__constant_obj__split_a_pdf__main_description',
    secondaryDescription:
      'pages:tools__index_page__constant_obj__split_a_pdf__secondary_description',
    urlKey: routerChildrens['split-pdf'],
    accept: 'application/pdf',
    urlPrefixPath: toolsTopUrlKey,
  },
  'pdf-to-png': {
    icon: 'CropOriginal',
    title: 'pages:tools__index_page__constant_obj__pdf_to_png__title',
    description:
      'pages:tools__index_page__constant_obj__pdf_to_png__main_description',
    secondaryDescription:
      'pages:tools__index_page__constant_obj__pdf_to_png__secondary_description',
    urlKey: routerChildrens['pdf-to-png'],
    accept: 'application/pdf',
    urlPrefixPath: toolsTopUrlKey,
  },
  'pdf-to-jpeg': {
    icon: 'CropOriginal',
    title: 'pages:tools__index_page__constant_obj__pdf_to_jpeg__title',
    description:
      'pages:tools__index_page__constant_obj__pdf_to_jpeg__main_description',
    secondaryDescription:
      'pages:tools__index_page__constant_obj__pdf_to_jpeg__secondary_description',
    urlKey: routerChildrens['pdf-to-jpeg'],
    accept: 'application/pdf',
    urlPrefixPath: toolsTopUrlKey,
  },
  'png-to-pdf': {
    icon: 'CropOriginal',
    title: 'pages:tools__index_page__constant_obj__png_to_pdf__title',
    description:
      'pages:tools__index_page__constant_obj__png_to_pdf__main_description',
    secondaryDescription:
      'pages:tools__index_page__constant_obj__png_to_pdf__secondary_description',
    urlKey: routerChildrens['png-to-pdf'],
    accept: 'image/png',
    urlPrefixPath: toolsTopUrlKey,
  },
  'jpeg-to-pdf': {
    icon: 'CropOriginal',
    title: 'pages:tools__index_page__constant_obj__jpeg_to_pdf__title',
    description:
      'pages:tools__index_page__constant_obj__jpeg_to_pdf__main_description',
    secondaryDescription:
      'pages:tools__index_page__constant_obj__jpeg_to_pdf__secondary_description',
    urlKey: routerChildrens['jpeg-to-pdf'],
    accept: 'image/jpg',
    urlPrefixPath: toolsTopUrlKey,
  },
  'heic-to-pdf': {
    icon: 'CropOriginal',
    title: 'pages:tools__index_page__constant_obj__heic_to_pdf__title',
    description:
      'pages:tools__index_page__constant_obj__heic_to_pdf__main_description',
    secondaryDescription:
      'pages:tools__index_page__constant_obj__heic_to_pdf__secondary_description',
    urlKey: routerChildrens['heic-to-pdf'],
    accept: 'image/heic',
    urlPrefixPath: toolsTopUrlKey,
  },
  "pdf-to-html": {
    icon: 'CropOriginal',
    title: 'pages:tools__index_page__constant_obj__pdf_to_html__title',
    description:
      'pages:tools__index_page__constant_obj__pdf_to_html__description',
    secondaryDescription:
      'pages:tools__index_page__constant_obj__pdf_to_html__description',
    urlKey: routerChildrens['pdf-to-html'],
    accept: 'image/heic',
    urlPrefixPath: toolsTopUrlKey,
  },
  "sign-pdf": {
    icon: 'CropOriginal',
    title: 'pages:tools__index_page__constant_obj__sign_pdf__title',
    description:
      'pages:tools__index_page__constant_obj__sign_pdf__main_description',
    secondaryDescription:
      'pages:tools__index_page__constant_obj__sign_pdf__secondary_description',
    urlKey: routerChildrens['sign-pdf'],
    accept: 'application/pdf',
    urlPrefixPath: toolsTopUrlKey,
  }
};
