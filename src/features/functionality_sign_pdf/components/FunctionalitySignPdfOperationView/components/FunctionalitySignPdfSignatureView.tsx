import { Stack, Typography } from '@mui/material';
import { FC, Fragment } from 'react';

import FunctionalitySignPdfIcon from '../../FunctionalitySignPdfIcon';
import { FunctionalitySignPdfOperationDraggable } from '..';
interface IFunctionalitySignPdfSignatureViewProps {
  dragId: string;
  valueList: string[];
}
const FunctionalitySignPdfSignatureView: FC<
  IFunctionalitySignPdfSignatureViewProps
> = ({ dragId, valueList }) => {
  const isHaveValue = valueList && valueList.length > 0;
  return (
    <FunctionalitySignPdfOperationDraggable
      disabled={!isHaveValue}
      id={dragId}
      isPdfDrag={false}
      data={isHaveValue ? { type: 'base64', value: valueList[0] } : undefined}
    >
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        sx={{
          background: 'rgb(250, 250, 250)',
          borderWidth: '1 1 1 4',
          borderStyle: 'solid',
          borderColor:
            '#e8e8e8 rgb(232, 232, 232) rgb(232, 232, 232) rgb(255, 183, 0)',
          borderImage: 'initial',
          borderRadius: 2,
          padding: 1,
          cursor: 'pointer',
        }}
      >
        <FunctionalitySignPdfIcon name='DragIndicator' />
        {!isHaveValue && (
          <Fragment>
            <Typography
              sx={{
                fontSize: {
                  xs: 10,
                  lg: 14,
                },
              }}
            >
              Your Signature
            </Typography>
            <Typography
              color='text.secondary'
              sx={{
                fontWeight: 'bold',
                fontSize: {
                  xs: 12,
                  lg: 16,
                },
              }}
            >
              Add
            </Typography>
          </Fragment>
        )}
        {isHaveValue && (
          <img
            src={valueList[0]}
            style={{
              height: 45,
            }}
          />
        )}
      </Stack>
    </FunctionalitySignPdfOperationDraggable>
  );
};
export default FunctionalitySignPdfSignatureView;
