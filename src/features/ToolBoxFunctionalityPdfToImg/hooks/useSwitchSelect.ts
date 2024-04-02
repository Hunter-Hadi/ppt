import { useState } from 'react';
interface ISwitchWithType {
  id: string;
  isSelect: boolean;
}

const useSwitchIdSelect = <T extends ISwitchWithType>(params: {
  setList: (method: (prev: T[]) => T[]) => void;
}) => {
  const [pdfIsSelectAll, setPdfIsSelectAll] = useState<boolean>(true); //是否全选
  const onSwitchSelect = (id: string) => {
    params.setList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isSelect: !item.isSelect } : item,
      ),
    );
  };
  const onSwitchAllSelect = () => {
    const newIsSelectAll = !pdfIsSelectAll;
    params.setList((prev) =>
      prev.map((item) => ({ ...item, isSelect: newIsSelectAll })),
    );
    setPdfIsSelectAll(newIsSelectAll);
  };
  return {
    pdfIsSelectAll,
    setPdfIsSelectAll,
    onSwitchSelect,
    onSwitchAllSelect,
  };
};
export default useSwitchIdSelect;
