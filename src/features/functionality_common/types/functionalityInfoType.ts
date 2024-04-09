export interface IFunctionalityPdfInfoProps {
    id: string;
    name?: string;
    imageUrlString: string;

}
export type IFunctionalityPdfImageInfoProps = IFunctionalityPdfInfoProps & { definedIndex: number, isSelect: boolean; }
export type IFunctionalityPdfFileInfoProps = IFunctionalityPdfInfoProps & { file: File; size: number; pages: number; imageUrlString: string; }