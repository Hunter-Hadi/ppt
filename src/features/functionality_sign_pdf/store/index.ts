import dayjs from "dayjs";
import { atom } from "recoil";

export const FunctionalitySignPdfOperationOBjectAtom = atom<{
    //用户输入的签名的数据，左右都需要，所以存放在这里
    yourSignature: string[];
    yourInitials: string[];
    index: {
        yourSignature: number;
        yourInitials: number;
    };
    textField: string;
    dateField: string;
    checkbox: string;
}>({
    key: 'FunctionalitySignPdfOperationOBject', // 这个 key 在全局范围内必须是唯一的
    default: {
        // 默认值
        yourSignature: [],
        yourInitials: [],
        index: {
            yourSignature: 0,
            yourInitials: 0,
        },
        textField: 'Type something…',
        dateField: dayjs().format('MM/DD/YYYY'), //虽然不是时时，但是也没必要因为是天数
        checkbox: '✔',
    },
});