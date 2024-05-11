//给文件名添加后缀，以及添加提示
export const functionalityCommonFileNameRemoveAndAddExtension = (
  fileName: string,
  extensionType: string = 'pdf',
  addExtensionType?: string,
  addExtensionTips: string = '(Powered by MaxAI)',
) => {
  let newFileName = fileName;
  if (newFileName.endsWith(`.${extensionType}`)) {
    newFileName = newFileName.slice(0, -4);
  }
  const newAddExtensionType = addExtensionType ?? extensionType;
  const newAddExtensionSpot = newAddExtensionType ? '.' : '';
  return (
    newFileName + addExtensionTips + newAddExtensionSpot + newAddExtensionType
  );
};
