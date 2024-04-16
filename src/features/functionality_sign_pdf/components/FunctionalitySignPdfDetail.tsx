import { DndContext } from '@dnd-kit/core';
import { Box, Stack } from '@mui/material';
import { FC } from 'react';
import { pdfjs } from 'react-pdf';

import FunctionalitySignPdfShowPdfView from './FunctionalitySignPdfShowPdfView';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();
interface IFunctionalitySignPdfDetailProps {
  file: File;
}
export const FunctionalitySignPdfDetail: FC<
  IFunctionalitySignPdfDetailProps
> = ({ file }) => {
  return (
    <Stack
      direction='row'
      sx={{
        width: '100%',
      }}
    >
      <DndContext>
        <Box
          sx={{
            flex: 1,
            backgroundColor: '#fafafa',
          }}
        >
          <FunctionalitySignPdfShowPdfView file={file} />
        </Box>
        <Box
          sx={{
            minWidth: 200,
          }}
        >
          <Box
            sx={{
              cursor: 'pointer',
            }}
          >
            签名拖动测试
          </Box>
        </Box>
      </DndContext>
    </Stack>
  );
};
export default FunctionalitySignPdfDetail;
