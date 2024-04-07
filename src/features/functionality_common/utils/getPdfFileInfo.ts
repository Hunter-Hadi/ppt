import { pdfjs } from 'react-pdf';
import { v4 as uuidV4 } from 'uuid';

import snackNotifications from '@/utils/globalSnackbar';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();
interface IFunctionalityUtilsPdfInfoProps {
    id: string;
    name: string;
    size: number;
    pages: number;
    imageUrlString: string;
    file: File;
    isSelect: boolean;
}
export const getPdfFileInfoList = async (fileList: FileList, errorTips: string) => {
    const fileInfoList: IFunctionalityUtilsPdfInfoProps[] = [];
    for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const pageInfo = await getFirstPageAsImage(file, 1, errorTips);
        if (pageInfo) {
            const fileInfo: IFunctionalityUtilsPdfInfoProps = {
                id: uuidV4(),
                name: file.name,
                size: file.size,
                imageUrlString: pageInfo.image || '',
                pages: pageInfo.pages,
                file: file,
                isSelect: false,
            };
            fileInfoList.push(fileInfo);
        }
    }
    return fileInfoList;
};
async function getFirstPageAsImage(
    file: File, pageIndex: number, errorTips: string
): Promise<{ image: string; pages: number } | null> {
    try {
        const buff = await file.arrayBuffer();
        // 将当前 PDF 文档的所有页面复制到合并后的 PDF 文档中
        const loadingTask = pdfjs.getDocument(buff);
        const pdfDocument = await loadingTask.promise;

        const pages = pdfDocument._pdfInfo.numPages;
        const page = await pdfDocument.getPage(pageIndex);

        const viewport = page.getViewport({ scale: 1.0 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        canvas.height = viewport.height;
        canvas.width = viewport.width;
        if (context) {
            const renderContext = {
                canvasContext: context,
                viewport: viewport,
            };

            renderContext && (await page.render(renderContext).promise);

            const image = canvas.toDataURL('image/png');

            return { image, pages };
        } else {
            return null;
        }
    } catch (e) {
        if (file.name) {
            snackNotifications.warning(
                `${file.name} ${errorTips}`,
                {
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center',
                    },
                },
            );
        }
        return null;
    }
}