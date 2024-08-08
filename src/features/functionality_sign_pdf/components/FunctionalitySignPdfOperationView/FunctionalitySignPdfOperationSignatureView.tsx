/* eslint-disable no-debugger */
import { Box, Button, Popover, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'

import { FunctionalitySignPdfOperationOBjectAtom } from '@/features/functionality_common/components/FunctionalityCommonOperatePdfView/store/setOperateFabricCanvas'
import { IFabricAddObjectType } from '@/features/functionality_common/components/FunctionalityCommonOperatePdfView/types'
import FunctionalityCommonSignatureModal, {
  ISignatureType,
} from '@/features/functionality_common/components/FunctionalityCommonPopover/FunctionalityCommonSignaturePopoverView/FunctionalityCommonSignatureModal'
import useFunctionalityCommonIsMobile from '@/features/functionality_common/hooks/useFunctionalityCommonIsMobile'

import { IActiveDragData } from '../FunctionalitySignPdfDetail'
import FunctionalitySignPdfIcon from '../FunctionalitySignPdfIcon'
import FunctionalitySignPdfOperationDraggableView from './FunctionalitySignPdfOperationDraggableView'
interface IFunctionalitySignPdfSignatureViewProps {
  dragId: 'yourSignature' | 'yourInitials'
  activeDragData?: IActiveDragData
  onClickAdd: (type: IFabricAddObjectType, value: string) => void
}

/**
 * 签名视图，在里面可以添加/删除签名/打开签名弹窗选择
 */
const FunctionalitySignPdfOperationSignatureView: FC<
  IFunctionalitySignPdfSignatureViewProps
> = ({ dragId, activeDragData, onClickAdd }) => {
  const isMobile = useFunctionalityCommonIsMobile()
  const [pdfOperationOBject, setPdfOperationOBject] = useRecoilState(
    FunctionalitySignPdfOperationOBjectAtom,
  )
  const signatureViewList = useMemo(
    () => pdfOperationOBject[dragId],
    [pdfOperationOBject[dragId]],
  )
  const { t } = useTranslation()

  const [signatureModalOpen, setModalSignatureOpen] = useState(false)
  const [currentShowIndex, setCurrentShowIndex] = useState(0)
  const isActiveCurrent = useRef(false)
  const isActiveModelCurrent = useRef(false)

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null) //Popover
  const showImgValue = useMemo(
    () => pdfOperationOBject[dragId][currentShowIndex],
    [pdfOperationOBject[dragId], currentShowIndex],
  )
  const isHaveValue = !!showImgValue
  const popoverId = 'pdf-signature-menu-popover-id'
  const open = Boolean(anchorEl)
  const setSignatureViewList = (list: string[]) => {
    setPdfOperationOBject({
      ...pdfOperationOBject,
      [dragId]: list,
    })
  }
  useEffect(() => {
    setPdfOperationOBject((oldObject) => {
      return {
        ...oldObject,
        index: {
          ...oldObject.index,
          [dragId]: currentShowIndex,
        },
      }
    })
  }, [currentShowIndex])
  useEffect(() => {
    if (
      activeDragData?.dragType === 'start' &&
      activeDragData?.id === dragId &&
      !isHaveValue
    ) {
      isActiveCurrent.current = true
    } else if (activeDragData?.dragType === 'end') {
      if (isActiveCurrent.current) {
        setModalSignatureOpen(true)
        isActiveModelCurrent.current = true
      }
      isActiveCurrent.current = false
    }
  }, [activeDragData, dragId, isHaveValue])
  const handleClick = (event) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const onCreateSignatureValue = (type: ISignatureType, value: string) => {
    //只做了第一个显示
    setSignatureViewList([...signatureViewList, value])
    setCurrentShowIndex(signatureViewList.length)
    setModalSignatureOpen(false)
    if (isActiveModelCurrent.current) {
      //用户因拖动空的触发这里的逻辑添加
      onClickAdd('image', value)

      isActiveModelCurrent.current = false
    }
  }
  const onDelImgVal = (index: number) => {
    const newList = signatureViewList.filter((_, i) => i !== index)
    setSignatureViewList(newList)
    if (newList.length === 0) {
      handleClose()
      setCurrentShowIndex(0)
    } else {
      let newCurrentShowIndex = currentShowIndex
      if (currentShowIndex >= index && currentShowIndex !== 0) {
        newCurrentShowIndex--
      }
      setCurrentShowIndex(newCurrentShowIndex)
    }
  }
  const onClickChange = () => {
    if (showImgValue) {
      onClickAdd('image', showImgValue)
    } else {
      setModalSignatureOpen(true)
    }
  }
  const onCloseOperationSignatureModal = () => {
    isActiveModelCurrent.current = false
    setModalSignatureOpen(false)
  }
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
            {dragId === 'yourSignature' && (
              <Stack
                direction='row'
                gap={1}
                alignItems='center'
                justifyContent={isMobile ? 'center' : 'flex-start'}
              >
                <FunctionalitySignPdfIcon name='TextFields' />
                {!isMobile && (
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
              </Stack>
            )}
            {dragId === 'yourInitials' && (
              <Stack
                direction='row'
                gap={1}
                alignItems='center'
                justifyContent={isMobile ? 'center' : 'flex-start'}
              >
                <FunctionalitySignPdfIcon name='Abc' />
                {!isMobile && (
                  <Typography
                    sx={{
                      fontSize: {
                        xs: 10,
                        lg: 14,
                      },
                    }}
                  >
                    {t(
                      'functionality__sign_pdf:components__sign_pdf__operation_view__your_initials',
                    )}
                  </Typography>
                )}
              </Stack>
            )}
          </Box>
          {!isMobile && (
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
          )}
        </Stack>
      )}
      {isHaveValue && (
        <img
          onClick={onClickChange}
          src={showImgValue}
          style={{
            width: isMobile ? '50px' : 'calc(100% - 50px)',
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
            width: isMobile ? 15 : 30,
          }}
          alignItems='center'
          justifyContent='center'
          onClick={handleClick}
        >
          <FunctionalitySignPdfIcon color='action' name='KeyboardArrowDown' />
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
                  setCurrentShowIndex(index)
                  handleClose()
                }}
                style={{
                  height: 50,
                  flex: 1,
                  overflow: 'hidden',
                  objectFit: 'contain',
                }}
              />
              <FunctionalitySignPdfIcon
                color='action'
                onClick={() => {
                  onDelImgVal(index)
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
              setModalSignatureOpen(true)
              handleClose()
            }}
          >
            {t(
              'functionality__sign_pdf:components__sign_pdf__operation_view__add',
            )}
          </Button>
        </Box>
      </Popover>
      {signatureModalOpen && (
        <FunctionalityCommonSignatureModal
          onClose={onCloseOperationSignatureModal}
          onCreate={onCreateSignatureValue}
        />
      )}
    </FunctionalitySignPdfOperationDraggableView>
  )
}
export default FunctionalitySignPdfOperationSignatureView
