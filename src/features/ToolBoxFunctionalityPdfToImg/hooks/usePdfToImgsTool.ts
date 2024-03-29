import FileSaver from 'file-saver';
import JSZip from 'jszip';
import { debounce } from 'lodash-es';
import { useState } from 'react';
import { pdfjs } from 'react-pdf';
import { v4 as uuidV4 } from 'uuid';

import snackNotifications from '@/utils/globalSnackbar';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();
let isCancel = false;
const usePdfToImgsTool = () => {
  const [pdfImageList, setPdfImageList] = useState<
    { id: string; imgString: string; isSelect: boolean }[]
  >([]);
  const [pdfIsLoad, setPdfIsLoad] = useState<boolean>(true);
  const [pdfIsSelectAll, setPdfIsSelectAll] = useState<boolean>(true);

  const [pdfNumPages, pdfPdfNumPages] = useState<number>(0);
  const [currentPdfActionNum, setCurrentPdfActionNum] = useState<number>(0);
  const onReadPdfToImages = debounce(async (file: File) => {
    if (!file) {
      return;
    }
    isCancel = false;
    setPdfIsLoad(true);
    const buff = await file.arrayBuffer(); // Uint8Array
    const pdfDoc = await pdfjs.getDocument(buff).promise;
    pdfPdfNumPages(pdfDoc._pdfInfo.numPages);
    for (let pageNum = 1; pageNum <= pdfDoc._pdfInfo.numPages; pageNum++) {
      if (isCancel) return;
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
      if (pageNum === pdfDoc._pdfInfo.numPages) {
        setPdfIsLoad(false);
      }
    }
  }, 200);
  const onCancelPdfToImgs = () => {
    isCancel = true;
    setPdfIsLoad(false);
  };
  const onDownloadPdfImagesZip = async () => {
    const zip = new JSZip();
    const images = zip.folder('images');
    let ishaveFile = 0;
    const selectedImages = pdfImageList.filter((image) => image.isSelect);
    for (let i = 0; i < selectedImages.length; i++) {
      ishaveFile += 1;
      images?.file(
        `image-${i + 1}.png`,
        dataURLtoBlob(selectedImages[i].imgString),
        {
          base64: true,
        },
      );
    }
    if (ishaveFile > 0) {
      zip.generateAsync({ type: 'blob' }).then((content) => {
        FileSaver.saveAs(content, 'images(MaxAI.me).zip');
      });
    } else {
      snackNotifications.warning('Please select at least one image.', {
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      });
    }
  };
  const dataURLtoBlob = async (base64Str: string) => {
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
  const onSwitchSelect = (id: string) => {
    setPdfImageList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isSelect: !item.isSelect } : item,
      ),
    );
  };
  const onSwitchAllSelect = () => {
    const newIsSelectAll = !pdfIsSelectAll;
    setPdfImageList((prev) =>
      prev.map((item) => ({ ...item, isSelect: newIsSelectAll })),
    );
    setPdfIsSelectAll(newIsSelectAll);
  };
  return {
    pdfImageList,
    pdfIsLoad,
    onReadPdfToImages,
    onDownloadPdfImagesZip,
    pdfNumPages,
    currentPdfActionNum,
    onCancelPdfToImgs,
    onSwitchSelect,
    pdfIsSelectAll,
    onSwitchAllSelect,
  };
};

export default usePdfToImgsTool;
