import { useCallback, useState } from "react";
/**
 * 用于改变图像的缩放比例。
 *
 * @returns {Object} 包含以下属性的对象：
 * - changeScale (function): 在想要改变缩放比例时调用的函数。
 *   可接受 'enlarge' 增大缩放比例或 'narrow' 减小缩放比例。
 * - currentScale (number): 当前的缩放比例值。
 * - onDefaultChangeScale (function): 重置缩放比例到默认值的函数。
 *   传入 1 以设置为最大缩放比例，传入其他值将重置为默认缩放比例。
 */
export const useFunctionalityChangeScale = () => {
    const defScale = 4, maxScale = 10, minScale = 2;
    const [currentScale, setCurrentScale] = useState<number>(defScale);
    const onDefaultChangeScale = () => {
        setCurrentScale(defScale);
    }
    const changeScale = useCallback(
        (type: 'enlarge' | 'narrow') => {
            setCurrentScale((prev) => {
                if (type === 'enlarge') {
                    return Math.min(prev + 1, maxScale);
                } else {
                    return Math.max(prev - 1, minScale);
                }
            });
        },
        [],
    );
    return { changeScale, currentScale, onDefaultChangeScale }
}