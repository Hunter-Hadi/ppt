import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import { Box, Button, Divider, Stack, Tooltip } from '@mui/material';
import React from 'react';

import DevContent from '@/components/DevContent';
import {
  LANDING_VARIANT_TO_VERSION_MAP,
  TEST_LANDING_COOKIE_NAME,
} from '@/features/ab_tester/constant/landingVariant';
import useLandingABTester from '@/features/ab_tester/hooks/useLandingABTester';
import { removeLocalStorage } from '@/utils/localStorage';
const DevRefreshABTestVariantCookie = () => {
  const { variant, setVariant } = useLandingABTester();
  return (
    <DevContent>
      <Box
        sx={{
          position: 'fixed',
          right: 0,
          bottom: 0,
          zIndex: 1201,
          width: 200,
          height: 200,
          opacity: 0.4,
          transition: 'opacity 0.3s',
          '&:hover': {
            opacity: 1,
          },
        }}
      >
        <Tooltip
          componentsProps={{
            tooltip: { sx: { width: 500, maxWidth: 'unset' } },
          }}
          title={
            <Stack spacing={1}>
              <h2>current landing variant: {variant}</h2>
              {variant && (
                <h2>
                  current test version:{' '}
                  {LANDING_VARIANT_TO_VERSION_MAP[variant]}
                </h2>
              )}
              <Divider />
              <h2>Refresh landing page A/B Test variant cache</h2>
              <h3>
                1. Delete the variant cache of landing A/B Test in the cookie
              </h3>
              <h3>2. reload</h3>
            </Stack>
          }
          arrow
          placement='left'
        >
          <Button
            variant='contained'
            sx={{
              position: 'absolute',
              right: 32,
              bottom: 32,
              p: 1.2,
              pl: 1.4,
              pb: 1.4,
              borderRadius: '50%',
              minHeight: 'unset',
              minWidth: 'unset',
            }}
            onClick={() => {
              // 删除 landing A/B Test cookie ，并且刷新页面
              removeLocalStorage(TEST_LANDING_COOKIE_NAME);
              setVariant(null);
              setTimeout(() => {
                window.location.reload();
              }, 0);
            }}
          >
            <BugReportOutlinedIcon />
          </Button>
        </Tooltip>
      </Box>
    </DevContent>
  );
};

export default DevRefreshABTestVariantCookie;
