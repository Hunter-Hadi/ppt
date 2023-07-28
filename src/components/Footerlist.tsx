import { Box, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';

import ProLink from '@/components/ProLink';
import { GaContent, generateGaEvent } from '@/utils/gtag';

const FooterList: FC<{
  title: string;
  data: {
    label: string;
    icon: React.ReactNode;
    link: string;
    target?: React.HTMLAttributeAnchorTarget;
  }[];
}> = ({ title, data }) => {
  return (
    <Box>
      <Typography variant='h5' component={'p'} mb={3} fontWeight={800}>
        {title}
      </Typography>
      <Stack spacing={1.5}>
        {data.map(({ label, icon, link, target }) => (
          <GaContent
            boxClickAutoSend
            gaEvent={generateGaEvent('click', 'footer_link', {
              type: title,
              value: label,
              link: link,
            })}
            key={link}
          >
            <Stack
              direction={'row'}
              spacing={1}
              component='span'
              alignItems='center'
              key={link}
            >
              <Box height={24} color={'text.secondary'}>
                {icon}
              </Box>
              <ProLink
                href={link}
                underline='hover'
                sx={{ display: 'inline-block' }}
                target={target}
                muiLinkProps={{ title: label ?? '' }}
              >
                <Typography
                  variant='body2'
                  component='span'
                  color='text.primary'
                >
                  {label}
                </Typography>
              </ProLink>
            </Stack>
          </GaContent>
        ))}
      </Stack>
    </Box>
  );
};

export default FooterList;
