import FileSaver from 'file-saver';
import JSZip from 'jszip';
import { debounce } from 'lodash-es';
import { useState } from 'react';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const usePdfToImgTool = () => {
  const [imageStrList, setImageStrList] = useState<string[]>([]);
  const [isLoad, setIsLoad] = useState<boolean>(true);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentActionNum, setCurrentActionNum] = useState<number>(0);
  const readPdfToImages = debounce(async (file: File) => {
    if (!file) {
      return;
    }
    setIsLoad(true);
    const buff = await file.arrayBuffer(); // Uint8Array
    const pdfDoc = await pdfjs.getDocument(buff).promise;
    console.log('simply pdfDoc', pdfDoc);
    setNumPages(pdfDoc._pdfInfo.numPages);
    for (let pageNum = 1; pageNum <= pdfDoc._pdfInfo.numPages; pageNum++) {
      console.log('simply pageNum', pageNum, pdfDoc._pdfInfo.numPages);
      setCurrentActionNum(pageNum);
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
      console.log('simply imageDataUrl', imageDataUrl);
      setImageStrList((prev) => [...prev, imageDataUrl]);
      if (pageNum === pdfDoc._pdfInfo.numPages) {
        setIsLoad(false);
      }
    }
  }, 200);
  const downloadImageZip = async () => {
    const zip = new JSZip();
    var images = zip.folder('images');
    console.log('simply imageStrList', imageStrList);
    for (let i = 0; i < imageStrList.length; i++) {
      images?.file('image-' + i + '.jpg', dataURLtoBlob(imageStrList[i]), {
        base64: true,
      });
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
    imageStrList,
    isLoad,
    readPdfToImages,
    downloadImageZip,
    numPages,
    currentActionNum,
  };
};

export default usePdfToImgTool;
