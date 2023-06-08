import { Button, Stack, Typography } from '@mui/material';

import CustomIcon from '@/components/CustomIcon';
import ProLink from '@/components/ProLink';
import { SIMPLY_TRENDS_APP_LINK } from '@/global_constants';

const AdSimplyTrendsBlock = () => {
  return (
    <Stack
      p={3}
      sx={{
        background:
          'linear-gradient(0deg, rgba(60, 140, 255, 0.08), rgba(60, 140, 255, 0.08)), #FFFFFF',
        borderRadius: 1,
      }}
    >
      <Stack direction={'row'} alignItems={'center'}>
        <CustomIcon
          icon={'SimplyTrends'}
          sx={{ width: 48, height: 48, mr: 2 }}
        />
        <Typography variant={'h1'} component={'h3'} color={'primary.main'}>
          Simply Trends
        </Typography>
      </Stack>
      <Typography
        mb={5}
        mt={2}
        variant={'h3'}
        component={'p'}
        color={'primary.main'}
      >
        Accurate product sales insights for any Shopify store
      </Typography>
      <ProLink
        href={`${SIMPLY_TRENDS_APP_LINK}/signup?invitationcode=SIMPLYSHOP`}
      >
        <Button variant={'contained'} fullWidth sx={{ height: 56 }}>
          <Typography variant={'buttonText'}>Start for free</Typography>
        </Button>
      </ProLink>
      <Typography
        textAlign={'center'}
        mt={1}
        variant={'caption'}
        color={'primary.main'}
      >
        No credit card required
      </Typography>
    </Stack>
  );
};
export default AdSimplyTrendsBlock;
