import { Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'

import { FunctionalitySignPdfOperationOBjectAtom } from '@/features/functionality_common/components/FunctionalityCommonOperatePdfView/store/setOperateFabricCanvas'
import { IFabricAddObjectType } from '@/features/functionality_common/components/FunctionalityCommonOperatePdfView/types'
import useFunctionalityCommonIsMobile from '@/features/functionality_common/hooks/useFunctionalityCommonIsMobile'

import { IActiveDragData } from '../FunctionalitySignPdfDetail'
import FunctionalitySignPdfIcon from '../FunctionalitySignPdfIcon'
import FunctionalitySignPdfOperationDraggableView from './FunctionalitySignPdfOperationDraggableView'
import FunctionalitySignPdfOperationSignatureView from './FunctionalitySignPdfOperationSignatureView'

interface IFunctionalitySignPdfOperationView {
  activeDragData?: IActiveDragData
  onClickAdd: (type: IFabricAddObjectType, value: string) => void
}
/**
 * 用于选择签名的操作视图
 */
const FunctionalitySignPdfOperationViewMain: FC<
  IFunctionalitySignPdfOperationView
> = ({ activeDragData, onClickAdd }) => {
  const isMobile = useFunctionalityCommonIsMobile()
  const { t } = useTranslation()
  const pdfOperationOBject = useRecoilValue(
    FunctionalitySignPdfOperationOBjectAtom,
  )
  const operationList = [
    {
      key: 'textField',
      value: t(pdfOperationOBject.textField),
      icon: 'Title',
      type: 'text-box',
      tips: t(
        'functionality__sign_pdf:components__sign_pdf__operation_view__text_field',
      ),
    },
    {
      key: 'dateField',
      value: pdfOperationOBject.dateField,
      icon: 'CalendarMonthOutlined',
      type: 'i-text',
      tips: t(
        'functionality__sign_pdf:components__sign_pdf__operation_view__date_field',
      ),
    },
    {
      key: 'checkbox',
      value: pdfOperationOBject.checkbox,
      icon: 'Check',
      type: 'text',
      tips: t(
        'functionality__sign_pdf:components__sign_pdf__operation_view__checkbox',
      ),
    },
  ]
  return (
    <Stack
      id='functionality-sign-pdf-operation-view-main'
      flexDirection={isMobile ? 'row' : 'column'}
    >
      <Stack
        direction={isMobile ? 'row' : 'column'}
        gap={isMobile ? 1 : 2}
        sx={{
          flex: 1,
          '> div': {
            flex: 1,
          },
        }}
      >
        <FunctionalitySignPdfOperationSignatureView
          dragId='yourSignature'
          activeDragData={activeDragData}
          onClickAdd={onClickAdd}
        />
        <FunctionalitySignPdfOperationSignatureView
          dragId='yourInitials'
          activeDragData={activeDragData}
          onClickAdd={onClickAdd}
        />
        {operationList.map((operationItem) => (
          <FunctionalitySignPdfOperationDraggableView
            id={operationItem.key}
            key={operationItem.key}
            onWrapClick={onClickAdd}
            data={{
              type: operationItem.type as IFabricAddObjectType,
              value: operationItem.value,
            }}
          >
            <Stack
              direction='row'
              mx={1}
              gap={isMobile ? 0 : 1}
              flex={1}
              alignItems='center'
              justifyContent={isMobile ? 'center' : 'flex-start'}
            >
              <FunctionalitySignPdfIcon name={operationItem.icon} />
              {!isMobile && (
                <Typography
                  sx={{
                    fontSize: {
                      xs: 10,
                      lg: 14,
                    },
                  }}
                >
                  {operationItem.tips}
                </Typography>
              )}
            </Stack>
          </FunctionalitySignPdfOperationDraggableView>
        ))}
      </Stack>
    </Stack>
  )
}
export default FunctionalitySignPdfOperationViewMain
