export const copyImageToClipboard = async (imgUrl: string) => {
  return new Promise((resolve, reject) => {
    var img = new Image();
    img.src =
      'https://maxaistorage.s3.amazonaws.com/dalle-generations/90e86779cd04b0aa41908977d1ca48f3c4e959ff.webp?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4NYXT5H4KLMTHHPR%2F20240206%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20240206T134711Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=f40ce57c8c0f86abc87f294a3f6e07204c47d16db15569e1930d1b992dbcfb9f';
    img.setAttribute('crossOrigin', 'anonymous');
    img.style.width = '100%';
    img.style.objectFit = 'contain';
    img.onload = function () {
      // copy to clipboard
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
      }
      canvas.toBlob(function (blob) {
        if (!blob) {
          return;
        }
        resolve(blob);
      });
    };
    img.onerror = function () {
      // do nothing
      reject('error loading image');
    };
  });
};
