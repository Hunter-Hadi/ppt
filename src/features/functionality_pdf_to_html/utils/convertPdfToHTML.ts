import { pdfjs } from 'react-pdf';

import { pdfPageBackgroundToCanvas } from '@/features/functionality_common/utils/functionalityCommonPdfPageBackgroundToCanvas';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();
const pageScale = 2;
export const convertPdfToHTMLDivElement = async (
  file: File,
  callBackProgress?: (allPage: number, currentNum: number) => void,
) => {
  try {
    const wrapDiv = document.createElement('div');
    wrapDiv.className = 'pdf-wrap';
    wrapDiv.style.cssText = `--scale-factor: ${pageScale};`;
    if (file) {
      const buff = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument(buff).promise;
      const numPages = pdf.numPages;
      callBackProgress && callBackProgress(numPages, 0);
      for (let i = 1; i <= numPages; i++) {
        callBackProgress && callBackProgress(numPages, i);
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent({
          includeMarkedContent: true,
        }); //获取文本内容列表
        const pageViewport = page.getViewport({
          scale: pageScale,
        }); //获取页面视图信息

        //一.渲染背景页面
        const pageDiv = createPageDiv(pageViewport);
        const hideTextPageCanvas = await pdfPageBackgroundToCanvas(page, {
          hideText: true,
          viewportScale: pageScale,
        }); //获取隐藏文字的canvas
        const pageImgString = hideTextPageCanvas.toDataURL('image/png');
        pageDiv.append(createPageBgImgDiv(pageImgString || ''));

        //二.渲染文本页面
        const textContentDiv = document.createElement('div');
        textContentDiv.className = 'text-content-list';
        await pdfjs.renderTextLayer({
          textContentSource: textContent,
          container: textContentDiv,
          viewport: pageViewport,
        });

        pageDiv.append(textContentDiv);
        wrapDiv.appendChild(pageDiv);
      }
    }

    return createHtmlString(wrapDiv.outerHTML);
  } catch (e) {
    console.log('simply convertPdfToHTMLDivElement error :', e);
    return false;
  }
};
const createPageDiv = (pageViewport) => {
  const pageDiv = document.createElement('div');
  pageDiv.className = 'page';
  pageDiv.style.position = 'relative';
  pageDiv.style.height = `${pageViewport.height}px`;
  pageDiv.style.width = `${pageViewport.width}px`;
  return pageDiv;
};
const createPageBgImgDiv = (imgData: string) => {
  const backgroundDiv = document.createElement('div');
  backgroundDiv.className = 'canvasLayer';
  const backgroundImg = document.createElement('img');
  backgroundImg.src = imgData;
  backgroundDiv.append(backgroundImg);
  return backgroundDiv;
};

export const createHtmlString = (bodyString: string) => {
  return `<!DOCTYPE html><html><head>
   <meta charset="utf-8" />
   <title>PDF to HTML by MaxAI.me</title>
   <style>
   body {
    margin: 0;
  }

   .text-content-list {
    position: absolute;
    text-align: initial;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    opacity: 1;
    line-height: 1;
    -webkit-text-size-adjust: none;
       -moz-text-size-adjust: none;
            text-size-adjust: none;
    forced-color-adjust: none;
    transform-origin: 0 0;
    z-index: 2;
  }
  
  .text-content-list span,
  .text-content-list br {
    color: black;
    position: absolute;
    white-space: pre;
    cursor: text;
    transform-origin: 0% 0%;
  }
  

  .text-content-list span.markedContent {
    top: 0;
    height: 0;
  }
  
  .text-content-list .highlight {
    margin: -1px;
    padding: 1px;
    background-color: rgba(180, 0, 170, 1);
    border-radius: 4px;
  }
  
  .text-content-list .highlight.appended {
    position: initial;
  }
  
  .text-content-list .highlight.begin {
    border-radius: 4px 0 0 4px;
  }
  
  .text-content-list .highlight.end {
    border-radius: 0 4px 4px 0;
  }
  
  .text-content-list .highlight.middle {
    border-radius: 0;
  }
  
  .text-content-list .highlight.selected {
    background-color: rgba(0, 100, 0, 1);
  }
  
  .text-content-list ::-moz-selection {
    background: #0000ff26;
  }
  
  .text-content-list ::selection {
    background: #0000ff26;
  }
  
  .text-content-list br::-moz-selection {
    background: transparent;
  }
  .text-content-list br::selection {
    background: transparent;
  }
  
  :root {
    --annotation-unfocused-field-background: url("data:image/svg+xml;charset=UTF-8,<svg width='1px' height='1px' xmlns='http://www.w3.org/2000/svg'><rect width='100%' height='100%' style='fill:rgba(0, 54, 255, 0.13);'/></svg>");
    --input-focus-border-color: Highlight;
    --input-focus-outline: 1px solid Canvas;
    --input-unfocused-border-color: transparent;
    --input-disabled-border-color: transparent;
    --input-hover-border-color: black;
  }
  
  @media (forced-colors: active) {
    :root {
      --input-focus-border-color: CanvasText;
      --input-unfocused-border-color: ActiveText;
      --input-disabled-border-color: GrayText;
      --input-hover-border-color: Highlight;
    }
  }
  
  :root {
    --focus-outline: solid 2px blue;
    --hover-outline: dashed 2px blue;
    --freetext-line-height: 1.35;
    --freetext-padding: 2px;
    --editorFreeText-editing-cursor: text;
    --editorInk-editing-cursor: pointer;
  }
  
  @media (-webkit-min-device-pixel-ratio: 1.1), (min-resolution: 1.1dppx) {
    :root {
    }
  }
  
  @media (forced-colors: active) {
    :root {
      --focus-outline: solid 3px ButtonText;
      --hover-outline: dashed 3px ButtonText;
    }
  }
  
  [data-editor-rotation="90"] {
    transform: rotate(90deg);
  }
  [data-editor-rotation="180"] {
    transform: rotate(180deg);
  }
  [data-editor-rotation="270"] {
    transform: rotate(270deg);
  }
  
  :root {
    --viewer-container-height: 0;
    --pdf-wrap-padding-bottom: 0;
    --page-margin: 1px auto -8px;
    --page-border: 9px solid transparent;
    --spreadHorizontalWrapped-margin-LR: -3.5px;
  }
  
  @media screen and (forced-colors: active) {
    :root {
      --pdf-wrap-padding-bottom: 9px;
      --page-margin: 8px auto -1px;
      --page-border: 1px solid CanvasText;
      --page-border-image: none;
      --spreadHorizontalWrapped-margin-LR: 3.5px;
    }
  }
  
  [data-main-rotation="90"] {
    transform: rotate(90deg) translateY(-100%);
  }
  [data-main-rotation="180"] {
    transform: rotate(180deg) translate(-100%, -100%);
  }
  [data-main-rotation="270"] {
    transform: rotate(270deg) translateX(-100%);
  }
  
  .pdf-wrap {
    background-color: #f9f9f9;
    padding-bottom: var(--pdf-wrap-padding-bottom);
  }
  
  .pdf-wrap .canvasWrapper {
    overflow: hidden;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  
  .pdf-wrap .page {
    direction: ltr;
    width: 816px;
    height: 1056px;
    margin: var(--page-margin);
    position: relative;
    overflow: visible;
    border: var(--page-border);
    -o-border-image: var(--page-border-image);
       border-image: var(--page-border-image);
    background-clip: content-box;
    background-color: rgba(255, 255, 255, 1);
  }
  
  .pdf-wrap .dummyPage {
    position: relative;
    width: 0;
    height: var(--viewer-container-height);
  }
  
  .pdf-wrap.removePageBorders .page {
    margin: 0 auto 10px;
    border: none;
  }
  
  .pdf-wrap.singlePageView {
    display: inline-block;
  }
  
  .pdf-wrap.singlePageView .page {
    margin: 0;
    border: none;
  }
  
  .pdf-wrap.scrollHorizontal,
  .pdf-wrap.scrollWrapped,
  .spread {
    margin-left: 3.5px;
    margin-right: 3.5px;
    text-align: center;
  }
  
  .pdf-wrap.scrollHorizontal,
  .spread {
    white-space: nowrap;
  }
  


  .pdf-wrap .page canvas {
    margin: 0;
    display: block;
  }
  
  .pdf-wrap .page canvas[hidden] {
    display: none;
  }
  
  .pdf-wrap .page canvas[zooming] {
    width: 100%;
    height: 100%;
  }
  
</style>
</head>
<body>
 ${bodyString}
</body>
</html>`;
};
