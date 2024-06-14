import { Box, Container, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import ProLink from '@/components/ProLink';
import usePartnersABTester from '@/features/ab_tester/hooks/usePartnersABTester';
import useCheckExtension from '@/features/extension/hooks/useCheckExtension';
import usePartnersInfo from '@/features/partners/hooks/usePartnersInfo';
import FunnelSurveyPopup from '@/features/survey/components/FunnelSurveyPopup';
import { useSendRefCount } from '@/hooks/useSendRefCount';
import { makeStaticProps } from '@/i18n/utils/staticHelper';
import FixedCtaButton from '@/page_components/partners_components/FixedCtaButton';
import TryExtensionButton from '@/page_components/partners_components/TryExtensionButton';
import ToolsHome from '@/page_components/PdfToolsPages/components/ToolsHome';

const PartnersUpdatedPage = () => {
  const router = useRouter();

  const { name, propRef, changelogText, changelogLink } = usePartnersInfo();

  const { hasExtension, loaded: checkExtensionStatusLoaded } =
    useCheckExtension();

  useSendRefCount(propRef, 'partners-updated');

  // 没安装插件才显示 ab test partners 内容
  const { renderPartnersContent } = usePartnersABTester(
    !hasExtension && checkExtensionStatusLoaded && router.isReady,
  );

  const partnersName = useMemo(() => {
    if (!name) {
      return '';
    }
    if (Array.isArray(name)) {
      return name[0].split('-').join(' ');
    } else {
      return name.split('-').join(' ');
    }
  }, [name]);

  useEffect(() => {
    if (!name && router.isReady) {
      router.replace('/');
    }
  }, [name, router]);

  if (!name) return null;

  return (
    <Box
      sx={{
        bgcolor: '#fff',
        position: 'relative',
        pb: 10,
      }}
    >
      <AppDefaultSeoLayout />
      <Stack
        minHeight={240}
        bgcolor={'#F8F9FA'}
        alignItems={'center'}
        justifyContent={'center'}
        spacing={2}
        px={2}
        pt={2}
        pb={6}
        boxSizing='border-box'
      >
        <Typography
          component='h2'
          variant='custom'
          textAlign={'center'}
          fontSize={48}
          sx={{
            wordBreak: 'break-word',
          }}
        >
          🎉 {partnersName} has been updated
        </Typography>
        {changelogText && changelogLink ? (
          <Typography
            sx={{
              wordBreak: 'break-word',
              textAlign: 'center',
            }}
          >
            <ProLink
              muiLinkProps={{
                rel: 'noopener nofollow',
              }}
              href={changelogLink}
              underline='always'
              target={'_blank'}
            >
              {changelogText}
            </ProLink>
          </Typography>
        ) : null}
      </Stack>
      <Box position='relative'>
        <TryExtensionButton
          propRef={propRef}
          text={hasExtension ? `Try our partner's free tools` : null}
          href={hasExtension ? '/pdf-tools' : null}
          target={hasExtension ? '_self' : undefined}
        />
        {/* 没安装插件才显示 ab test partners 内容 */}
        {hasExtension ? (
          <Container
            sx={{
              py: 4,
            }}
          >
            <ToolsHome />
          </Container>
        ) : (
          renderPartnersContent(propRef)
        )}
      </Box>
      {!hasExtension && (
        <FixedCtaButton propRef={propRef} partnerPageType='updated' />
      )}
      <FunnelSurveyPopup sceneType='SURVEY_INSTALL_DROPPED' />
    </Box>
  );
};
export default PartnersUpdatedPage;

const getStaticProps = makeStaticProps();
export { getStaticProps };
