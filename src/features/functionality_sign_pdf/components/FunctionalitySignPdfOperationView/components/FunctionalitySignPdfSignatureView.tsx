import { Box, Button, Popover, Stack, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';

import FunctionalitySignPdfIcon from '../../FunctionalitySignPdfIcon';
import { FunctionalitySignPdfOperationDraggable } from '..';
import FunctionalitySignPdfSignatureModal, {
  ISignatureType,
} from './FunctionalitySignPdfSignatureModal';
interface IFunctionalitySignPdfSignatureViewProps {
  dragId: string;
  onShowImgVal?: (val: string) => void;
}
const FunctionalitySignPdfSignatureView: FC<
  IFunctionalitySignPdfSignatureViewProps
> = ({ dragId, onShowImgVal }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [signatureViewList, setSignatureViewList] = useState<string[]>([]);
  const [currentShowIndex, setCurrentShowIndex] = useState(0);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const isHaveValue = signatureViewList[currentShowIndex] !== undefined;
  const showImgValue = signatureViewList[currentShowIndex];
  const popoverId = 'pdf-signature-menu-popover-id';
  const open = Boolean(anchorEl);
  useEffect(() => {
    if (signatureViewList[currentShowIndex] !== undefined) {
      onShowImgVal && onShowImgVal(signatureViewList[currentShowIndex]);
    }
  }, [currentShowIndex]);
  const handleClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const onCreateSignatureValue = (type: ISignatureType, value: string) => {
    //只做了第一个显示
    setSignatureViewList((list) => [...list, value]);
    setCurrentShowIndex(signatureViewList.length);
  };
  const onDelImgVal = (index: number) => {
    if (currentShowIndex === index) {
      setCurrentShowIndex(0);
    }
    if (signatureViewList.length === 1) {
      handleClose();
    }
    setSignatureViewList((list) => list.filter((_, i) => i !== index));
  };
  return (
    <FunctionalitySignPdfOperationDraggable
      disabled={!isHaveValue}
      id={dragId}
      isPdfDrag={false}
      data={isHaveValue ? { type: 'base64', value: showImgValue } : undefined}
    >
      <Stack
        aria-describedby={popoverId}
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
        }}
      >
        <FunctionalitySignPdfIcon name='DragIndicator' />
        {!isHaveValue && (
          <Stack
            direction='row'
            flex={1}
            justifyContent='space-between'
            onClick={() => setModalOpen(true)}
          >
            <Box flex={1}>
              <Typography
                sx={{
                  fontSize: {
                    xs: 10,
                    lg: 14,
                  },
                }}
              >
                Your Signature
              </Typography>
            </Box>
            <Typography
              color='text.secondary'
              sx={{
                fontWeight: 'bold',
                fontSize: {
                  xs: 12,
                  lg: 16,
                },
              }}
            >
              Add
            </Typography>
          </Stack>
        )}
        {isHaveValue && (
          <img
            src={showImgValue}
            style={{
              width: 'calc(100% - 50px)',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        )}
        {isHaveValue && (
          <Stack
            sx={{
              borderLeft: '1px solid #e8e8e8',
              height: '100%',
              width: 30,
            }}
            alignItems='center'
            justifyContent='center'
            onClick={handleClick}
          >
            <FunctionalitySignPdfIcon name='KeyboardArrowDown' />
          </Stack>
        )}
      </Stack>
      <Popover
        id={popoverId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 0,
          horizontal: 260,
        }}
      >
        <Box
          sx={{
            width: 260,
            p: 1,
          }}
        >
          {signatureViewList.map((item, index) => (
            <Stack
              sx={{
                px: 1,
                cursor: 'pointer',
                ':hover': {
                  bgcolor: '#f5f5f5',
                  borderRadius: 1,
                },
              }}
              direction={'row'}
              alignItems='center'
              key={index}
            >
              <img
                src={item}
                onClick={() => {
                  setCurrentShowIndex(index);
                  handleClose();
                }}
                style={{
                  height: 50,
                  flex: 1,
                  overflow: 'hidden',
                  objectFit: 'contain',
                }}
              />
              <FunctionalitySignPdfIcon
                onClick={() => {
                  onDelImgVal(index);
                }}
                name='DeleteForeverOutlined'
              />
            </Stack>
          ))}
          <Button
            variant='contained'
            fullWidth
            sx={{
              mt: 1,
            }}
            onClick={() => setModalOpen(true)}
          >
            ADD
          </Button>
        </Box>
      </Popover>
      {modalOpen && (
        <FunctionalitySignPdfSignatureModal
          onClose={() => setModalOpen(false)}
          onCreate={onCreateSignatureValue}
        />
      )}
    </FunctionalitySignPdfOperationDraggable>
  );
};
export default FunctionalitySignPdfSignatureView;
