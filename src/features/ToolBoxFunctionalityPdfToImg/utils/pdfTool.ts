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
export const generatePdfToImage = async (
  pdfDoc: any, //PDFDocumentProxy react-pdfjs没有导出
  pageNum: number,
  toType: string,
  scale: number = 1.6,
) => {
  const page = await pdfDoc.getPage(pageNum);
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  const renderContext = {
    canvasContext: context!,
    viewport: viewport,
  };
  await page.render(renderContext).promise;
  const imageDataUrl = canvas.toDataURL(`image/${toType}`);
  return {
    imageDataUrl,
    viewport,
  };
};
