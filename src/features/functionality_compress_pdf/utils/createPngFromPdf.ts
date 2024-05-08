import { inflate } from 'pako';
import { PDFName } from 'pdf-lib';
import { ColorType, PNG } from 'pngjs/browser';

import { IPdfLibImage } from './getPdfLibImages';

const PngColorTypes = {
  Grayscale: 0,
  Rgb: 2,
  GrayscaleAlpha: 4,
  RgbAlpha: 6,
};

const ComponentsPerPixelOfColorType = {
  [PngColorTypes.Rgb]: 3,
  [PngColorTypes.Grayscale]: 1,
  [PngColorTypes.RgbAlpha]: 4,
  [PngColorTypes.GrayscaleAlpha]: 2,
};

const readBitAtOffsetOfByte = (byte, bitOffset) => {
  const bit = (byte >> bitOffset) & 1;
  return bit;
};

const readBitAtOffsetOfArray = (uint8Array, bitOffsetWithinArray) => {
  const byteOffset = Math.floor(bitOffsetWithinArray / 8);
  const byte = uint8Array[uint8Array.length - byteOffset];
  const bitOffsetWithinByte = Math.floor(bitOffsetWithinArray % 8);
  return readBitAtOffsetOfByte(byte, bitOffsetWithinByte);
};
// 从PDF图像创建PNG
export const createPngFromPdf = (image: IPdfLibImage): Promise<Uint8Array> => {
  return new Promise((resolve, reject) => {
    try {
      // 判断是否为灰度色彩空间
      const isGrayscale = image.colorSpace === PDFName.of('DeviceGray');
      // 解压图像数据
      const colorPixels = inflate(image.data);
      // 根据颜色类型确定PNG颜色类型
      const colorType = isGrayscale
        ? PngColorTypes.Grayscale
        : PngColorTypes.Rgb;
      const colorByteSize = 1;
      const width = image.width * colorByteSize;
      const height = image.height * colorByteSize;
      const inputHasAlpha = [
        PngColorTypes.RgbAlpha,
        PngColorTypes.GrayscaleAlpha,
      ].includes(colorType);

      const png = new PNG({
        width,
        height,
        colorType: colorType as ColorType,
        inputColorType: colorType as ColorType,
        inputHasAlpha,
      });

      const componentsPerPixel = ComponentsPerPixelOfColorType[colorType];
      png.data = new Uint8Array(width * height * componentsPerPixel) as Buffer;
      // 填充PNG数据
      let colorPixelIdx = 0;
      let pixelIdx = 0;
      while (pixelIdx < png.data.length) {
        if (colorType === PngColorTypes.Rgb) {
          png.data[pixelIdx++] = colorPixels[colorPixelIdx++];
          png.data[pixelIdx++] = colorPixels[colorPixelIdx++];
          png.data[pixelIdx++] = colorPixels[colorPixelIdx++];
        } else if (colorType === PngColorTypes.RgbAlpha) {
          png.data[pixelIdx++] = colorPixels[colorPixelIdx++];
          png.data[pixelIdx++] = colorPixels[colorPixelIdx++];
          png.data[pixelIdx++] = colorPixels[colorPixelIdx++];
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
        } else {
          throw new Error(`Unknown colorType=${colorType}`);
        }
      }
      // 封装和转换PNG流数据为Uint8Array
      const buffer: Buffer[] = [];
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
    } catch (e) {
      console.log('createPngFromPdf error:', e);
      reject(e);
    }
  });
};
