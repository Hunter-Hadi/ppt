import { SxProps } from '@mui/material';
import { FC } from 'react';
import { useRecoilValue } from 'recoil';

import { PricingPaymentTypeAtom } from '../store';
import { IPlanButtonProps } from './PlanButton';

const PlanCtaButton: FC<{
  sx?: SxProps;
  buttonProps?: Omit<IPlanButtonProps, 'renderType'>;
}> = ({ sx, buttonProps }) => {
  const paymentType = useRecoilValue(PricingPaymentTypeAtom);

  return null;

  // return (
  //   <Box>
  //     <PlanButton
  //       renderType={paymentType === 'yearly' ? 'elite_yearly' : 'elite'}
  //       sx={{
  //         width: '100%',
  //         ...sx,
  //       }}
  //       {...buttonProps}
  //     />
  //   </Box>
  // );

  // if (currentUserPlan === 'pro') {
  //   return (
  //     <Box>
  //       <PlanButton
  //         renderType={paymentType === 'yearly' ? 'elite_yearly' : 'elite'}
  //         sx={{
  //           width: '100%',
  //           ...sx,
  //         }}
  //         {...buttonProps}
  //       />
  //     </Box>
  //   );
  // }

  // return (
  //   <Box>
  //     <PlanButton
  //       renderType={paymentType === 'yearly' ? 'pro_yearly' : 'pro'}
  //       sx={{
  //         width: '100%',
  //         ...sx,
  //       }}
  //       {...buttonProps}
  //     />
  //   </Box>
  // );
};

export default PlanCtaButton;
