import { Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';

import { IActiveDragData } from '../FunctionalitySignPdfDetail';
import FunctionalitySignPdfIcon from '../FunctionalitySignPdfIcon';
import FunctionalitySignPdfOperationDraggableView from './FunctionalitySignPdfShowView';
import FunctionalitySignPdfSignatureView from './FunctionalitySignPdfSignatureView';

interface IFunctionalitySignPdfOperationView {
  activeDragData?: IActiveDragData;
}
const FunctionalitySignPdfOperationView: FC<
  IFunctionalitySignPdfOperationView
> = ({ activeDragData }) => {
  const { t } = useTranslation();

  return (
    <Stack flexDirection='column'>
      <Stack direction='column' gap={2}>
        <FunctionalitySignPdfSignatureView
          dragId={'draggable-0'}
          activeDragData={activeDragData}
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
        <FunctionalitySignPdfSignatureView
          dragId={'draggable-1'}
          activeDragData={activeDragData}
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
export default FunctionalitySignPdfOperationView;
