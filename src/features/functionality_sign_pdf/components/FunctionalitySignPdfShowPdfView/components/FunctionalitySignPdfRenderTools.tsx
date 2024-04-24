import { IconButton, Stack, TextField } from '@mui/material';
import { FC } from 'react';

import FunctionalitySignPdfIcon from '../../FunctionalitySignPdfIcon';
interface IFunctionalitySignPdfRenderToolsProps {
  isSelfAdaption: boolean;
  onSelfAdaption: () => void;
  onReduceSize: () => void;
  onAddSize: () => void;
}
const FunctionalitySignPdfRenderTools: FC<
  IFunctionalitySignPdfRenderToolsProps
> = ({ isSelfAdaption, onSelfAdaption, onReduceSize, onAddSize }) => {
  return (
    <Stack
      direction='row'
      alignItems='center'
      gap={1}
      sx={{
        bgcolor: '#ffffff',
        p: 1,
        borderRadius: 2,
      }}
    >
      <IconButton aria-label='delete' size='small'>
        <FunctionalitySignPdfIcon name='ArrowBackIos' />
      </IconButton>
      <TextField
        sx={{ width: 50, textAlign: 'center' }}
        hiddenLabel
        defaultValue='1'
        variant='filled'
        size='small'
      />
      <IconButton aria-label='delete' size='small'>
        <FunctionalitySignPdfIcon name='ArrowForwardIos' />
      </IconButton>
      <Stack
        sx={{
          borderRight: '1px solid #e8e8e8',
          height: '100%',
          pr: 2,
        }}
        direction='row'
        alignItems='center'
      >
        of 1
      </Stack>

      <IconButton size='small' onClick={onSelfAdaption}>
        <FunctionalitySignPdfIcon
          name={isSelfAdaption ? 'ZoomInMapOutlined' : 'ZoomOutMapOutlined'}
        />
      </IconButton>

      <IconButton size='small' onClick={onReduceSize}>
        <FunctionalitySignPdfIcon name='RemoveCircleOutlineOutlined' />
      </IconButton>
      <IconButton size='small' onClick={onAddSize}>
        <FunctionalitySignPdfIcon name='AddCircleOutlineOutlined' />
      </IconButton>
    </Stack>
  );
};
export default FunctionalitySignPdfRenderTools;
