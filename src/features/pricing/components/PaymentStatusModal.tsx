import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { capitalize } from 'lodash-es';
import { FC, useEffect, useState } from 'react';

import CustomModal from '@/components/CustomModal';
import PlanButton from '@/features/pricing/components/PlanButton';
import { getLocalStorage, removeLocalStorage } from '@/utils/localStorage';

import { TEMPORARY_PAYMENT_PLAN_TYPE } from '../constant';
import { RENDER_PLAN_TYPE } from '../type';
import FeatureQuickVideoList from './FeatureQuickVideoList';
import MorePayWayPanel from './MorePayWayPanel';

interface IProps {
  type: 'successful' | 'failed';
  open: boolean;
  onClose: () => void;
}

const PaymentStatusModal: FC<IProps> = (props) => {
  const { type, open, onClose } = props;

  const [renderType, setRenderPlan] = useState<RENDER_PLAN_TYPE>('pro');
  const [planName, setPlanName] = useState<string>('Pro');

  const handleClose = () => {
    onClose && onClose();
    removeLocalStorage(TEMPORARY_PAYMENT_PLAN_TYPE);
  };

  useEffect(() => {
    if (open) {
      const paymentType = getLocalStorage(
        TEMPORARY_PAYMENT_PLAN_TYPE,
      ) as RENDER_PLAN_TYPE;
      if (paymentType) {
        const planName = paymentType.split('_')[0];
        setPlanName(capitalize(planName));
        setRenderPlan(paymentType);
      }
    }
  }, [open]);

  const renderContent = () => {
    if (type === 'successful') {
      // successful
      return (
        <Stack p={4} spacing={1} position={'relative'}>
          <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography variant='h6'>🎉 Welcome to MaxAI {planName}</Typography>
          <Typography variant='body2'>
            You have successfully upgraded to MaxAI {planName}. Enjoy unlimited
            usage!
          </Typography>
          {/* <FeatureHighlightVideos maxHeight={370} /> */}
          <FeatureQuickVideoList planName={planName} />
          <Button
            variant='contained'
            onClick={handleClose}
            sx={{
              fontSize: 16,
              height: 48,
              width: '100%',
              mt: '16px !important',
            }}
          >
            Continue
          </Button>
        </Stack>
      );
    }

    // failed
    return (
      <Stack
        p={4}
        spacing={2}
        alignItems='center'
        justifyContent='center'
        position={'relative'}
      >
        <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography variant='h6'>Payment Failed</Typography>
        <Typography variant='body2'>
          Stripe failed to process your payment request.
        </Typography>

        {/* only pro plan now */}
        <PlanButton
          variant='outlined'
          renderType={renderType}
          btnText='Try again with a different card'
          sx={{
            width: '100%',
            height: 48,
            fontSize: 16,
            fontWeight: 600,
          }}
          morePayWay={false}
        />
        <MorePayWayPanel sx={{ py: 0 }} />
      </Stack>
    );
  };

  return (
    <CustomModal
      show={open}
      onClose={handleClose}
      closeBtn={false}
      width={type === 'successful' ? 800 : 400}
      height={'auto'}
      sx={{
        mt: '15vh',
      }}
    >
      {renderContent()}
    </CustomModal>
  );
};

export default PaymentStatusModal;
