import { Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { useRecoilValue } from 'recoil';

import { FunctionalitySignPdfOperationOBjectAtom } from '../../store';
import { IFabricAddObjectType } from '../../utils/fabricjsTools';
import { IActiveDragData } from '../FunctionalitySignPdfDetail';
import FunctionalitySignPdfIcon from '../FunctionalitySignPdfIcon';
import FunctionalitySignPdfOperationDraggableView from './FunctionalitySignPdfOperationDraggableView';
import FunctionalitySignPdfOperationSignatureView from './FunctionalitySignPdfOperationSignatureView';

interface IFunctionalitySignPdfOperationView {
  activeDragData?: IActiveDragData;
  onClickAdd: (type: IFabricAddObjectType, value: string) => void;
}
/**
 * 用于选择签名的操作视图
 */
const FunctionalitySignPdfOperationViewMain: FC<
  IFunctionalitySignPdfOperationView
> = ({ activeDragData, onClickAdd }) => {
  const { t } = useTranslation();
  const pdfOperationOBject = useRecoilValue(
    FunctionalitySignPdfOperationOBjectAtom,
  );
  return (
    <Stack flexDirection='column'>
      <Stack direction='column' gap={2}>
        <FunctionalitySignPdfOperationSignatureView
          dragId='yourSignature'
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
          dragId='yourInitials'
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
          id='textField'
          onWrapClick={onClickAdd}
          data={{
            type: 'text-box',
            value: pdfOperationOBject.textField,
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
          id='dateField'
          onWrapClick={onClickAdd}
          data={{
            type: 'i-text',
            value: pdfOperationOBject.dateField,
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
          id='checkbox'
          onWrapClick={onClickAdd}
          data={{
            type: 'text',
            value: pdfOperationOBject.checkbox,
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
