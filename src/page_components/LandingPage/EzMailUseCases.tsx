import { Container, Grid, Stack, Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';

import CustomIcon, { ICustomIconType } from '@/components/CustomIcon';

interface IUseCaseItemProps {
  iconName: ICustomIconType;
  title: string;
  description: string;
}

const USECASES_CONTENT: IUseCaseItemProps[] = [
  {
    title: 'Customer support emails',
    iconName: 'SupportAgent',
    description: 'Save time, personalize responses',
  },
  {
    title: 'Sales emails',
    iconName: 'Suit',
    description: 'Speed up outreach, increase conversions',
  },
  {
    title: 'Social media inquiries',
    iconName: 'CircleNotiify',
    description: 'Quick response, brand consistency',
  },
  {
    title: 'Marketing emails',
    iconName: 'Trumpet',
    description: 'Effortless campaigns, higher engagement',
  },
  {
    title: 'Collaboration requests',
    iconName: 'HndShake',
    description: 'Streamline communication, build relationships',
  },
  {
    title: 'Referral requests',
    iconName: 'Star',
    description: 'Easy referral outreach, higher response rate',
  },
  {
    title: 'Follow-up emails',
    description: 'Efficient follow-ups, better engagement',
    iconName: 'ReplyAll',
  },
  {
    title: 'Networking emails',
    iconName: 'Groups',
    description: 'Professional outreach, build connections',
  },
];

const UseCaseItem: FC<IUseCaseItemProps> = (props) => {
  const { iconName, title, description } = props;
  const iconStyle = useMemo(
    () => ({ color: 'primary.main', fontSize: 32 }),
    [],
  );
  return (
    <Stack
      direction={'row'}
      spacing={2}
      sx={{
        p: {
          xs: 2,
          lg: 4,
        },
        border: '1px solid rgba(0, 0, 0, 0.08)',
        borderRadius: 1,
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      <CustomIcon icon={iconName} sx={iconStyle} />
      <Stack spacing={2}>
        <Typography variant={'body1'} fontWeight={700}>
          {title}
        </Typography>
        <Typography variant={'body2'}>{description}</Typography>
      </Stack>
    </Stack>
  );
};

const EzMailUseCases = () => {
  return (
    <Stack
      bgcolor={'#fff'}
      py={{
        xs: 2,
        lg: 6,
        xl: 9,
      }}
      px={{
        xs: 2,
        sm: 6,
        md: 10,
        lg: 12,
        xl: 15.5,
      }}
    >
      <Container maxWidth='lg'>
        <Typography
          textAlign={'center'}
          fontSize={32}
          fontWeight={700}
          component={'h2'}
          variant={'custom'}
          mb={{
            xs: 2,
            sm: 4,
          }}
        >
          Use cases
        </Typography>
        <Grid container spacing={{ xs: 2, md: 4 }}>
          {USECASES_CONTENT.map((caseItem, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <UseCaseItem {...caseItem} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Stack>
  );
};
export default EzMailUseCases;
