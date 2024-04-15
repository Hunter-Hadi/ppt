import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();
export const convertPdfToHTMLDivElement = async (file) => {
    const emptyDiv = document.createElement("div")
    const wrapDiv = document.createElement("div")
    wrapDiv.className = 'pdfViewer'
    wrapDiv.style.cssText = `--scale-factor: 1;`
    if (file) {
        const buff = await file.arrayBuffer();
        const pdf = await pdfjs.getDocument(buff).promise;
        const numPages = pdf.numPages;

        for (let i = 1; i <= numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            // 将文本内容转换为HTML字符串
            const pageDiv = document.createElement("div")
            const pageViewport = page.getViewport({
                scale: 1,
            })
            // page.render()
            const hideTextPageCanvas = await renderPageToCanvas(page, { hideText: true, viewportScale: 1 })
            console.log('simply hideTextPage', hideTextPageCanvas)
            const pageImgString = hideTextPageCanvas.toDataURL('image/png')
            pageDiv.append(getPageBgDiv(pageImgString || ''))
            const textContentDiv = document.createElement("div")
            textContentDiv.className = 'textLayer'
            pdfjs.renderTextLayer(
                {
                    textContentSource: textContent,
                    container: textContentDiv,
                    viewport: pageViewport,
                    textDivs: []
                }
            )
            // page.render(renderContext).promise
            pageDiv.append(textContentDiv)
            pageDiv.className = 'page'
            pageDiv.style.position = "relative"
            pageDiv.style.height = `${pageViewport.height}px`
            pageDiv.style.width = `${pageViewport.width}px`

            wrapDiv.appendChild(pageDiv);
        }
    }
    console.log('simply wrapDiv', wrapDiv)
    emptyDiv.append(wrapDiv)
    return emptyDiv; // This will be the full HTML representation of the PDF.
};
const getPageBgDiv = (imgData: string) => {
    const backgroundDiv = document.createElement("div")
    backgroundDiv.className = "canvasLayer"
    // backgroundDiv.style.height = '100%'
    // backgroundDiv.style.width = '100%'
    const backgroundImg = document.createElement("img")
    // backgroundImg.style.height = '100%'
    // backgroundImg.style.width = '100%'
    backgroundImg.src = imgData
    backgroundDiv.append(backgroundImg)
    return backgroundDiv
}

//渲染操作保持原有逻辑的同时，能够按需忽略文本渲染
const renderPageToCanvas = async (page, options = { hideText: true, viewportScale: 1 }) => {
    // 保存原始的CanvasRenderingContext2D的文本方法
    const originalStrokeText = CanvasRenderingContext2D.prototype.strokeText;
    const originalFillText = CanvasRenderingContext2D.prototype.fillText;

    // 如果hideText为true，则替换strokeText和fillText方法，使其不做任何事情
    if (options.hideText) {
        CanvasRenderingContext2D.prototype.strokeText = function () { };
        CanvasRenderingContext2D.prototype.fillText = function () { };
    }

    // 根据提供的选项中的viewportScale设置viewport
    const viewport = page.getViewport({ scale: options.viewportScale || 1.0 });

    // 创建一个新的canvas元素，并设置其宽高为viewport的宽高
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    // 渲染PDF页面到canvas
    await page.render({
        canvasContext: context,
        viewport: viewport
    }).promise;

    // 渲染结束后，如果hideText为真，则恢复原有的文本方法
    if (options.hideText) {
        CanvasRenderingContext2D.prototype.strokeText = originalStrokeText;
        CanvasRenderingContext2D.prototype.fillText = originalFillText;
    }

    // 返回已渲染的canvas元素
    return canvas;
}

export const createHtml = (bodyString: string) => {
    return `<html><head>
   <title>PDF to HTML by MaxAi.me</title>
   <style>
body {
margin: 0;
}

.textLayer {
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

.textLayer span,
.textLayer br {
color: black;
position: absolute;
white-space: pre;
cursor: text;
transform-origin: 0% 0%;
}

.textLayer span.markedContent {
top: 0;
height: 0;
}

.textLayer .highlight {
margin: -1px;
padding: 1px;
background-color: rgba(180, 0, 170, 1);
border-radius: 4px;
}

.textLayer .highlight.appended {
position: initial;
}

.textLayer .highlight.begin {
border-radius: 4px 0 0 4px;
}

.textLayer .highlight.end {
border-radius: 0 4px 4px 0;
}

.textLayer .highlight.middle {
border-radius: 0;
}

.textLayer .highlight.selected {
background-color: rgba(0, 100, 0, 1);
}

.textLayer ::-moz-selection {
background: #0000ff26;
}

.textLayer ::selection {
background: #0000ff26;
}

.textLayer br::-moz-selection {
background: transparent;
}
.textLayer br::selection {
background: transparent;
}

.textLayer .endOfContent {
display: block;
position: absolute;
left: 0;
top: 100%;
right: 0;
bottom: 0;
z-index: -1;
cursor: default;
-webkit-user-select: none;
-moz-user-select: none;
user-select: none;
}

.textLayer .endOfContent.active {
top: 0;
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
.annotationLayer .textWidgetAnnotation input:required,
.annotationLayer .textWidgetAnnotation textarea:required,
.annotationLayer .choiceWidgetAnnotation select:required,
.annotationLayer .buttonWidgetAnnotation.checkBox input:required,
.annotationLayer .buttonWidgetAnnotation.radioButton input:required {
outline: 1.5px solid selectedItem;
}
}

.annotationLayer {
position: absolute;
top: 0;
left: 0;
pointer-events: none;
transform-origin: 0 0;
z-index: 3;
}

.annotationLayer section {
position: absolute;
text-align: initial;
pointer-events: auto;
box-sizing: border-box;
transform-origin: 0 0;
}

.annotationLayer .linkAnnotation > a,
.annotationLayer .buttonWidgetAnnotation.pushButton > a {
position: absolute;
font-size: 1em;
top: 0;
left: 0;
width: 100%;
height: 100%;
}

.annotationLayer .buttonWidgetAnnotation.pushButton > canvas {
width: 100%;
height: 100%;
}

.annotationLayer .linkAnnotation > a:hover,
.annotationLayer .buttonWidgetAnnotation.pushButton > a:hover {
opacity: 0.2;
background: rgba(255, 255, 0, 1);
box-shadow: 0 2px 10px rgba(255, 255, 0, 1);
}

.annotationLayer .textAnnotation img {
position: absolute;
cursor: pointer;
width: 100%;
height: 100%;
}

.annotationLayer .textWidgetAnnotation input,
.annotationLayer .textWidgetAnnotation textarea,
.annotationLayer .choiceWidgetAnnotation select,
.annotationLayer .buttonWidgetAnnotation.checkBox input,
.annotationLayer .buttonWidgetAnnotation.radioButton input {
background-image: var(--annotation-unfocused-field-background);
border: 2px solid var(--input-unfocused-border-color);
box-sizing: border-box;
font: calc(9px * var(--scale-factor)) sans-serif;
height: 100%;
margin: 0;
vertical-align: top;
width: 100%;
}

.annotationLayer .textWidgetAnnotation input:required,
.annotationLayer .textWidgetAnnotation textarea:required,
.annotationLayer .choiceWidgetAnnotation select:required,
.annotationLayer .buttonWidgetAnnotation.checkBox input:required,
.annotationLayer .buttonWidgetAnnotation.radioButton input:required {
outline: 1.5px solid red;
}

.annotationLayer .choiceWidgetAnnotation select option {
padding: 0;
}

.annotationLayer .buttonWidgetAnnotation.radioButton input {
border-radius: 50%;
}

.annotationLayer .textWidgetAnnotation textarea {
resize: none;
}

.annotationLayer .textWidgetAnnotation input[disabled],
.annotationLayer .textWidgetAnnotation textarea[disabled],
.annotationLayer .choiceWidgetAnnotation select[disabled],
.annotationLayer .buttonWidgetAnnotation.checkBox input[disabled],
.annotationLayer .buttonWidgetAnnotation.radioButton input[disabled] {
background: none;
border: 2px solid var(--input-disabled-border-color);
cursor: not-allowed;
}

.annotationLayer .textWidgetAnnotation input:hover,
.annotationLayer .textWidgetAnnotation textarea:hover,
.annotationLayer .choiceWidgetAnnotation select:hover,
.annotationLayer .buttonWidgetAnnotation.checkBox input:hover,
.annotationLayer .buttonWidgetAnnotation.radioButton input:hover {
border: 2px solid var(--input-hover-border-color);
}
.annotationLayer .textWidgetAnnotation input:hover,
.annotationLayer .textWidgetAnnotation textarea:hover,
.annotationLayer .choiceWidgetAnnotation select:hover,
.annotationLayer .buttonWidgetAnnotation.checkBox input:hover {
border-radius: 2px;
}

.annotationLayer .textWidgetAnnotation input:focus,
.annotationLayer .textWidgetAnnotation textarea:focus,
.annotationLayer .choiceWidgetAnnotation select:focus {
background: none;
border: 2px solid var(--input-focus-border-color);
border-radius: 2px;
outline: var(--input-focus-outline);
}

.annotationLayer .buttonWidgetAnnotation.checkBox :focus,
.annotationLayer .buttonWidgetAnnotation.radioButton :focus {
background-image: none;
background-color: transparent;
}

.annotationLayer .buttonWidgetAnnotation.checkBox :focus {
border: 2px solid var(--input-focus-border-color);
border-radius: 2px;
outline: var(--input-focus-outline);
}

.annotationLayer .buttonWidgetAnnotation.radioButton :focus {
border: 2px solid var(--input-focus-border-color);
outline: var(--input-focus-outline);
}

.annotationLayer .buttonWidgetAnnotation.checkBox input:checked:before,
.annotationLayer .buttonWidgetAnnotation.checkBox input:checked:after,
.annotationLayer .buttonWidgetAnnotation.radioButton input:checked:before {
background-color: CanvasText;
content: "";
display: block;
position: absolute;
}

.annotationLayer .buttonWidgetAnnotation.checkBox input:checked:before,
.annotationLayer .buttonWidgetAnnotation.checkBox input:checked:after {
height: 80%;
left: 45%;
width: 1px;
}

.annotationLayer .buttonWidgetAnnotation.checkBox input:checked:before {
transform: rotate(45deg);
}

.annotationLayer .buttonWidgetAnnotation.checkBox input:checked:after {
transform: rotate(-45deg);
}

.annotationLayer .buttonWidgetAnnotation.radioButton input:checked:before {
border-radius: 50%;
height: 50%;
left: 30%;
top: 20%;
width: 50%;
}

.annotationLayer .textWidgetAnnotation input.comb {
font-family: monospace;
padding-left: 2px;
padding-right: 0;
}

.annotationLayer .textWidgetAnnotation input.comb:focus {
/*
* Letter spacing is placed on the right side of each character. Hence, the
* letter spacing of the last character may be placed outside the visible
* area, causing horizontal scrolling. We avoid this by extending the width
* when the element has focus and revert this when it loses focus.
*/
width: 103%;
}

.annotationLayer .buttonWidgetAnnotation.checkBox input,
.annotationLayer .buttonWidgetAnnotation.radioButton input {
-webkit-appearance: none;
-moz-appearance: none;
appearance: none;
}

.annotationLayer .popupTriggerArea {
height: 100%;
width: 100%;
}

.annotationLayer .popupWrapper {
position: absolute;
font-size: calc(9px * var(--scale-factor));
width: 100%;
min-width: calc(180px * var(--scale-factor));
pointer-events: none;
}

.annotationLayer .popup {
position: absolute;
max-width: calc(180px * var(--scale-factor));
background-color: rgba(255, 255, 153, 1);
box-shadow: 0 calc(2px * var(--scale-factor)) calc(5px * var(--scale-factor))
rgba(136, 136, 136, 1);
border-radius: calc(2px * var(--scale-factor));
paddi…</style>
</head>

<body>
 ${bodyString}
</body>
</html>`
}