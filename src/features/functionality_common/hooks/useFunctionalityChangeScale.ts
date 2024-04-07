import { useCallback, useState } from "react";

export const useFunctionalityChangeScale = () => {
    const defScale = 4, maxScale = 10, minScale = 2;
    const [currentScale, setCurrentScale] = useState<number>(defScale); //当前一行多少个展示
    const onDefaultChangeScale = (num: number) => {
        if (num === 1) {
            setCurrentScale(maxScale);
        } else {
            setCurrentScale(defScale);
        }
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