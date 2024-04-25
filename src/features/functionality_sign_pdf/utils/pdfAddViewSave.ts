import { PDFDocument } from "pdf-lib";

import { downloadUrl } from "@/features/functionality_common/utils/functionalityCommonDownload";

//file 是pdf，pdfPageNumber是pdf的页数，根据id绘制到pdf上，并保存下载
export const pdfAddViewSave = async (file: File, pdfPageNumber: number) => {
    try {
        let pdfDoc: PDFDocument | null = null;
        try {
            const fileBuffer = await file.arrayBuffer();
            pdfDoc = await PDFDocument.load(fileBuffer);
        } catch (error) {
            console.error("Error loading PDF Document:", error);
            return;
        }

        for (let i = 0; i < pdfPageNumber; i++) {
            const page = pdfDoc.getPage(i);
            const canvas = document.querySelector(`.sample-canvas-${i + 1} .lower-canvas`) as HTMLCanvasElement;
            if (canvas) {
                const image = canvas.toDataURL('image/png');
                const pdfPageSize = page.getSize();
                const pngImage = await pdfDoc.embedPng(image);
                page.drawImage(pngImage, {
                    x: 0,
                    y: 0,
                    width: pdfPageSize.width,
                    height: pdfPageSize.height,
                });
            }
        }

        const pdfBytes = await pdfDoc.save();
        downloadUrl(pdfBytes, "signPdf(MaxAI).pdf");
    } catch (e) {
        console.log(e)
    }
}