import { useEffect, useState } from 'react';
interface ISwitchWithType {
  id: string;
  isSelect: boolean;
}
/**
 * 内容选择器功能
  * 用于列表项的单选择功能/全选切换功能/识别是否全选
 *
 * @returns {Object} 包含以下属性的对象：
 * - isSelectAll (boolean): 是否全选。
 * - setIsSelectAll (function): 设置是否全选的函数。
 * - onSwitchSelect (function): 单个选择切换的函数。
 *   接受一个参数 id，表示要切换选择的项的 id。
 * - onSwitchAllSelect (function): 全选切换的函数。
 */
const useFunctionalityCommonConvertedContentSelector = <T extends ISwitchWithType>(params: {
  list: (T & ISwitchWithType)[];
  setList: (method: (prev: T[]) => T[]) => void;
}) => {
  const [isSelectAll, setIsSelectAll] = useState<boolean>(true); //是否全选
  useEffect(() => {
    if (params.list) {
      const isAllSelected = params.list.every((item) => item.isSelect);
      setIsSelectAll(isAllSelected);
    }
  }, [params.list]);
  const onSwitchSelect = (id: string) => {
    params.setList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isSelect: !item.isSelect } : item,
      ),
    );
  };
  const onSwitchAllSelect = () => {
    setIsSelectAll(currentIsSelectAll => {
      params.setList((prev) =>
        prev.map((item) => ({ ...item, isSelect: !currentIsSelectAll })),
      );
      return !currentIsSelectAll
    });

  };
  return {
    isSelectAll,
    setIsSelectAll,
    onSwitchSelect,
    onSwitchAllSelect,
  };
};
export default useFunctionalityCommonConvertedContentSelector;
