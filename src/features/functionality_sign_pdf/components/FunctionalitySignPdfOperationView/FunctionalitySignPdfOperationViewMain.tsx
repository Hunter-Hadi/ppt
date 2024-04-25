import { Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';

import { IActiveDragData } from '../FunctionalitySignPdfDetail';
import FunctionalitySignPdfIcon from '../FunctionalitySignPdfIcon';
import FunctionalitySignPdfOperationDraggableView from './FunctionalitySignPdfOperationDraggableView';
import FunctionalitySignPdfOperationSignatureView from './FunctionalitySignPdfOperationSignatureView';

interface IFunctionalitySignPdfOperationView {
  activeDragData?: IActiveDragData;
  onClickAdd: (type: string, value: string) => void;
}
/**
 * 用于选择签名的操作视图
 */
const FunctionalitySignPdfOperationViewMain: FC<
  IFunctionalitySignPdfOperationView
> = ({ activeDragData, onClickAdd }) => {
  const { t } = useTranslation();

  return (
    <Stack flexDirection='column'>
      <Stack direction='column' gap={2}>
        <FunctionalitySignPdfOperationSignatureView
          dragId={'draggable-0'}
          activeDragData={activeDragData}
          onClickAdd={onClickAdd}
          signatureEmptyView={
            <Stack direction='row' gap={1} alignItems='center'>
              <FunctionalitySignPdfIcon name='TextFields' />
              <Typography
                sx={{
                  fontSize: {
                    xs: 10,
                    lg: 16,
                  },
                }}
              >
                {t(
                  'functionality__sign_pdf:components__sign_pdf__operation_view__your_sign',
                )}
              </Typography>
            </Stack>
          }
        />
        <FunctionalitySignPdfOperationSignatureView
          dragId={'draggable-1'}
          activeDragData={activeDragData}
          onClickAdd={onClickAdd}
          signatureEmptyView={
            <Stack direction='row' gap={1} alignItems='center'>
              <FunctionalitySignPdfIcon name='Abc' />
              <Typography
                sx={{
                  fontSize: {
                    xs: 10,
                    lg: 16,
                  },
                }}
              >
                {t(
                  'functionality__sign_pdf:components__sign_pdf__operation_view__your_initials',
                )}
              </Typography>
            </Stack>
          }
        />
        <FunctionalitySignPdfOperationDraggableView
          id={'draggable-2'}
          onWrapClick={onClickAdd}
          data={{
            type: 'textbox',
            value: 'Type something…',
          }}
        >
          <Stack direction='row' mx={1} gap={1} flex={1} alignItems='center'>
            <FunctionalitySignPdfIcon name='Title' />
            <Typography
              sx={{
                fontSize: {
                  xs: 10,
                  lg: 16,
                },
              }}
            >
              {t(
                'functionality__sign_pdf:components__sign_pdf__operation_view__text_field',
              )}
            </Typography>
          </Stack>
        </FunctionalitySignPdfOperationDraggableView>
        <FunctionalitySignPdfOperationDraggableView
          id={'draggable-3'}
          onWrapClick={onClickAdd}
          data={{
            type: 'i-text',
            value: dayjs().format('MM/DD/YYYY'),
          }}
        >
          <Stack direction='row' mx={1} gap={1} flex={1} alignItems='center'>
            <FunctionalitySignPdfIcon name='CalendarMonthOutlined' />
            <Typography
              sx={{
                fontSize: {
                  xs: 10,
                  lg: 16,
                },
              }}
            >
              {t(
                'functionality__sign_pdf:components__sign_pdf__operation_view__date_field',
              )}
            </Typography>
          </Stack>
        </FunctionalitySignPdfOperationDraggableView>
        <FunctionalitySignPdfOperationDraggableView
          id={'draggable-4'}
          onWrapClick={onClickAdd}
          data={{
            type: 'text',
            value: '✔',
          }}
        >
          <Stack direction='row' mx={1} gap={1} flex={1} alignItems='center'>
            <FunctionalitySignPdfIcon name='Check' />
            <Typography
              sx={{
                fontSize: {
                  xs: 10,
                  lg: 16,
                },
              }}
            >
              {t(
                'functionality__sign_pdf:components__sign_pdf__operation_view__checkbox',
              )}
            </Typography>
          </Stack>
        </FunctionalitySignPdfOperationDraggableView>
      </Stack>
    </Stack>
  );
};
export default FunctionalitySignPdfOperationViewMain;
