import { useState } from 'react';

import { defaultScale } from '../constants';
const useChatPdfListZoom = (
  props: {
    max: number;
    min: number;
  } = {
    max: 2,
    min: 0.1,
  },
) => {
  const [scaleNumber, setScaleNumber] = useState<number>(defaultScale);
  const onChangeZoom = (type: 'reduce' | 'add') => {
    // lastPageNumber.current = props.currentPage;
    if (type === 'reduce') {
      setScaleNumber((scale) => Math.max(scale - 0.1, props.min));
    } else {
      setScaleNumber((scale) => Math.min(scale + 0.1, props.max));
    }
  };
  const onSelfAdaption = () => {
    setScaleNumber(defaultScale);
  };
  return { onChangeZoom, onSelfAdaption, scaleNumber };
};
export default useChatPdfListZoom;
