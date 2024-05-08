import {
  PDFArray,
  PDFDocument,
  PDFName,
  PDFObject,
  PDFRawStream,
  PDFRef,
} from 'pdf-lib';

// 定义图片接口
export interface IPdfLibImage {
  data: Uint8Array;
  name: string;
  type: 'jpeg' | 'png';
  pdfObject: PDFRawStream;
  ref: PDFRef;
  sMaskRef?: PDFObject;
  colorSpace?: PDFObject;
  isAlphaLayer?: boolean;
  width: number;
  height: number;
}

// 获取图片类型
function getImageType(filter: PDFName | PDFArray) {
  if (filter instanceof PDFName) {
    return filter === PDFName.of('DCTDecode') ? 'jpeg' : 'png';
  } else {
    const i = filter.indexOf(PDFName.of('DCTDecode'));

    return i === undefined ? 'png' : 'jpeg';
  }
}

// 获取PDF文档中的图片信息
export function getPdfLibImages(doc: PDFDocument) {
  try {
    // 枚举文档中的间接对象
    const enumeratedIndirectObjects = doc.context.enumerateIndirectObjects();
    const imagesInDoc: IPdfLibImage[] = [];

    // 遍历文档中的对象
    for (let index = 0; index < enumeratedIndirectObjects.length; index++) {
      const [pdfRef, pdfObject] = enumeratedIndirectObjects[index];
      if (!(pdfObject instanceof PDFRawStream)) continue;

      const { dict } = pdfObject;
      const sMaskRef = dict.get(PDFName.of('SMask'));
      const colorSpace = dict.get(PDFName.of('ColorSpace'));
      const width = dict.get(PDFName.of('Width'));
      const height = dict.get(PDFName.of('Height'));
      const name = dict.get(PDFName.of('Name'));
      const subtype = dict.get(PDFName.of('Subtype'));
      const filter = dict.get(PDFName.of('Filter'));

      if (subtype === PDFName.of('Image')) {
        imagesInDoc.push({
          ref: pdfRef,
          sMaskRef,
          colorSpace,
          name: name
            ? (name as unknown as { key: string }).key
            : `Object${index + 1}`,
          width: (width as unknown as { numberValue: number }).numberValue,
          height: (height as unknown as { numberValue: number })?.numberValue,
          pdfObject: pdfObject,
          data: pdfObject.contents,
          type: getImageType(filter as PDFName | PDFArray),
        });
      }
    }
    // 设置图片是否有 alpha 通道
    imagesInDoc.forEach((image) => {
      if (image.type === 'png' && image.sMaskRef) {
        const sMaskImg = imagesInDoc.find(({ ref }) => ref === image.sMaskRef);
        if (sMaskImg) {
          sMaskImg.isAlphaLayer = true;
        }
      }
    });

    return imagesInDoc;
  } catch (e) {
    console.log('getPdfLibImages error:', e);
    return [];
  }
}
