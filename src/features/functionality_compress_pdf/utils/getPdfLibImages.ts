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

      const name = dict.get(PDFName.of('Name'));
      const sMaskRef = dict.get(PDFName.of('SMask'));
      const colorSpace = dict.get(PDFName.of('ColorSpace'));
      const width = dict.get(PDFName.of('Width'));
      const height = dict.get(PDFName.of('Height'));
      const subtype = dict.get(PDFName.of('Subtype'));
      const filter = dict.get(PDFName.of('Filter'));
      // @ts-ignore
      const type = getImageType(filter);
      let imageObject: IPdfLibImage = {
        ref: pdfRef,
        sMaskRef,
        colorSpace,
        pdfObject,
        // @ts-ignore
        name: name ? name.key : `Object${index + 1}`,
        // @ts-ignore
        width: width?.numberValue,
        // @ts-ignore
        height: height?.numberValue,
        data: pdfObject.contents,
        // @ts-ignore
        type: type,
      };
      if (type === 'png' && sMaskRef === pdfRef) {
        imageObject.isAlphaLayer = true;
      }
      if (subtype === PDFName.of('Image')) {
        imagesInDoc.push(imageObject);
      }
    }
    return imagesInDoc;
  } catch (e) {
    console.log('Error in getPdfLibImages: ', e);
    return [];
  }
}
