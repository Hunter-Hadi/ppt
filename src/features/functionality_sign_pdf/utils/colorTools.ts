export const changeImageColor = (imageData: ImageData, color: string) => {
    const data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
        data[i + 1] = 0;
        switch (color) {
            case 'black':
                data[i] = 0;
                data[i + 2] = 0;
                break;
            case 'red':
                data[i] = 255;
                data[i + 2] = 0;
                break;
            case 'blue':
                data[i] = 0;
                data[i + 2] = 255;
                break;
        }
    }
    return imageData
}