// 辅助函数：得到文字的实际边界
export const getCanvasBounds = (imageData) => {
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    let minX = width, minY = height, maxX = 0, maxY = 0;

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            const alpha = data[(width * y + x) * 4 + 3];
            if (alpha > 0) {
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
            }
        }
    }

    return { minX, maxX, minY, maxY };
};