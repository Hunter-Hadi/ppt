import { Box, Container, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useMemo } from 'react';

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import ProLink from '@/components/ProLink';
import useCheckExtension from '@/features/extension/hooks/useCheckExtension';
import HomePageContent from '@/features/landing/components/HomePageContent';
import usePartnersInfo from '@/features/partners/hooks/usePartnersInfo';
import FunnelSurveyPopup from '@/features/survey/components/FunnelSurveyPopup';
import { useSendRefCount } from '@/hooks/useSendRefCount';
import FixedCtaButton from '@/page_components/PartnersPages/components/FixedCtaButton';
import TryExtensionButton from '@/page_components/PartnersPages/components/TryExtensionButton';
import ToolsHome from '@/page_components/PdfToolsPages/components/ToolsHome';

const UninstalledPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { name, propRef, changelogText, changelogLink } = usePartnersInfo();

  const { hasExtension } = useCheckExtension();

  useSendRefCount(propRef, 'partners-uninstalled');

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
          ✅ {partnersName} has been uninstalled
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
          text={hasExtension ? t('pages:partners__try_our_tools') : null}
          href={hasExtension ? '/pdf-tools' : null}
          target={hasExtension ? '_self' : undefined}
        />
        {hasExtension ? (
          <Container
            sx={{
              py: 4,
            }}
          >
            <ToolsHome />
          </Container>
        ) : (
          <HomePageContent propRef={propRef} />
        )}
      </Box>
      {!hasExtension && (
        <FixedCtaButton propRef={propRef} partnerPageType='uninstalled' />
      )}
      <FunnelSurveyPopup sceneType='SURVEY_INSTALL_DROPPED' />
    </Box>
  );
};

export default UninstalledPage;
