interface IOpts {
  viewportScale: number;
  hideText?: boolean;
}
export async function pdfPageBackgroundToCanvas(
  page: any,
  options: IOpts,
): Promise<HTMLCanvasElement> {
  // 保存原始的CanvasRenderingContext2D的文本方法
  const originalStrokeText = CanvasRenderingContext2D.prototype.strokeText;
  const originalFillText = CanvasRenderingContext2D.prototype.fillText;

  // 如果hideText为true，则替换strokeText和fillText方法，使其不做任何事情
  if (options.hideText) {
    CanvasRenderingContext2D.prototype.strokeText = function () {};
    CanvasRenderingContext2D.prototype.fillText = function () {};
  }

  // 根据提供的选项中的viewportScale设置viewport
  const viewport = page.getViewport({ scale: options.viewportScale || 1 });

  // 创建一个新的canvas元素，并设置其宽高为viewport的宽高
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = viewport.width;
  canvas.height = viewport.height;

  // 渲染PDF页面到canvas
  await page.render({
    canvasContext: context,
    viewport: viewport,
  }).promise;

  // 渲染结束后，如果hideText为真，则恢复原有的文本方法
  if (options.hideText) {
    CanvasRenderingContext2D.prototype.strokeText = originalStrokeText;
    CanvasRenderingContext2D.prototype.fillText = originalFillText;
  }

  // 返回已渲染的canvas元素
  return canvas;
}
