export const PDF_PAGE_SIZE_OPTIONS = [
  { name: '4A0', width: 4767.87, height: 6740.79 },
  { name: '2A0', width: 3370.39, height: 4767.87 },
  { name: 'A0', width: 2383.94, height: 3370.39 },
  { name: 'A1', width: 1683.78, height: 2383.94 },
  { name: 'A2', width: 1190.55, height: 1683.78 },
  { name: 'A3', width: 841.89, height: 1190.55 },
  { name: 'A4', width: 595.28, height: 841.89 },
  { name: 'A5', width: 419.53, height: 595.28 },
  { name: 'A6', width: 297.64, height: 419.53 },
  { name: 'A7', width: 209.76, height: 297.64 },
  { name: 'A8', width: 147.4, height: 209.76 },
  { name: 'A9', width: 104.88, height: 147.4 },
  { name: 'A10', width: 73.7, height: 104.88 },
  { name: 'B0', width: 2834.65, height: 4008.19 },
  { name: 'B1', width: 2004.09, height: 2834.65 },
  { name: 'B2', width: 1417.32, height: 2004.09 },
  { name: 'B3', width: 1000.63, height: 1417.32 },
  { name: 'B4', width: 708.66, height: 1000.63 },
  { name: 'B5', width: 498.9, height: 708.66 },
  { name: 'B6', width: 354.33, height: 498.9 },
  { name: 'B7', width: 249.45, height: 354.33 },
  { name: 'B8', width: 175.75, height: 249.45 },
  { name: 'B9', width: 124.72, height: 175.75 },
  { name: 'B10', width: 87.87, height: 124.72 },
  { name: 'C0', width: 2599.37, height: 3676.54 },
  { name: 'C1', width: 1836.85, height: 2599.37 },
  { name: 'C2', width: 1298.27, height: 1836.85 },
  { name: 'C3', width: 918.43, height: 1298.27 },
  { name: 'C4', width: 649.13, height: 918.43 },
  { name: 'C5', width: 459.21, height: 649.13 },
  { name: 'C6', width: 323.15, height: 459.21 },
  { name: 'C7', width: 229.61, height: 323.15 },
  { name: 'C8', width: 161.57, height: 229.61 },
  { name: 'C9', width: 113.39, height: 161.57 },
  { name: 'C10', width: 79.37, height: 113.39 },
  { name: 'RA0', width: 4767.87, height: 6740.79 },
  { name: 'RA1', width: 3370.39, height: 4767.87 },
  { name: 'RA2', width: 2383.94, height: 3370.39 },
  { name: 'RA3', width: 1683.78, height: 2383.94 },
  { name: 'RA4', width: 1190.55, height: 1683.78 },
  { name: 'SRA0', width: 6378.27, height: 4767.87 },
  { name: 'SRA1', width: 4767.87, height: 3370.39 },
  { name: 'SRA2', width: 3370.39, height: 2383.94 },
  { name: 'SRA3', width: 2383.94, height: 1683.78 },
  { name: 'SRA4', width: 1683.78, height: 1190.55 },
  { name: 'Executive', width: 522.05, height: 756.0 },
  { name: 'Folio', width: 612.0, height: 936.0 },
  { name: 'Legal', width: 612.0, height: 1008.0 },
  { name: 'Letter', width: 612.0, height: 792.0 },
  { name: 'Tabloid', width: 792.0, height: 1224.0 },
];

export type IPdfImagePositionOptionKeyType = 'middle' | 'top' | 'bottom';

export const PDF_IMAGE_POSITION_OPTIONS: {
  key: IPdfImagePositionOptionKeyType;
  title: string;
}[] = [
  {
    key: 'middle',
    title:
      'functionality__image_to_pdf:components__image_to_pdf__position_middle',
  },
  {
    key: 'top',
    title: 'functionality__image_to_pdf:components__image_to_pdf__position_top',
  },
  {
    key: 'bottom',
    title:
      'functionality__image_to_pdf:components__image_to_pdf__position_bottom',
  },
];
