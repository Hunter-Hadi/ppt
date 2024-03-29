export type IToolUrkKeyType = 'pdf-to-png' | 'pdf-to-jpg';
export interface IToolData {
  icon: string;
  title: string;
  description: string;
  urlKey: IToolUrkKeyType;
  accept: string;
}

export const toolBoxObjData: { [key in IToolUrkKeyType]: IToolData } = {
  'pdf-to-png': {
    icon: 'CropOriginal',
    title: 'PDF to PNG',
    description: '将 pdf 转换为 png 并将每个页面下载为图像',
    urlKey: 'pdf-to-png',
    accept: 'application/pdf',
  },
  'pdf-to-jpg': {
    icon: 'CropOriginal',
    title: 'PDF to JPG',
    description: '将 pdf 转换为 jpg 并将每个页面下载为图像',
    urlKey: 'pdf-to-jpg',
    accept: 'application/pdf',
  },
};
