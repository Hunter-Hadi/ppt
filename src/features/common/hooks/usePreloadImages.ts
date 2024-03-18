import { useEffect, useMemo, useState } from 'react';

interface IUsePreloadImagesReturn {
  isLoading: boolean;
  isLoaded: boolean;
}

const usePreloadImages = (inputUrls: string[]): IUsePreloadImagesReturn => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // 在 Hook 内部使用 useMemo 来记忆化 URLs 数组
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const urls = useMemo(() => inputUrls, [inputUrls.join(',')]);

  useEffect(() => {
    const loadImage = (url: string): Promise<Event> => {
      console.log(`开始 loadImage url`, url);
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = resolve;
        img.onerror = reject;
      });
    };

    Promise.all(urls.map((url) => loadImage(url)))
      .then(() => {
        setIsLoading(false);
        setIsLoaded(true);
      })
      .catch(() => {
        setIsLoading(false);
      });

    // 清除效果
    return () => {
      setIsLoading(false);
      setIsLoaded(false);
    };
  }, [urls]); // 依赖数组中的 urls 确保图片列表变化时重新加载

  return { isLoading, isLoaded };
};

export default usePreloadImages;
