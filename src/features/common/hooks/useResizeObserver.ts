import { useEffect, useRef } from 'react';

function useResizeObserver<T extends HTMLElement>(
  callback: (rect: DOMRectReadOnly) => void,
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        if (callback) {
          callback(entry.contentRect);
        }
      });
    });

    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        resizeObserver.unobserve(ref.current);
      }
    };
  }, [callback]);

  return ref;
}

export default useResizeObserver;
