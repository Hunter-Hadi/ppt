import { Box, Checkbox, Stack } from '@mui/material'
import React from 'react'
import { FC } from 'react'

import FunctionalityCommonImage from '@/features/functionality_common/components/FunctionalityCommonImage'
import {
  MOBILE_CARD_WIDTH,
  PC_CARD_WIDTH,
} from '@/features/functionality_common/constants'
import useFunctionalityCommonIsMobile from '@/features/functionality_common/hooks/useFunctionalityCommonIsMobile'

interface IFunctionalityImageData {
  id: string
  imageUrlString: string
  isSelect: boolean
}
interface IFunctionalityImageList {
  scale?: number
  imageList: IFunctionalityImageData[]
  onClickImage: (image: IFunctionalityImageData) => void
  disabled?: boolean
}

const FunctionalityImageList: FC<IFunctionalityImageList> = ({
  imageList,
  scale = 2,
  onClickImage,
  disabled,
}) => {
  const isMobile = useFunctionalityCommonIsMobile()

  return (
    <Stack
      direction='row'
      justifyContent='center'
      flexWrap='wrap'
      my={3}
      gap={2}
      sx={{
        position: 'relative',
        minHeight: 200,
      }}
    >
      {imageList.map((imageInfo, index) => (
        <FunctionalityCommonImage
          key={imageInfo.id}
          name={String(index + 1)}
          imageInfo={imageInfo}
          wrapSx={{
            width:
              scale * (isMobile ? MOBILE_CARD_WIDTH / 4 : PC_CARD_WIDTH / 4),
          }}
          onClick={() => !disabled && onClickImage(imageInfo)}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
            }}
          >
            <Checkbox disabled={disabled} checked={imageInfo.isSelect} />
          </Box>
        </FunctionalityCommonImage>
      ))}
    </Stack>
  )
}
export default FunctionalityImageList
