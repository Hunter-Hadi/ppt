export type IToolUrkKeyType = 'pdf-to-png';
export interface IToolData {
  icon: string;
  title: string;
  description: string;
  urlKey: IToolUrkKeyType;
}

export const toolBoxObjData: { [key in IToolUrkKeyType]: IToolData } = {
  'pdf-to-png': {
    icon: 'CropOriginal',
    title: 'PDF to PNG',
    description: '将 pdf 转换为 png 并将每个页面下载为图像',
    urlKey: 'pdf-to-png',
  },
};
