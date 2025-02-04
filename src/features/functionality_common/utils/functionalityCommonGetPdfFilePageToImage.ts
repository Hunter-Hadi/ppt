import { pdfjs } from 'react-pdf';

/**
 * 生成Pdf到图像
 * @type pdfDocument - pdf文档
 * @type  pageNum - 页码
 * @type  scale - 缩放比例 默认1.6
 * @type  toType - 转换的类型 png/jpeg
 * @type  isNeedPdfHaveImages - 是否需要pdf内含有图像
 */

export const generatePdfPageToImage = async (
  pdfDocument: any, //PDFDocumentProxy react-pdfjs没有导出
  pageNum: number,
  scale: number = 1.6,
  toType: string = 'png',
  isNeedPdfHaveImages: boolean = false,
) => {
  try {
    const page = await pdfDocument.getPage(pageNum);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const renderContext = {
      canvasContext: context!,
      viewport: viewport,
    };
    const renderTask = page.render(renderContext);
    await renderTask.promise;
    const haveImages = isNeedPdfHaveImages ? await findPdfToImage(page) : null;
    const imageDataUrl = canvas.toDataURL(`image/${toType}`);
    return {
      imageDataUrl,
      viewport,
      width: viewport.width,
      height: viewport.height,
      haveImages,
    };
  } catch (e) {
    console.log('simply generatePdfToImage error', e);
    return null;
  }
};

/**
 * 查找Pdf内的图像
 * @param page - pdf的页面数据 - 通过pdfDocument.getPage(pageNum)获得
 */
export const findPdfToImage = async (page: any) => {
  const ops = await page.getOperatorList();
  const list = await new Promise<{ url: string; definedIndex: number }[]>(
    (resolve) => {
      // 获取操作列表
      const imageNames = ops.fnArray.reduce((acc, curr, i) => {
        if (
          [pdfjs.OPS.paintImageXObject, pdfjs.OPS.paintXObject].includes(curr)
        ) {
          acc.push(ops.argsArray[i][0]);
        }
        return acc;
      }, []);
      if (imageNames.length === 0) {
        resolve([]);
        return;
      }
      let haveImages: { url: string; definedIndex: number }[] = [];
      for (let i = 0; i < imageNames.length; i++) {
        page.objs.get(imageNames[i], (image) => {
          (async () => {
            try {
              const bmp = image.bitmap;
              const resizeScale = 1;
              const width = bmp.width * resizeScale;
              const height = bmp.height * resizeScale;
              const canvas = new OffscreenCanvas(width, height);
              const ctx = canvas.getContext('bitmaprenderer');
              bmp &&
                (ctx as ImageBitmapRenderingContext)?.transferFromImageBitmap(
                  bmp,
                ); //as 因为 build检测类型报错   并且   try catch 会拦截异常
              const blob = await (
                canvas as OffscreenCanvas & { convertToBlob: () => Blob }
              ).convertToBlob(); //as 因为 build检测类型报错  并且 try catch 会拦截异常
              if (blob) {
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () => {
                  const base64Data = reader.result?.toString() || '';
                  haveImages = [
                    ...haveImages,
                    {
                      url: base64Data,
                      definedIndex: i,
                    },
                  ];
                  if (haveImages.length === imageNames.length) {
                    resolve(haveImages);
                  }
                };
              }
            } catch (e) {
              resolve(haveImages);
              console.log('simply findPdfToImage error get', e);
            }
          })();
        });
      }
    },
  );
  return list
    .sort((a, b) => a.definedIndex - b.definedIndex)
    .map((image) => image.url);
};
