// 创建一个函数将文字转换为Base64图像数据
export const textToBase64Image = (text: string, fontSize: number = 40) => {
    // 创建一个画布元素
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context) {
        // 设置字体大小和字体
        context.font = `${fontSize}px Arial`;

        // 获取文字的宽度
        const textWidth = context.measureText(text).width;
        const textHeight = fontSize; // 高度大约与字体大小相匹配

        // 根据文字的宽度和高度调整画布的大小
        canvas.width = textWidth;
        canvas.height = textHeight + 18; // 调整高度，增加上内边距

        // 再次填充文本以适应大小变化
        context.font = `${fontSize}px Arial`;
        context.textBaseline = 'top';

        // 你可以选择填充文本的颜色 context.fillStyle = '#000000';
        // 填充文本
        context.fillText(text, 0, 9); // 调整绘制文本的起始Y坐标，增加上内边距的一半

        // 将canvas转换为base64格式图片
        const dataURL = canvas.toDataURL('image/png');
        return dataURL;

    }

}