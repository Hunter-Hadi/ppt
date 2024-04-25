import { PDFDocument } from "pdf-lib";

//file 是pdf
export const pdfAddViewSave = async (file: File, pdfPageNumber: number) => {
    // Create a new PDFDocument or load the existing PDF file
    let pdfDoc: PDFDocument | null = null;
    try {
        const fileBuffer = await file.arrayBuffer();
        pdfDoc = await PDFDocument.load(fileBuffer);
    } catch (error) {
        console.error("Error loading PDF Document:", error);
        return;
    }

    // Loop through all views and add them to the PDF
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