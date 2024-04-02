import { useState } from 'react';
interface ISwitchWithType {
  id: string;
  isSelect: boolean;
}

const useConvertedContentSelector = <T extends ISwitchWithType>(params: {
  setList: (method: (prev: T[]) => T[]) => void;
}) => {
  const [isSelectAll, setIsSelectAll] = useState<boolean>(true); //是否全选
  const onSwitchSelect = (id: string) => {
    params.setList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isSelect: !item.isSelect } : item,
      ),
    );
  };
  const onSwitchAllSelect = () => {
    const newIsSelectAll = !isSelectAll;
    params.setList((prev) =>
      prev.map((item) => ({ ...item, isSelect: newIsSelectAll })),
    );
    setIsSelectAll(newIsSelectAll);
  };
  return {
    isSelectAll,
    setIsSelectAll,
    onSwitchSelect,
    onSwitchAllSelect,
  };
};
export default useConvertedContentSelector;
