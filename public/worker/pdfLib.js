import { PDFDocument } from 'pdf-lib';

self.addEventListener('message', async (event) => {
  const { pdfData, newText } = event.data;

  // Load the existing PDF
  const pdfDoc = await PDFDocument.load(pdfData);

  // Add new text to the first page
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const { width, height } = firstPage.getSize();
  firstPage.drawText(newText, {
    x: 50,
    y: height - 50,
    size: 30,
  });

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();

  // Send the modified PDF back to the main thread
  self.postMessage(pdfBytes);
});
