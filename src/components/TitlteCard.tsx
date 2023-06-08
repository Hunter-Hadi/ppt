import { Button, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

import ProLink from '@/components/ProLink';
import { SIMPLY_TRENDS_DEMOPAGE_LINK } from '@/global_constants';

export interface IFeaturePageFooterProps {
  title?: string;
  description?: string;
  button?: {
    text: string;
    subText?: string;
    href: string;
  };
}

const TitleCard: FC<IFeaturePageFooterProps> = (props) => {
  const {
    title = 'Grow Your Business Today',
    description = 'SimplyTrends makes your life easier, and generates profits for your business.',
    button = {
      text: 'Start for free',
      subText: 'No credit card required',
      href: '',
    },
  } = props;
  const { query } = useRouter();
  return (
    <Stack
      sx={{
        px: { xs: 2 },
        py: {
          xs: 2,
          sm: 4,
          md: 6,
          lg: 8,
        },
        bgcolor: 'primary.main',
        alignItems: 'center',
      }}
    >
      <Typography
        variant={'custom'}
        sx={{
          fontSize: 40,
          color: '#FFF',
          fontWeight: 'bold',
          textAlign: 'center',
          whiteSpace: 'pre-line',
        }}
      >
        {title}
      </Typography>
      <Typography
        variant={'custom'}
        component={'p'}
        sx={{
          color: '#FFF',
          fontSize: 20,
          lineHeight: 1.6,
          textAlign: 'center',
          whiteSpace: 'pre-wrap',
          mt: 3,
          mb: 4,
        }}
      >
        {description}
      </Typography>
      <ProLink
        href={
          button.href ||
          `${SIMPLY_TRENDS_DEMOPAGE_LINK}/?invitationcode=${
            query.invitationcode ?? 'simplyshop'
          }`
        }
      >
        <Button
          variant='contained'
          disableElevation
          sx={{
            bgcolor: '#FFF',
            px: 9,
            py: 2,
            '&:hover': {
              bgcolor: '#ECF4FF',
            },
          }}
        >
          <Typography
            color='primary.main'
            variant='body2'
            fontSize={18}
            fontWeight={700}
          >
            {button.text}
          </Typography>
        </Button>
      </ProLink>
      <Typography
        variant={'caption'}
        fontSize={14}
        textAlign={'center'}
        mt={1}
        color={'white'}
      >
        {button.subText}
      </Typography>
    </Stack>
  );
};

export default TitleCard;
