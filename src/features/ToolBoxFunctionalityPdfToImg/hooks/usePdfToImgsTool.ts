import FileSaver from 'file-saver';
import JSZip from 'jszip';
import { debounce } from 'lodash-es';
import { useState } from 'react';
import { pdfjs } from 'react-pdf';
import { v4 as uuidV4 } from 'uuid';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const usePdfToImgsTool = () => {
  const [pdfImageList, setPdfImageList] = useState<
    { id: string; imgString: string; isSelect: boolean }[]
  >([]);
  const [pdfIsLoad, setPdfIsLoad] = useState<boolean>(true);
  const [pdfNumPages, pdfPdfNumPages] = useState<number>(0);
  const [currentPdfActionNum, setCurrentPdfActionNum] = useState<number>(0);
  const readPdfToImages = debounce(async (file: File) => {
    if (!file) {
      return;
    }
    setPdfIsLoad(true);
    const buff = await file.arrayBuffer(); // Uint8Array
    const pdfDoc = await pdfjs.getDocument(buff).promise;
    pdfPdfNumPages(pdfDoc._pdfInfo.pdfNumPages);
    for (let pageNum = 1; pageNum <= pdfDoc._pdfInfo.pdfNumPages; pageNum++) {
      setCurrentPdfActionNum(pageNum);
      const scale = 1.0;
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
      const imageDataUrl = canvas.toDataURL('image/png');
      setPdfImageList((prev) => [
        ...prev,
        {
          id: uuidV4(),
          imgString: imageDataUrl,
          isSelect: true,
        },
      ]);
      if (pageNum === pdfDoc._pdfInfo.pdfNumPages) {
        setPdfIsLoad(false);
      }
    }
  }, 200);
  const downloadPdfImagesZip = async () => {
    const zip = new JSZip();
    var images = zip.folder('images');
    console.log('simply pdfImageList', pdfImageList);
    for (let i = 0; i < pdfImageList.length; i++) {
      images?.file(
        'image-' + i + '.jpg',
        dataURLtoBlob(pdfImageList[i].imgString),
        {
          base64: true,
        },
      );
    }
    zip.generateAsync({ type: 'blob' }).then((content) => {
      FileSaver.saveAs(content, 'image.zip');
    });
  };
  const dataURLtoBlob = async (base64Str: string) => {
    let arr = base64Str.split(','),
      mime = arr?.[0].match(/:(.*?);/)?.[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {
      type: mime,
    });
  };
  return {
    pdfImageList,
    pdfIsLoad,
    readPdfToImages,
    downloadPdfImagesZip,
    pdfNumPages,
    currentPdfActionNum,
  };
};

export default usePdfToImgsTool;
