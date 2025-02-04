//文件转换为Uint8Array
export const fileToUInt8Array = (file: File | Blob): Promise<Uint8Array> => {
  return new Promise<Uint8Array>((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const uint8Array = new Uint8Array(arrayBuffer);
      resolve(uint8Array);
    });

    reader.addEventListener('error', () => {
      reject(new Error('Failed to read file'));
    });

    reader.readAsArrayBuffer(file);
  });
};
