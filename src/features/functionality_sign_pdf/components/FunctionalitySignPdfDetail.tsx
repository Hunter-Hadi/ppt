import { DndContext } from '@dnd-kit/core';
import { Box, Stack } from '@mui/material';
import { FC, useState } from 'react';
import { pdfjs } from 'react-pdf';

import FunctionalitySignPdfOperationView from './FunctionalitySignPdfOperationView';
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
  const [, setIsDropped] = useState(false);

  function handleDragEnd(event) {
    if (event.over && event.over.id === 'droppable') {
      setIsDropped(true);
    }
  }
  return (
    <Stack
      direction='row'
      sx={{
        width: '100%',
      }}
    >
      <DndContext onDragEnd={handleDragEnd}>
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
          <FunctionalitySignPdfOperationView />
        </Box>
      </DndContext>
    </Stack>
  );
};
export default FunctionalitySignPdfDetail;
