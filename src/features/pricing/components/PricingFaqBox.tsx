import { SxProps } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import React, { FC } from 'react';

import ProLink from '@/components/ProLink';
import { WWW_PROJECT_LINK } from '@/global_constants';
import { FAQ_PRICING } from '@/global_constants/faq/pricing';
import FAQList from '@/page_components/FAQList';

interface IPricingFaqBoxProps {
  sx?: SxProps;
}

const PricingFaqBox: FC<IPricingFaqBoxProps> = ({ sx }) => {
  const { t } = useTranslation();
  return (
    <Box sx={sx}>
      <Typography
        variant='h4'
        component={'h2'}
        textAlign={'center'}
        fontWeight={'bold'}
        mb={4}
        id='FAQs'
      >
        {t('pages:faq__title')}
      </Typography>
      <FAQList faqList={FAQ_PRICING} />
      <Box mb={5} />
      <Typography
        variant='caption'
        color='text.secondary'
        sx={{
          opacity: 0.4,
          fontSize: 12,
        }}
      >
        {t('modules:faq_list__disclaimer_part1')}
        <ProLink
          href={`${WWW_PROJECT_LINK}/terms`}
          color='inherit'
          underline='always'
        >
          {t('modules:faq_list__terms_of_service')}
        </ProLink>
        {t('modules:faq_list__disclaimer_part2')}
      </Typography>
    </Box>
  );
};

export default PricingFaqBox;
