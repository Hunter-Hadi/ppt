// 将图片转换为 Uint8Array 数据
export function imageToUint8Array({
  imageDocument,
  quality,
  type,
  transform,
}: {
  imageDocument: HTMLImageElement;
  type: string;
  quality: number;
  transform?(imageData: ImageData): ImageData;
}) {
  return new Promise<Uint8Array>((resolve, reject) => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      // 监听图片加载完成事件
      imageDocument.addEventListener('load', () => {
        canvas.width = imageDocument.width;
        canvas.height = imageDocument.height;

        // 绘制图片到画布上
        ctx.drawImage(
          imageDocument,
          0,
          0,
          imageDocument.width,
          imageDocument.height,
        );

        if (transform) {
          // 对图像数据进行转换
          const transData = transform(
            ctx.getImageData(0, 0, canvas.width, canvas.height),
          );
          ctx.putImageData(transData, 0, 0);
        }
        // 将画布内容转换为 Blob 数据
        canvas.toBlob(
          (blob) => {
            const reader = new FileReader();
            reader.onload = () => {
              const arrayBuffer = reader.result as ArrayBuffer;
              const uint8Array = new Uint8Array(arrayBuffer);
              resolve(uint8Array);
            };
            reader.onerror = () => {
              reject(new Error('Error reading blob data.'));
            };
            reader.readAsArrayBuffer(blob!);
          },
          type,
          quality,
        );
      });
      // 监听图片加载失败事件
      imageDocument.addEventListener('error', () => {
        reject(new Error('Error loading image.'));
      });
    } catch (e) {
      console.log('imageToUint8Array error:', e);
      reject(new Error('Error loading image.'));
    }
  });
}
