export type IToolUrkKeyType = 'pdf-to-png' | 'pdf-to-jpeg' | 'merge-pdfs';
export interface IToolData {
  icon: string;
  title: string;
  description: string;
  urlKey: IToolUrkKeyType;
  accept: string;
}
export const toolsTopUrlKey = 'tools';
export const toolsObjectData: { [key in IToolUrkKeyType]: IToolData } = {
  'merge-pdfs': {
    icon: 'CropOriginal',
    title: 'pages:tool_box_index_page_constant_obj_merge_pdfs_title',
    description:
      'pages:tool_box_index_page_constant_obj_merge_pdfs_description',
    urlKey: 'merge-pdfs',
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
