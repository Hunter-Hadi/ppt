import { Box, Button, Popover, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React, { FC, useState } from 'react'

import FunctionalitySignPdfOperationSignatureModal, {
  ISignatureType,
} from '@/features/functionality_sign_pdf/components/FunctionalitySignPdfOperationView/FunctionalitySignPdfOperationSignatureModal'

import FunctionalityCommonIcon from '../../FunctionalityCommonIcon'
interface IFunctionalityCommonSignaturePopoverViewMainProps {
  children?: React.ReactNode
  onAddImg?: (params: { value: string; width: number; height: number }) => void
}
const FunctionalityCommonSignaturePopoverViewMain: FC<
  IFunctionalityCommonSignaturePopoverViewMainProps
> = ({ children, onAddImg }) => {
  const { t } = useTranslation()
  const [signatureModalOpen, setModalSignatureOpen] = useState(false)

  const popoverId = 'pdf-signature-menu-popover-id'
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null) //Popover
  const [signatureViewList, setSignatureViewList] = useState<string[]>([])
  const open = Boolean(anchorEl)

  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleClick = (event) => {
    event.stopPropagation()
    event.preventDefault()
    setAnchorEl(event.currentTarget)
  }
  const onDelImgVal = (index: number) => {
    const newList = signatureViewList.filter((_, i) => i !== index)
    setSignatureViewList(newList)
  }
  const onCloseOperationSignatureModal = () => {
    setModalSignatureOpen(false)
  }
  const onCreateSignatureValue = (type: ISignatureType, value: string) => {
    //只做了第一个显示
    setSignatureViewList([...signatureViewList, value])
    setModalSignatureOpen(false)
  }
  const onSelectImg = async (value: string) => {
    const image = new Image()
    image.src = value
    await new Promise<void>((resolve) => {
      image.onload = () => {
        onAddImg &&
          onAddImg({
            value,
            width: image.width,
            height: image.height,
          })
        resolve()
      }
    })
  }
  return (
    <Box>
      <Box onClick={handleClick}>{children}</Box>
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
                  onSelectImg(item)
                  handleClose()
                }}
                style={{
                  height: 50,
                  flex: 1,
                  overflow: 'hidden',
                  objectFit: 'contain',
                }}
              />
              <FunctionalityCommonIcon
                color='action'
                onClick={() => {
                  onDelImgVal(index)
                }}
                name='DeleteForeverOutlined'
              />
            </Stack>
          ))}
          {signatureViewList.length === 0 && (
            <Stack
              alignItems='center'
              justifyContent='center'
              sx={{
                my: 3,
              }}
            >
              <Typography variant='custom' fontSize={12} color='primary.main'>
                暂无签名
              </Typography>
            </Stack>
          )}
          <Button
            variant='contained'
            fullWidth
            sx={{
              mt: 1,
            }}
            onClick={(event) => {
              setModalSignatureOpen(true)
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
          onClose={onCloseOperationSignatureModal}
          onCreate={onCreateSignatureValue}
        />
      )}
    </Box>
  )
}
export default FunctionalityCommonSignaturePopoverViewMain
