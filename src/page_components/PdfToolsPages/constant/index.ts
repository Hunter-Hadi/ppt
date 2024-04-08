export type IToolUrkKeyType =
  | 'pdf-to-png'
  | 'pdf-to-jpeg'
  | 'merge-pdf'
  | 'split-pdf';
export interface IToolData {
  icon: string;
  title: string;
  description: string;
  urlKey: IToolUrkKeyType;
  accept: string;
}
export const toolsTopUrlKey = 'pdf-tools';
export const toolsObjectData: { [key in IToolUrkKeyType]: IToolData } = {
  'merge-pdf': {
    icon: 'CropOriginal',
    title: 'pages:tools__index_page__constant_obj__merge_pdfs__title',
    description:
      'pages:tools__index_page__constant_obj__merge_pdfs__description',
    urlKey: 'merge-pdf',
    accept: 'application/pdf',
  },
  'split-pdf': {
    icon: 'CropOriginal',
    title: 'pages:tools__index_page__constant_obj__split_a_pdf__title',
    description:
      'pages:tools__index_page__constant_obj__split_a_pdf__description',
    urlKey: 'split-pdf',
    accept: 'application/pdf',
  },
  'pdf-to-png': {
    icon: 'CropOriginal',
    title: 'pages:tools__index_page__constant_obj__pdf_to_png__title',
    description:
      'pages:tools__index_page__constant_obj__pdf_to_png__description',
    urlKey: 'pdf-to-png',
    accept: 'application/pdf',
  },
  'pdf-to-jpeg': {
    icon: 'CropOriginal',
    title: 'pages:tools__index_page__constant_obj__pdf_to_jpeg__title',
    description:
      'pages:tools__index_page__constant_obj__pdf_to_jpeg__description',
    urlKey: 'pdf-to-jpeg',
    accept: 'application/pdf',
  },
};
