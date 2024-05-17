import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import { Box, Button, Stack, Tooltip } from '@mui/material';
import React from 'react';

import DevContent from '@/components/DevContent';
import {
  TEST_LANDING_COOKIE_NAME,
  TESTER_LANDING_PATH_TARGET_PATHNAME,
} from '@/features/ab_tester/constant/landingVariant';
const DevRefreshABTestVariantCookie = () => {
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
          title={
            <Stack spacing={1}>
              <h2>Refresh landing page A/B Test variant cache</h2>
              <h3>
                1. Delete the variant cache of landing A/B Test in the cookie
              </h3>
              <h3>2. redirect to {TESTER_LANDING_PATH_TARGET_PATHNAME}</h3>
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
              document.cookie =
                TEST_LANDING_COOKIE_NAME +
                '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
              setTimeout(() => {
                window.location.pathname = TESTER_LANDING_PATH_TARGET_PATHNAME;
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
