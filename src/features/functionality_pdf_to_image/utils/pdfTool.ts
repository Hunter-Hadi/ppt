export const dataURLtoBlob = async (base64Str: string) => {
  const arr = base64Str.split(',');
  const mime = arr?.[0].match(/:(.*?);/)?.[1];
  const bstr = Buffer.from(arr[1], 'base64').toString('binary');
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {
    type: mime,
  });
};
