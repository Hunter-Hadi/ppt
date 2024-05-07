export const functionalityCommonRemoveAndAddFileExtension = (
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
