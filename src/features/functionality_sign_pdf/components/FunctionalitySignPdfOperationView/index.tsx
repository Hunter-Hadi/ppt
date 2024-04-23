import { useDraggable } from '@dnd-kit/core';
import { Box, Stack, Typography } from '@mui/material';
import Head from 'next/head';
import { FC, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';

import FunctionalitySignPdfIcon from '../FunctionalitySignPdfIcon';
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
      <Stack direction='column' gap={2}>
        <FunctionalitySignPdfSignatureView
          dragId={'draggable-one'}
          signatureEmptyView={
            <Stack direction='row' gap={1} alignItems='center'>
              <FunctionalitySignPdfIcon name='TextFields' />
              <Typography
                sx={{
                  fontSize: {
                    xs: 10,
                    lg: 16,
                  },
                }}
              >
                Your Signature
              </Typography>
            </Stack>
          }
        />
        <FunctionalitySignPdfSignatureView
          dragId={'draggable-two'}
          signatureEmptyView={
            <Stack direction='row' gap={1} alignItems='center'>
              <FunctionalitySignPdfIcon name='Abc' />
              <Typography
                sx={{
                  fontSize: {
                    xs: 10,
                    lg: 16,
                  },
                }}
              >
                Your Initials
              </Typography>
            </Stack>
          }
        />
      </Stack>
    </Stack>
  );
};
export default FunctionalitySignPdfOperationView;
