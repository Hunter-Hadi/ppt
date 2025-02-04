import { useCallback, useState } from 'react';

const useViewDropEvent = (props?: {
  onChange?: (fileList: FileList) => void;
}) => {
  const [isSidebarDragOver, setIsSidebarDragOver] = useState(false);

  const handleDragEnter = useCallback(() => {
    setIsSidebarDragOver(true);
  }, []);

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsSidebarDragOver(true);
    },
    [],
  );

  const handleDragLeave = useCallback(() => {
    setIsSidebarDragOver(false);
  }, []);

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    const { files } = event.dataTransfer;
    setIsSidebarDragOver(false);
    if (files.length > 0) {
      event.preventDefault();
      props?.onChange?.(files);
    }
  };

  return {
    isSidebarDragOver,
    setIsSidebarDragOver,
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
};

export default useViewDropEvent;
