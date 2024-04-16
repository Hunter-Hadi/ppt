import { PDFDocument, rgb } from "pdf-lib";

import { ISignData } from "../components/FunctionalitySignPdfDetail";


//file 是pdf
export const pdfAddView = async (file: File, addViewList: ISignData[]) => {
    // Create a new PDFDocument or load the existing PDF file
    debugger
    let pdfDoc: PDFDocument | null = null;
    try {
        const fileBuffer = await file.arrayBuffer();
        pdfDoc = await PDFDocument.load(fileBuffer);
    } catch (error) {
        console.error("Error loading PDF Document:", error);
        return;
    }

    // Loop through all views and add them to the PDF
    for (const view of addViewList) {
        const { pdfIndex, x, y, width, height } = view;
        const page = pdfDoc.getPage(pdfIndex);
        const pdfPageSize = page.getSize();
        console.log('simply pdfPageSize', pdfPageSize);
        // 假设你知道div和PDF页面的比例
        const scaleX = pdfPageSize.width / width;
        const scaleY = pdfPageSize.height / height;

        // 调整坐标
        const adjustedX = x * scaleX;
        const adjustedY = (height - y) * scaleY; // PDF坐标系从左下角开始，需要调整y坐标

        // 使用pdf-lib在PDF上绘制文本
        page.drawText('signSignSign', {
            x: adjustedX,
            y: adjustedY,
            color: rgb(0, 0, 0),
        });
    }

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();

    // Trigger the browser to download the PDF
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "updated-document.pdf"; // You can use a dynamic name here
    link.click();

    // Clean up the URL object after the download starts
    URL.revokeObjectURL(link.href);
}