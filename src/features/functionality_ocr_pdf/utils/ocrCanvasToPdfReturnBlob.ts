import { PDFDocument } from 'pdf-lib';
import { createScheduler, createWorker } from 'tesseract.js';

//OCR识别canvas并生成PDF
export async function ocrCanvasToPdfReturnBlob(
  origDoc: PDFDocument, //PDF文档
  canvases: HTMLCanvasElement[], //canvas数组
  language: string, //语言
  callBackProgress?: (
    totalQuantity: number, //总页数
    currentNum: number, //当前页数
    progressType: 'ocr' | 'embedPage',
  ) => void, //回调函数
  processesNumber?: number, //进程数,不设置根据硬件线程数/2跑，错误会为2重试一次.
) {
  const scheduler = createScheduler(); //创建调度器
  try {
    const currentProcessesNumber =
      processesNumber ||
      Math.min(
        canvases.length,
        Math.max(1, Math.floor(navigator.hardwareConcurrency / 2)),
      ); //设置线程为  硬件线程数/2

    const startTime = new Date().valueOf(); //开始时间

    for (let index = 0; index < currentProcessesNumber; index++) {
      const worker = await createWorker(language, 1); //创建worker
      scheduler.addWorker(worker); //添加worker
    }
    const pdfDataArr: Uint8Array[] = [];

    callBackProgress && callBackProgress(canvases.length, 0, 'ocr');
    await Promise.all(
      canvases.map((canvas, index) => {
        return scheduler
          .addJob('recognize', canvas, { pdfTextOnly: true }, { pdf: true }) //添加识别任务并开始识别工作
          .then((recognizeData) => {
            pdfDataArr[index] = recognizeData.data.pdf as unknown as Uint8Array;
            callBackProgress &&
              callBackProgress(canvases.length, pdfDataArr.length, 'ocr'); //回调当前进度函数
          });
      }),
    );

    await scheduler.terminate(); //释放 调度器 资源
    try {
      callBackProgress && callBackProgress(canvases.length, 0, 'embedPage');

      for (let index = 0; index < pdfDataArr.length; index++) {
        const pdfData = pdfDataArr[index];
        const textDoc = await PDFDocument.load(pdfData); //生成PDF
        const origPage = origDoc.getPage(index);
        const textPage = textDoc.getPage(0); //获取第一个页面PAGE
        const scale = origPage.getWidth() / textPage.getWidth();
        textPage.scale(scale, scale); //缩放到同等大小

        const embedPage = await origDoc.embedPage(textPage); //嵌入到之前到pdf页面
        origPage.drawPage(embedPage); //绘制页面
        callBackProgress &&
          callBackProgress(canvases.length, index + 1, 'embedPage');
      }

      const bytes = await origDoc.save();
      const blob = new Blob([bytes], {
        type: 'application/pdf',
      }); //生成blob

      const endTime = new Date().valueOf();
      console.log(
        canvases.length,
        '个页面',
        currentProcessesNumber,
        '个进程--：用的时间为：',
        (endTime - startTime) / 1000,
        'ms',
      );

      return blob;
    } catch (err) {
      console.error('ocrCanvasToPdfReturnBlob error:2', err);
      return false;
    }
  } catch (err) {
    console.error('ocrCanvasToPdfReturnBlob error:1', err);
    scheduler.terminate(); //释放资源
    if (processesNumber) {
      //如果设置了进程数，且错误了，直接返回
      return false;
    }
    return ocrCanvasToPdfReturnBlob(
      origDoc,
      canvases,
      language,
      callBackProgress,
      2,
    ); //错误重试一次，并设置进程数为2
  }
}
