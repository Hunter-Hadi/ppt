import { Box, Button, Popover, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';

import { IActiveDragData } from '../FunctionalitySignPdfDetail';
import FunctionalitySignPdfIcon from '../FunctionalitySignPdfIcon';
import FunctionalitySignPdfOperationDraggableView from './FunctionalitySignPdfShowView';
import FunctionalitySignPdfSignatureModal, {
  ISignatureType,
} from './FunctionalitySignPdfSignatureModal';
interface IFunctionalitySignPdfSignatureViewProps {
  dragId: string;
  onShowImgVal?: (val: string) => void;
  signatureEmptyView?: React.ReactNode;
  activeDragData?: IActiveDragData;
}

const FunctionalitySignPdfSignatureView: FC<
  IFunctionalitySignPdfSignatureViewProps
> = ({ dragId, onShowImgVal, signatureEmptyView, activeDragData }) => {
  const { t } = useTranslation();

  const [modalOpen, setModalOpen] = useState(false);
  const [signatureViewList, setSignatureViewList] = useState<string[]>([]);
  const [currentShowIndex, setCurrentShowIndex] = useState(0);
  const isActiveCurrent = useRef(false);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null); //Popover
  const showImgValue = useMemo(
    () => signatureViewList[currentShowIndex],
    [signatureViewList, currentShowIndex],
  );
  const isHaveValue = !!showImgValue;
  const popoverId = 'pdf-signature-menu-popover-id';
  const open = Boolean(anchorEl);
  useEffect(() => {
    console.log('simply activeDragData', activeDragData);
    if (activeDragData?.id === dragId && !isHaveValue) {
      isActiveCurrent.current = true;
    } else {
      if (isActiveCurrent.current) {
        setModalOpen(true);
      }
      isActiveCurrent.current = false;
    }
  }, [activeDragData]);
  useEffect(() => {
    console.log('simply currentShowIndex', currentShowIndex);
  }, [currentShowIndex]);
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
    setModalOpen(false);
  };
  const onDelImgVal = (index: number) => {
    const newList = signatureViewList.filter((_, i) => i !== index);
    setSignatureViewList(newList);
    if (newList.length === 0) {
      handleClose();
      setCurrentShowIndex(0);
    } else {
      let newCurrentShowIndex = currentShowIndex;
      if (currentShowIndex >= index && currentShowIndex !== 0) {
        newCurrentShowIndex--;
      }
      setCurrentShowIndex(newCurrentShowIndex);
    }
  };
  return (
    <FunctionalitySignPdfOperationDraggableView
      id={dragId}
      data={{ type: 'image', value: showImgValue }}
      onClick={() => setModalOpen(true)}
    >
      {!isHaveValue && (
        <Stack
          direction='row'
          flex={1}
          px={1}
          height='100%'
          alignItems='center'
          justifyContent='space-between'
          onClick={() => setModalOpen(true)}
        >
          <Box flex={1}>
            {signatureEmptyView || (
              <Typography
                sx={{
                  fontSize: {
                    xs: 10,
                    lg: 14,
                  },
                }}
              >
                {t(
                  'functionality__sign_pdf:components__sign_pdf__operation_view__your_sign',
                )}
              </Typography>
            )}
          </Box>
          <Typography
            color='text.secondary'
            sx={{
              fontWeight: 'bold',
              fontSize: {
                xs: 12,
                lg: 14,
              },
            }}
          >
            {t(
              'functionality__sign_pdf:components__sign_pdf__operation_view__add',
            )}
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
            onClick={() => {
              setModalOpen(true);
              handleClose();
            }}
          >
            {t(
              'functionality__sign_pdf:components__sign_pdf__operation_view__add',
            )}
          </Button>
        </Box>
      </Popover>
      {modalOpen && (
        <FunctionalitySignPdfSignatureModal
          modalOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onCreate={onCreateSignatureValue}
        />
      )}
    </FunctionalitySignPdfOperationDraggableView>
  );
};
export default FunctionalitySignPdfSignatureView;
