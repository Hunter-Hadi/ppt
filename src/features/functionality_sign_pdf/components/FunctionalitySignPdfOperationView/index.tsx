import { Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import Head from 'next/head';
import { FC } from 'react';

import FunctionalitySignPdfIcon from '../FunctionalitySignPdfIcon';
import FunctionalitySignPdfOperationDraggableView from './components/FunctionalitySignPdfShowView';
import FunctionalitySignPdfSignatureView from './components/FunctionalitySignPdfSignatureView';

interface IFunctionalitySignPdfOperationView {}
const FunctionalitySignPdfOperationView: FC<
  IFunctionalitySignPdfOperationView
> = () => {
  return (
    <Stack flexDirection='column'>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='true'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap'
          rel='stylesheet'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=La+Belle+Aurore&display=swap'
          rel='stylesheet'
        ></link>
        <link
          href='https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Dancing+Script:wght@400..700&family=La+Belle+Aurore&display=swap'
          rel='stylesheet'
        ></link>
      </Head>
      <Stack direction='column' gap={2}>
        <FunctionalitySignPdfSignatureView
          dragId={'draggable-0'}
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
                Your Signature
              </Typography>
            </Stack>
          }
        />
        <FunctionalitySignPdfSignatureView
          dragId={'draggable-1'}
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
                Your Initials
              </Typography>
            </Stack>
          }
        />
        <FunctionalitySignPdfOperationDraggableView
          id={'draggable-2'}
          data={{
            type: 'text',
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
              Text Field
            </Typography>
          </Stack>
        </FunctionalitySignPdfOperationDraggableView>
        <FunctionalitySignPdfOperationDraggableView
          id={'draggable-3'}
          data={{
            type: 'text',
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
              Date Field
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
              Checkbox
            </Typography>
          </Stack>
        </FunctionalitySignPdfOperationDraggableView>
      </Stack>
    </Stack>
  );
};
export default FunctionalitySignPdfOperationView;
