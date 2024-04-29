import { Box, Button, Popover, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';

import { FunctionalitySignPdfOperationOBjectAtom } from '../../store';
import { IFabricAddObjectType } from '../../utils/fabricjsTools';
import { IActiveDragData } from '../FunctionalitySignPdfDetail';
import FunctionalitySignPdfIcon from '../FunctionalitySignPdfIcon';
import FunctionalitySignPdfOperationDraggableView from './FunctionalitySignPdfOperationDraggableView';
import FunctionalitySignPdfOperationSignatureModal, {
  ISignatureType,
} from './FunctionalitySignPdfOperationSignatureModal';
interface IFunctionalitySignPdfSignatureViewProps {
  dragId: 'yourSignature' | 'yourInitials';
  onShowImgVal?: (val: string) => void;
  signatureEmptyView?: React.ReactNode;
  activeDragData?: IActiveDragData;
  onClickAdd: (type: IFabricAddObjectType, value: string) => void;
}

/**
 * 签名视图，在里面可以添加/删除签名/打开签名弹窗选择
 */
const FunctionalitySignPdfOperationSignatureView: FC<
  IFunctionalitySignPdfSignatureViewProps
> = ({
  dragId,
  onShowImgVal,
  signatureEmptyView,
  activeDragData,
  onClickAdd,
}) => {
  const [pdfOperationOBject, setPdfOperationOBject] = useRecoilState(
    FunctionalitySignPdfOperationOBjectAtom,
  );
  const signatureViewList = useMemo(
    () => pdfOperationOBject[dragId],
    [pdfOperationOBject[dragId]],
  );
  const { t } = useTranslation();

  const [signatureModalOpen, setModalSignatureOpen] = useState(false);
  const [currentShowIndex, setCurrentShowIndex] = useState(0);
  const isActiveCurrent = useRef(false);
  const isActiveModelCurrent = useRef(false);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null); //Popover
  const showImgValue = useMemo(
    () => pdfOperationOBject[dragId][currentShowIndex],
    [pdfOperationOBject[dragId], currentShowIndex],
  );
  const isHaveValue = !!showImgValue;
  const popoverId = 'pdf-signature-menu-popover-id';
  const open = Boolean(anchorEl);
  const setSignatureViewList = (list: string[]) => {
    setPdfOperationOBject({
      ...pdfOperationOBject,
      [dragId]: list,
    });
  };
  useEffect(() => {
    setPdfOperationOBject((oldObject) => {
      return {
        ...oldObject,
        index: {
          ...oldObject.index,
          [dragId]: currentShowIndex,
        },
      };
    });
  }, [currentShowIndex]);
  useEffect(() => {
    if (
      activeDragData?.dragType === 'start' &&
      activeDragData?.id === dragId &&
      !isHaveValue
    ) {
      isActiveCurrent.current = true;
    } else if (activeDragData?.dragType === 'end') {
      if (isActiveCurrent.current) {
        setModalSignatureOpen(true);
        isActiveModelCurrent.current = true;
      }
      isActiveCurrent.current = false;
    }
  }, [activeDragData]);
  useEffect(() => {
    if (signatureViewList[currentShowIndex] !== undefined) {
      onShowImgVal && onShowImgVal(signatureViewList[currentShowIndex]);
    }
  }, [currentShowIndex]);
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const onCreateSignatureValue = (type: ISignatureType, value: string) => {
    //只做了第一个显示
    setSignatureViewList([...signatureViewList, value]);
    setCurrentShowIndex(signatureViewList.length);
    setModalSignatureOpen(false);
    if (isActiveModelCurrent.current) {
      //用户因拖动空的触发这里的逻辑添加
      onClickAdd('image', value);
      isActiveModelCurrent.current = false;
    }
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
  const onClickChange = () => {
    if (showImgValue) {
      onClickAdd('image', showImgValue);
    } else {
      setModalSignatureOpen(true);
    }
  };
  return (
    <FunctionalitySignPdfOperationDraggableView
      id={dragId}
      dragDisabled={signatureModalOpen}
      data={{ type: 'image', value: showImgValue }}
      onIconClick={onClickChange}
    >
      {!isHaveValue && (
        <Stack
          direction='row'
          flex={1}
          px={1}
          height='100%'
          alignItems='center'
          justifyContent='space-between'
          onClick={onClickChange}
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
          onClick={onClickChange}
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
          horizontal: 240,
        }}
      >
        <Box
          sx={{
            width: 230,
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
              setModalSignatureOpen(true);
              handleClose();
            }}
          >
            {t(
              'functionality__sign_pdf:components__sign_pdf__operation_view__add',
            )}
          </Button>
        </Box>
      </Popover>
      {signatureModalOpen && (
        <FunctionalitySignPdfOperationSignatureModal
          open={signatureModalOpen}
          onClose={() => setModalSignatureOpen(false)}
          onCreate={onCreateSignatureValue}
        />
      )}
    </FunctionalitySignPdfOperationDraggableView>
  );
};
export default FunctionalitySignPdfOperationSignatureView;
