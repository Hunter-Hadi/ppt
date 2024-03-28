import { FC, useEffect } from 'react';
interface IToolBoxFunctionalityPdfToImgProps {
  fileList: FileList;
}
const ToolBoxFunctionalityPdfToImg: FC<IToolBoxFunctionalityPdfToImgProps> = ({
  fileList,
}) => {
  useEffect(() => {
    // 在这里可以执行副作用操作，比如订阅事件、发送网络请求等
    console.log('fileList', fileList);
    // 清理副作用操作的函数
    return () => {
      // 在这里可以执行清理操作，比如取消订阅、清除定时器等
    };
  }, [fileList]);

  return <div>33</div>;
};

export default ToolBoxFunctionalityPdfToImg;
