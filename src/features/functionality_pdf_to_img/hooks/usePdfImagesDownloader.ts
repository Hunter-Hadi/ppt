import FileSaver from 'file-saver';
import JSZip from 'jszip';
import { useCallback, useRef, useState } from 'react';
import { pdfjs } from 'react-pdf';

import { IPdfPageImageInfo } from '@/features/functionality_pdf_to_img/hooks/usePdfToImageConversion';
import { dataURLtoBlob } from '@/features/functionality_pdf_to_img/utils/pdfTool';
import snackNotifications from '@/utils/globalSnackbar';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();
const usePdfImagesDownloader = () => {
  const [downloaderIsLoad, setDownloaderIsLoad] = useState<boolean>(false); //是否加载中
  const [downloaderTotalPages, setDownloaderTotalPages] = useState<number>(0); //总下载页书
  const [currentDownloaderActionNum, setCurrentDownloaderActionNum] =
    useState<number>(0); //当前下载进度
  const isCancel = useRef(false);

  const onDownloadPdfImagesZip = useCallback(
    async (
      convertedPdfImages: IPdfPageImageInfo[],
      toType: string,
      file?: File,
      scale?: number,
    ) => {
      try {
        isCancel.current = false;
        setCurrentDownloaderActionNum(0);
        setDownloaderIsLoad(true);
        const zip = new JSZip();
        const images = zip.folder('images');
        const selectedImages = convertedPdfImages.filter(
          (image) => image.isSelect,
        );
        setDownloaderTotalPages(selectedImages.length);

        //只有重新设置scale尺寸，才会重新加载pdf
        const buff = scale ? await file?.arrayBuffer() : undefined;
        const pdfDoc = buff ? await pdfjs.getDocument(buff).promise : undefined;

        for (let i = 0; i < selectedImages.length; i++) {
          if (isCancel.current) return;
          setCurrentDownloaderActionNum(i + 1);
          if (!scale) {
            images?.file(
              `image-${i + 1}.${toType}`,
              dataURLtoBlob(selectedImages[i].imgString),
              {
                base64: true,
              },
            );
          } else if (pdfDoc && scale) {
            const { imageDataUrl } = await generatePdfToImage(
              pdfDoc,
              selectedImages[i].definedIndex,
              toType,
              scale,
            );

            images?.file(
              `image-${i + 1}.${toType}`,
              dataURLtoBlob(imageDataUrl),
              {
                base64: true,
              },
            );
          }
        }
        if (isCancel.current) return;
        if (selectedImages.length > 0) {
          zip.generateAsync({ type: 'blob' }).then((content) => {
            FileSaver.saveAs(content, 'images(MaxAI.me).zip');
            setDownloaderIsLoad(false);
          });
        } else {
          //TODO: 需要提示没有选择图片
          snackNotifications.warning('Please select at least one image.', {
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
          });
          setDownloaderIsLoad(false);
        }
      } catch (e) {
        console.log('simply onDownloadPdfImagesZip error', e);
      }
    },
    [],
  );
  const onCancelDownloader = () => {
    isCancel.current = true;
    setDownloaderIsLoad(false);
  };
  const generatePdfToImage = async (
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
    const imageDataUrl = canvas.toDataURL(`image/${toType}`); //不会储存base64,所以这里不用blob
    return {
      imageDataUrl,
      viewport,
    };
  };
  return {
    downloaderIsLoad,
    downloaderTotalPages,
    currentDownloaderActionNum,
    onCancelDownloader,
    onDownloadPdfImagesZip,
  };
};

export default usePdfImagesDownloader;
