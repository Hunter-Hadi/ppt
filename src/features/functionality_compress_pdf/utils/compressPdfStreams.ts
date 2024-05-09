import { deflate } from 'pako';
import { PDFDocument, PDFName, PDFNumber, PDFRawStream } from 'pdf-lib';

/**
 * 用于压缩PDF文档数据流的函数，其主要目标是减小PDF文件的大小以优化其存储和传输。
 */
export function compressPdfStreams(doc: PDFDocument) {
  try {
    // 获取文档中的所有间接对象
    const enumeratedIndirectObjects = doc.context.enumerateIndirectObjects();

    for (let index = 0; index < enumeratedIndirectObjects.length; index++) {
      const [, pdfObject] = enumeratedIndirectObjects[index];
      // 如果对象不是 PDFRawStream 类型，则跳过
      if (!(pdfObject instanceof PDFRawStream)) continue;

      const { dict } = pdfObject;
      const subtype = dict.get(PDFName.of('Subtype'));
      const filter = dict.get(PDFName.of('Filter'));

      // 如果对象的 Subtype 不是 Image 并且没有 Filter，则进行压缩处理
      if (subtype !== PDFName.of('Image') && !filter) {
        const newData: Uint8Array = deflate(pdfObject.contents); //pako对符合条件的数据流进行压缩。这种方法基于deflate压缩算法，可以有效减小数据大小
        // 更新对象的 Length 和 Filter 属性
        pdfObject.dict.set(
          PDFName.of('Length'),
          PDFNumber.of(newData.byteLength),
        );
        pdfObject.dict.set(PDFName.of('Filter'), PDFName.of('FlateDecode'));
        // 更新对象的 contents 属性
        (pdfObject as { contents: Uint8Array }).contents = newData;
      }
    }
  } catch (e) {
    console.log('compressPdfStreams error:', e);
  }
}
