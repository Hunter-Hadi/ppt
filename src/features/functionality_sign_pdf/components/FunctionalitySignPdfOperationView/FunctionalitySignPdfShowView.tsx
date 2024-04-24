import { useDraggable } from '@dnd-kit/core';
import { Box, Stack } from '@mui/material';
import { FC } from 'react';

import FunctionalitySignPdfIcon from '../FunctionalitySignPdfIcon';

const FunctionalitySignPdfOperationDraggableView: FC<{
  id: string;
  disabled?: boolean;
  children: React.ReactNode;
  data?: { type: string; value?: string };
  onClick?: () => void;
}> = ({ id, data, children, disabled, onClick }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: id,
    data: { id: id, ...data },
    disabled: disabled,
  });

  return (
    <Box id={id} ref={setNodeRef} {...listeners} {...attributes}>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        sx={{
          height: 60,
          background: 'rgb(250, 250, 250)',
          borderWidth: '1px 1px  1px  4px',
          borderStyle: 'solid',
          borderColor: '#e8e8e8 rgb(232, 232, 232) rgb(232, 232, 232) #9065B0',
          borderImage: 'initial',
          borderRadius: 1,
          cursor: 'pointer',
          '&:hover': {
            boxShadow: '#1a1a1a33 0px 0px 12px',
          },
        }}
      >
        <Stack
          direction='row'
          alignItems='center'
          sx={{
            height: '100%',
          }}
          onClick={onClick}
        >
          <FunctionalitySignPdfIcon color='primary' name='DragIndicator' />
        </Stack>
        {children}
      </Stack>
    </Box>
  );
};
export default FunctionalitySignPdfOperationDraggableView;
