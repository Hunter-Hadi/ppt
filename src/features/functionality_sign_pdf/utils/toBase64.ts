import { getCanvasBounds } from './canvasTools';

//得到文字图片，并转换为base64格式
export const textToBase64Image = (
  text: string,
  color: string = '#000000',
  fontFamily: string = 'Arial',
  fontSize: number = 366,
) => {
  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context) {
      // 设置字体大小和字体
      context.font = `${fontSize}px ${fontFamily}`;

      // 预计算文本的宽度以设置初始画布大小
      const textWidth = context.measureText(text).width;
      canvas.width = textWidth + fontSize;
      canvas.height = fontSize * 1.5; // 增加一定的高度以确保文字完全包含

      // 重置字体，因在canvas大小改变后需要重新设置
      context.font = `${fontSize}px ${fontFamily}`;
      context.fillStyle = color;
      context.textBaseline = 'top';

      // 填充文本
      context.fillText(text, fontSize / 2, fontSize / 4); // 为了确保文字在canvas中居中，做出相应调整

      // 获取文字的实际边界
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const bounds = getCanvasBounds(imageData);

      // 根据得到的边界调整canvas大小并重新绘制文本
      const { minX, minY, maxX, maxY } = bounds;
      const clippedWidth = maxX - minX + 1;
      const clippedHeight = maxY - minY + 1;

      const clippedCanvas = document.createElement('canvas');
      clippedCanvas.width = clippedWidth;
      clippedCanvas.height = clippedHeight;

      const clippedContext = clippedCanvas.getContext('2d');
      if (clippedContext) {
        // 配置绘图环境，以确保文本属性一致
        clippedContext.font = `${fontSize}px ${fontFamily}`;
        clippedContext.fillStyle = color;
        clippedContext.textBaseline = 'top';

        // 重新绘制文本到调整大小后的画布上
        clippedContext.putImageData(imageData, -minX, -minY);

        return clippedCanvas.toDataURL('image/png');
      }
    }
  } catch (e) {
    console.log(e);
  }
};
