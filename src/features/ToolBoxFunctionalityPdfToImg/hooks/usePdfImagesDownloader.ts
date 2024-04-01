import FileSaver from 'file-saver';
import JSZip from 'jszip';
import { useCallback, useState } from 'react';
import { pdfjs } from 'react-pdf';

import { dataURLtoBlob, generatePdfToImage } from '../utils/pdfTool';

const usePdfImagesDownloader = () => {
  const [downloaderIsLoad, setDownloaderIsLoad] = useState<boolean>(false); //是否加载中
  const [downloaderTotalPages, setDownloaderTotalPages] = useState<number>(0); //总下载页书
  const [currentDownloaderActionNum, setCurrentDownloaderActionNum] =
    useState<number>(0); //当前下载页书进度
  const [isCancel, setIsCancel] = useState(false);

  const onDownloadPdfImagesZip = useCallback(
    async (convertedPdfImages, file, toType, scale) => {
      setIsCancel(false);
      setCurrentDownloaderActionNum(0);
      setDownloaderIsLoad(true);
      const zip = new JSZip();
      const images = zip.folder('images');
      const selectedImages = convertedPdfImages.filter(
        (image) => image.isSelect,
      );
      setDownloaderTotalPages(selectedImages.length);
      const buff = await file?.arrayBuffer();
      const pdfDoc = buff ? await pdfjs.getDocument(buff).promise : undefined;

      for (let i = 0; i < selectedImages.length; i++) {
        if (isCancel) return;
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
            selectedImages[0].definedIndex,
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

      if (isCancel) return;
      if (selectedImages.length > 0) {
        zip.generateAsync({ type: 'blob' }).then((content) => {
          FileSaver.saveAs(content, 'images(MaxAI.me).zip');
          setDownloaderIsLoad(false);
        });
      } else {
        //TODO: 需要提示没有选择图片
        setDownloaderIsLoad(false);
      }
    },
    [],
  );
  const onCancelDownloader = () => {
    setIsCancel(true);
    setDownloaderIsLoad(false);
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
