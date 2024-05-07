import { inflate } from 'pako';
import { PDFName } from 'pdf-lib';
import { ColorType, PNG } from 'pngjs/browser';
// 定义PNG颜色类型
const PngColorTypes = {
  Grayscale: 0,
  Rgb: 2,
  GrayscaleAlpha: 4,
  RgbAlpha: 6,
};
// 不同颜色类型的每像素组件数
const ComponentsPerPixelOfColorType = {
  [PngColorTypes.Rgb]: 3,
  [PngColorTypes.Grayscale]: 1,
  [PngColorTypes.RgbAlpha]: 4,
  [PngColorTypes.GrayscaleAlpha]: 2,
};
// 在特定偏移位读取字节中的位
const readBitAtOffsetOfByte = (byte, bitOffset) => {
  const bit = (byte >> bitOffset) & 1;
  return bit;
};
// 在字节数组中的特定偏移位读取位
const readBitAtOffsetOfArray = (uint8Array, bitOffsetWithinArray) => {
  const byteOffset = Math.floor(bitOffsetWithinArray / 8);
  const byte = uint8Array[uint8Array.length - byteOffset];
  const bitOffsetWithinByte = Math.floor(bitOffsetWithinArray % 8);
  return readBitAtOffsetOfByte(byte, bitOffsetWithinByte);
};
// 从PDF图像创建PNG
export const createPngFromPdf = (image) => {
  return new Promise((resolve, reject) => {
    // 判断是否为灰度色彩空间
    const isGrayscale = image.colorSpace === PDFName.of('DeviceGray');
    // 解压图像数据
    const colorPixels = inflate(image.data);
    // 解压透明层数据（如果存在）
    const alphaPixels = image.alphaLayer
      ? inflate(image.alphaLayer.data)
      : undefined;
    // 根据颜色类型和透明层的存在确定PNG颜色类型
    const colorType =
      isGrayscale && alphaPixels
        ? PngColorTypes.GrayscaleAlpha
        : !isGrayscale && alphaPixels
        ? PngColorTypes.RgbAlpha
        : isGrayscale
        ? PngColorTypes.Grayscale
        : PngColorTypes.Rgb;

    const colorByteSize = 1;
    const width = image.width * colorByteSize;
    const height = image.height * colorByteSize;

    // 判断输入数据是否包含透明层
    const inputHasAlpha = [
      PngColorTypes.RgbAlpha,
      PngColorTypes.GrayscaleAlpha,
    ].includes(colorType);
    // 创建PNG对象
    const png = new PNG({
      width,
      height,
      colorType: colorType as ColorType,
      inputColorType: colorType as ColorType,
      inputHasAlpha,
    });

    const componentsPerPixel = ComponentsPerPixelOfColorType[colorType];
    png.data = new Uint8Array(width * height * componentsPerPixel) as Buffer;

    let colorPixelIdx = 0;
    let pixelIdx = 0;

    // 填充PNG数据
    while (pixelIdx < png.data.length) {
      if (colorType === PngColorTypes.Rgb) {
        png.data[pixelIdx++] = colorPixels[colorPixelIdx++];
        png.data[pixelIdx++] = colorPixels[colorPixelIdx++];
        png.data[pixelIdx++] = colorPixels[colorPixelIdx++];
      } else if (colorType === PngColorTypes.RgbAlpha) {
        png.data[pixelIdx++] = colorPixels[colorPixelIdx++];
        png.data[pixelIdx++] = colorPixels[colorPixelIdx++];
        png.data[pixelIdx++] = colorPixels[colorPixelIdx++];
        png.data[pixelIdx++] = alphaPixels![colorPixelIdx - 1];
      } else if (colorType === PngColorTypes.Grayscale) {
        const bit =
          readBitAtOffsetOfArray(colorPixels, colorPixelIdx++) === 0
            ? 0x00
            : 0xff;
        png.data[png.data.length - pixelIdx++] = bit;
      } else if (colorType === PngColorTypes.GrayscaleAlpha) {
        const bit =
          readBitAtOffsetOfArray(colorPixels, colorPixelIdx++) === 0
            ? 0x00
            : 0xff;
        png.data[png.data.length - pixelIdx++] = bit;
        png.data[png.data.length - pixelIdx++] =
          alphaPixels![colorPixelIdx - 1];
      } else {
        throw new Error(`Unknown colorType=${colorType}`);
      }
    }
    // 封装和转换PNG流数据为Uint8Array
    const buffer: any[] = [];
    png
      .pack()
      .on('data', (data: any) => buffer.push(data))
      .on('end', () => {
        const finalArr = new Uint8Array(
          buffer.reduce((prev, cur) => prev + cur.length, 0),
        );
        let offset = 0;
        buffer.forEach((b) => {
          finalArr.set(b, offset);
          offset += b.length;
        });
        resolve(finalArr);
      })
      .on('error', (err) => reject(err));
  });
};
