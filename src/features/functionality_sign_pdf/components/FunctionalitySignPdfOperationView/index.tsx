import { useDraggable } from '@dnd-kit/core';
import { Box, Stack } from '@mui/material';
import Head from 'next/head';
import { FC, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';

import FunctionalitySignPdfSignatureView from './components/FunctionalitySignPdfSignatureView';

export const FunctionalitySignPdfOperationDraggable: FC<{
  id: string;
  disabled?: boolean;
  isPdfDrag: boolean;
  children: React.ReactNode;
  data?: { type: string; value: string };
}> = ({ id, data, children, disabled }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: id,
    data: { id: uuidV4(), ...data },
    disabled: disabled,
  });

  return (
    <Box ref={setNodeRef} {...listeners} {...attributes}>
      {children}
    </Box>
  );
};

interface IFunctionalitySignPdfOperationView {}
const FunctionalitySignPdfOperationView: FC<
  IFunctionalitySignPdfOperationView
> = () => {
  const [setOpen] = useState(false);

  return (
    <Stack flexDirection='column'>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='true'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap'
          rel='stylesheet'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=La+Belle+Aurore&display=swap'
          rel='stylesheet'
        ></link>
        <link
          href='https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Dancing+Script:wght@400..700&family=La+Belle+Aurore&display=swap'
          rel='stylesheet'
        ></link>
      </Head>
      <Box>
        <FunctionalitySignPdfSignatureView dragId={'draggable-one'} />
      </Box>
    </Stack>
  );
};
export default FunctionalitySignPdfOperationView;
