import { Box, Container, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';

import FAQList from '@/components/FAQList';
import TitleCard from '@/components/TitlteCard';
import { FAQ_SIMPLY_TRENDS } from '@/global_constants/simplytrends';

const FAQ: FC = () => {
  return (
    <Stack>
      <Box bgcolor={'primary.main'}>
        <Container maxWidth={'sm'}>
          <TitleCard />
        </Container>
      </Box>
      <Box
        bgcolor={'#fafafa'}
        sx={{
          py: {
            xs: 2,
            sm: 4,
            md: 6,
            lg: 10,
          },
        }}
      >
        <Container maxWidth={'sm'}>
          <Typography
            variant='h4'
            component={'h2'}
            textAlign={'center'}
            fontWeight={'bold'}
            mb={{
              xs: 2,
              sm: 4,
              md: 6,
              lg: 8,
            }}
          >
            {'SimplyTrends FAQ'}
          </Typography>
          <FAQList faqList={FAQ_SIMPLY_TRENDS} />
        </Container>
      </Box>
    </Stack>
  );
};

export default FAQ;
