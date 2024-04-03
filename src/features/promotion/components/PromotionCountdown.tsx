import { Box, Stack, SxProps, Typography } from '@mui/material';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

import { useTranslation } from 'next-i18next';
import React, { FC, useEffect, useState } from 'react';

import { getPromotionTimeWithCycle } from '@/features/promotion/utils';
const PROMOTION_TARGET_DATE = getPromotionTimeWithCycle();

interface IPlanCouponCardProps {
  targetDate?: string;
  sx?: SxProps;
  spacing?: number;
  title?: React.ReactNode;
  CountdownTimeBoxSx?: SxProps;
}

const PromotionCountdown: FC<IPlanCouponCardProps> = ({
  targetDate = PROMOTION_TARGET_DATE,
  sx,
  spacing = 2,
  title,
  CountdownTimeBoxSx,
}) => {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = dayjs().utc();
      const difference = dayjs(targetDate).utc().diff(now);
      if (difference <= 0) {
        clearInterval(interval);
      } else {
        const days = String(
          Math.floor(difference / (1000 * 60 * 60 * 24)),
        ).padStart(2, '0');
        const hours = String(
          Math.floor((difference / (1000 * 60 * 60)) % 24),
        ).padStart(2, '0');
        const minutes = String(
          Math.floor((difference / 1000 / 60) % 60),
        ).padStart(2, '0');
        const seconds = String(Math.floor((difference / 1000) % 60)).padStart(
          2,
          '0',
        );

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <Stack
      justifyContent={'center'}
      alignItems='center'
      spacing={spacing}
      sx={sx}
    >
      {title || (
        <Typography
          className='countdown-title'
          variant='custom'
          sx={{
            color: '#DB4437',
            fontSize: 24,
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          {t('promotion__limited_time_offer')}
        </Typography>
      )}
      <Stack
        direction={'row'}
        justifyContent='center'
        alignItems='center'
        spacing={1.2}
      >
        <TimeBox
          sx={CountdownTimeBoxSx}
          time={timeLeft.days}
          label={t('common:days')}
        />
        <TimeDivider />
        <TimeBox
          sx={CountdownTimeBoxSx}
          time={timeLeft.hours}
          label={t('common:hours')}
        />
        <TimeDivider />
        <TimeBox
          sx={CountdownTimeBoxSx}
          time={timeLeft.minutes}
          label={t('common:mins')}
        />
        <TimeDivider />
        <TimeBox
          sx={CountdownTimeBoxSx}
          time={timeLeft.seconds}
          label={t('common:secs')}
        />
      </Stack>
    </Stack>
  );
};

const TimeBox: FC<{ sx?: SxProps; time: string; label: string }> = ({
  time,
  label,
  sx,
}) => {
  return (
    <Stack>
      <Box
        className='countdown-time'
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 1,
          borderRadius: 1,
          bgcolor: '#9065B0',
          color: '#fff',
          fontSize: 32,
          fontWeight: 700,
          lineHeight: 1.25,
          ...sx,
        }}
      >
        {time}
      </Box>
      <Typography
        className='countdown-label'
        variant='custom'
        fontSize={16}
        lineHeight={1.5}
        color='text.primary'
        textAlign={'center'}
      >
        {label}
      </Typography>
    </Stack>
  );
};

const TimeDivider = () => {
  return (
    <Box
      className='countdown-divider'
      sx={{
        fontSize: 32,
        fontWeight: 700,
        lineHeight: 1.25,
        color: 'text.primary',
        position: 'relative',
        top: -12,
      }}
    >
      :
    </Box>
  );
};

export default PromotionCountdown;
