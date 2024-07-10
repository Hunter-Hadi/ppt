import {
  Box,
  CircularProgress,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import { PDFDocument } from 'pdf-lib'
import React from 'react'
import { FC, useCallback, useMemo, useState } from 'react'

import {
  FunctionalityCommonButtonListView,
  IButtonConfig,
} from '@/features/functionality_common/components/FunctionalityCommonButtonListView'
import { downloadUrl } from '@/features/functionality_common/utils/functionalityCommonDownload'
import { functionalityCommonFileNameRemoveAndAddExtension } from '@/features/functionality_common/utils/functionalityCommonIndex'
type IPositionValue =
  | 'bottom'
  | 'bottomLeft'
  | 'bottomRight'
  | 'top'
  | 'topLeft'
  | 'topRight'

interface IFunctionalityNumberPagesDetail {
  file: File
  onRemoveFile: () => void
}

const FunctionalityNumberPagesDetail: FC<IFunctionalityNumberPagesDetail> = ({
  file,
  onRemoveFile,
}) => {
  const { t } = useTranslation()

  const [positionValue, setPositionValue] = useState<IPositionValue>('bottom') //设置 添加的位置
  const [marginsNumberValue, setMarginsNumberValueValue] = useState<number>(35) //设置边距
  const [startNumberValue, setStartNumberValue] = useState(1) //设置开始的数字
  const [isLoading, setIsLoading] = useState<boolean>(false) //设置加载状态

  const onAddPagesNumberAndDownload = useCallback(async () => {
    try {
      setIsLoading(true)
      const buff = await file.arrayBuffer() // Uint8Array
      const pdfDocument = await PDFDocument.load(buff) //加载pdf文件
      for (let index = 0; index < pdfDocument.getPages().length; index++) {
        const page = pdfDocument.getPage(index) //获取页面
        const { width, height } = page.getSize() //获取页面的宽高
        const fontSize = 12
        const textWidth = startNumberValue.toString().length * (fontSize / 1.8) //大概的计算插入文本的宽度
        let x = 50,
          y = 0
        switch (positionValue) {
          case 'bottom':
            //位于底部的中心位置
            x = width / 2 - textWidth / 2 //中心位置-文字宽度的一半
            y = marginsNumberValue //用户设置的边距
            break
          case 'bottomLeft':
            //位于底部的中心位置
            x = marginsNumberValue //用户设置的边距
            y = marginsNumberValue //用户设置的边距
            break
          case 'bottomRight':
            //位于底部的中心位置
            x = width - marginsNumberValue - textWidth //宽度-边距-文字宽度
            y = marginsNumberValue //用户设置的边距
            break
          case 'top':
            //位于底部的中心位置
            x = width / 2 - textWidth / 2 //中心位置-文字宽度的一半
            y = height - marginsNumberValue //高度-字体大小-边距
            break
          case 'topLeft':
            //位于底部的中心位置
            x = marginsNumberValue //用户设置的边距
            y = height - marginsNumberValue //高度-边距
            break
          case 'topRight':
            //位于底部的中心位置
            x = width - marginsNumberValue - textWidth //宽度-边距-文字宽度
            y = height - marginsNumberValue //高度-边距
            break
        }
        page.drawText((startNumberValue + index).toString(), {
          x: x,
          y: y,
          size: fontSize,
        }) //插入文本
      }
      const blobData = await pdfDocument.save() //保存pdf文件
      const fileName = functionalityCommonFileNameRemoveAndAddExtension(
        file.name,
      ) //获取文件名
      downloadUrl(blobData, fileName) //下载文件
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log('onAddPagesNumberAndDownload error :', error)
    }
  }, [file, positionValue, marginsNumberValue, startNumberValue])
  //按钮配置列表
  const buttonConfigs: IButtonConfig[] = useMemo(
    () => [
      {
        type: 'button',
        buttonProps: {
          children: (
            <Stack gap={2} direction='row' alignItems='center'>
              {isLoading && <CircularProgress size={20} />}
              <Box>
                {t(
                  'functionality__pdf_number_pages:components__pdf_number_pages__main_add_and_download',
                )}
              </Box>
            </Stack>
          ),
          variant: 'contained',
          disabled: isLoading,
          onClick: onAddPagesNumberAndDownload,
        },
      },
      {
        type: 'button',
        buttonProps: {
          children: t(
            'functionality__pdf_number_pages:components__pdf_number_pages__main_choose_another_file',
          ),
          variant: 'outlined',
          disabled: isLoading,
          color: 'error',
          onClick: () => {
            onRemoveFile()
          },
        },
      },
    ],
    [isLoading, file, t, onAddPagesNumberAndDownload],
  )

  //圆形的9宫格网格视图
  const withCircleGridView = useCallback(
    (
      activeType: string = 'top',
      viewSize: number = 150,
      onChange: (viewPosition: IPositionValue) => void,
    ) => {
      const viewPositionsList: IPositionValue[][] = [
        ['topLeft', 'top', 'topRight'],
        ['bottomLeft', 'bottom', 'bottomRight'],
      ]
      const borderColor = '#d1d1d1'
      return (
        <Stack
          direction='column'
          justifyContent='space-between'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            border: `1px solid ${borderColor}`,
            backgroundColor: '#f9f9f9',
            height: viewSize,
            width: viewSize,
          }}
        >
          {viewPositionsList.map((viewPositions, index) => (
            <Stack
              direction='row'
              justifyContent='space-between'
              key={index}
              sx={{
                height: '33%',
                borderBottom: index === 0 ? `1px solid ${borderColor}` : '',
                borderTop: index === 1 ? `1px solid ${borderColor}` : '',
              }}
            >
              {viewPositions.map((viewPosition, index) => (
                <Box
                  onClick={() => onChange(viewPosition)}
                  key={index}
                  sx={{
                    cursor: 'pointer',
                    width: '33%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRight: index !== 2 ? `1px solid ${borderColor}` : '',
                    backgroundColor: '#fff',
                  }}
                >
                  <Stack
                    direction='column'
                    alignItems='center'
                    justifyContent='center'
                    sx={{
                      width: '40%',
                      height: '40%',
                      borderRadius: '50%',
                      border:
                        viewPosition === activeType
                          ? '2px solid #9065B0'
                          : '1px solid gray',
                    }}
                  >
                    <Box
                      sx={{
                        width: 'calc(100% - 3px)',
                        height: 'calc(100% - 3px)',
                        borderRadius: '50%',
                        bgcolor:
                          viewPosition === activeType ? 'primary.main' : '',
                      }}
                    />
                  </Stack>
                </Box>
              ))}
            </Stack>
          ))}
        </Stack>
      )
    },
    [],
  )
  return (
    <Box sx={{ width: '100%' }}>
      <Grid container justifyContent='center' gap={1}>
        <Grid item>
          <Box sx={{ marginBottom: 0.5 }}>
            <Typography variant='custom' fontSize={16}>
              {t(
                'functionality__pdf_number_pages:components__pdf_number_pages__main_position',
              )}
            </Typography>
          </Box>
          {withCircleGridView(positionValue, 150, (value) => {
            setPositionValue(value)
          })}
        </Grid>
        <Grid
          item
          sx={{
            flex: 1,
          }}
          lg={4}
          display='flex'
          direction='column'
          justifyContent='space-between'
        >
          <Box sx={{ width: '100%' }}>
            <Box sx={{ marginBottom: 0.5 }}>
              <Typography variant='custom' fontSize={16}>
                {t(
                  'functionality__pdf_number_pages:components__pdf_number_pages__main_margins',
                )}
              </Typography>
            </Box>
            <Select
              sx={{
                width: '100%',
              }}
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={marginsNumberValue}
              size='small'
              onChange={(event) =>
                setMarginsNumberValueValue(event.target.value as number)
              }
            >
              <MenuItem value={15}>
                {t(
                  'functionality__pdf_number_pages:components__pdf_number_pages__main_margins_narrow',
                )}
              </MenuItem>
              <MenuItem value={35}>
                {t(
                  'functionality__pdf_number_pages:components__pdf_number_pages__main_margins_default',
                )}
              </MenuItem>
              <MenuItem value={65}>
                {t(
                  'functionality__pdf_number_pages:components__pdf_number_pages__main_margins_wide',
                )}
              </MenuItem>
            </Select>
          </Box>
          <Box>
            <Box sx={{ marginBottom: 0.5 }}>
              <Typography variant='custom' fontSize={16}>
                {t(
                  'functionality__pdf_number_pages:components__pdf_number_pages__main_start_numbering_at',
                )}
              </Typography>
            </Box>
            <Box>
              <TextField
                sx={{
                  width: '100%',
                }}
                size='small'
                type='number'
                placeholder={t(
                  'functionality__pdf_number_pages:components__pdf_number_pages__main_input_start_numbering_at',
                )}
                value={startNumberValue}
                onChange={(event) =>
                  setStartNumberValue(Number(event.target.value))
                }
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box mt={5}>
        <FunctionalityCommonButtonListView
          buttonConfigs={buttonConfigs}
          gridBreakpoints={{ xs: 12, md: 6, lg: 3 }}
        />
      </Box>
    </Box>
  )
}
export default FunctionalityNumberPagesDetail
