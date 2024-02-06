import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MoneyOffOutlinedIcon from '@mui/icons-material/MoneyOffOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { Box, Grid, Typography } from '@mui/material';
import { FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import AppContainer from '@/app_layout/AppContainer';
import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import ProLink from '@/components/ProLink';

const PrivacyPage: FC = () => {
  const { t } = useTranslation('privacy');

  const [activePolicyIndex, setActivePolicyIndex] = useState(0);
  const privacyPolicyRef = useRef<HTMLHeadingElement>(null);
  const informationWeDoNotCollectRef = useRef<HTMLHeadingElement>(null);
  const informationWeCollectRef = useRef<HTMLHeadingElement>(null);
  const howWeUseYourInformationRef = useRef<HTMLHeadingElement>(null);
  const informationSecurityRef = useRef<HTMLHeadingElement>(null);
  const marketingAndAdvertisingRef = useRef<HTMLHeadingElement>(null);
  const changesToThePrivacyPolicyRef = useRef<HTMLHeadingElement>(null);
  const contactUsRef = useRef<HTMLHeadingElement>(null);

  /**
   * 滚动时处理侧边栏的highlight状态
   */
  const scrollHandler = () => {
    [
      privacyPolicyRef,
      informationWeDoNotCollectRef,
      informationWeCollectRef,
      howWeUseYourInformationRef,
      informationSecurityRef,
      marketingAndAdvertisingRef,
      changesToThePrivacyPolicyRef,
      contactUsRef,
    ].forEach((item, index) => {
      if (Math.abs(window.scrollY + 100 - item.current!.offsetTop) < 50) {
        setActivePolicyIndex(index);
      }
    });
  };

  /**
   * 点击侧边栏滚动到指定区域
   */
  const handlePrivacyItemClick = (index: number) => {
    window.scrollTo({
      top:
        [
          privacyPolicyRef,
          informationWeDoNotCollectRef,
          informationWeCollectRef,
          howWeUseYourInformationRef,
          informationSecurityRef,
          marketingAndAdvertisingRef,
          changesToThePrivacyPolicyRef,
          contactUsRef,
        ][index].current!.offsetTop - 100,
      behavior: 'smooth', // 使用平滑滚动
    });
  };

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return (
    <>
      <AppDefaultSeoLayout
        description={'Read the MaxAI.me privacy policy.'}
        title={'Privacy Policy | MaxAI.me'}
      />

      <AppContainer
        sx={{
          bgcolor: 'primary.main',
          py: {
            xs: 6,
            md: 8,
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: 864,
            margin: '0 auto',
            px: 2,
          }}
        >
          <Typography
            variant='custom'
            component='h2'
            sx={{
              fontSize: {
                xs: 32,
                sm: 48,
              },
              color: '#fff',
              pb: 3,
              fontWeight: 700,
            }}
          >
            {t('banner__title')}
          </Typography>

          <Typography
            variant='body1'
            color='#fff'
            sx={{
              textAlign: {
                sx: 'left',
                sm: 'center',
              },
            }}
          >
            {t('banner__content')}
          </Typography>
        </Box>
      </AppContainer>

      <AppContainer
        sx={{
          wordBreak: 'break-word',
          py: 4,
        }}
      >
        <Grid container spacing={4} sx={{ pt: 2, pb: 8 }}>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                width: 64,
                height: 64,
                backgroundColor: '#DFF1E3',
                borderRadius: '8px',
                margin: '0 auto',
                mb: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <LockOutlinedIcon
                sx={{ color: '#34A853', width: 32, height: 32 }}
              />
            </Box>

            <Typography
              variant='h5'
              sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2 }}
            >
              {t('summary_1__title')}
            </Typography>

            <Typography
              variant='body2'
              sx={{ color: 'rgba(0,0,0,0.6)', textAlign: 'center' }}
            >
              {t('summary_1__content')}
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box
              sx={{
                width: 64,
                height: 64,
                backgroundColor: '#F9E1DF',
                borderRadius: '8px',
                margin: '0 auto',
                mb: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <VisibilityOffOutlinedIcon
                sx={{ color: '#DB4437', width: 32, height: 32 }}
              />
            </Box>

            <Typography
              variant='h5'
              sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2 }}
            >
              {t('summary_2__title')}
            </Typography>

            <Typography
              variant='body2'
              sx={{ color: 'rgba(0,0,0,0.6)', textAlign: 'center' }}
            >
              {t('summary_2__content')}{' '}
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box
              sx={{
                width: 64,
                height: 64,
                backgroundColor: '#FDF6D9',
                borderRadius: '8px',
                margin: '0 auto',
                mb: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <MoneyOffOutlinedIcon
                sx={{ color: '#F2C511', width: 32, height: 32 }}
              />
            </Box>

            <Typography
              variant='h5'
              sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2 }}
            >
              {t('summary_3__title')}
            </Typography>

            <Typography
              variant='body2'
              sx={{ color: 'rgba(0,0,0,0.6)', textAlign: 'center' }}
            >
              {t('summary_3__content')}
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ backgroundColor: '#9065B014', p: 4, borderRadius: '8px' }}>
          <Typography
            variant='body1'
            sx={{ margin: '0 auto', textAlign: 'center', maxWidth: 864 }}
          >
            {t('section_1__part1')}
            <Typography
              variant='custom'
              component='span'
              sx={{
                fontSize: {
                  xs: 24,
                  sm: 32,
                },
                fontWeight: 700,
                color: 'primary.main',
                fontStyle: 'italic',
              }}
            >
              {t('section_1__strong')}
            </Typography>
            {t('section_1__part2')}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            py: {
              xs: 4,
              sm: 8,
            },
            alignItems: 'flex-start',
          }}
        >
          <Box
            sx={{
              pr: 8,
              position: 'sticky',
              top: '100px',
              display: {
                xs: 'none',
                md: 'block',
              },
            }}
          >
            {[
              t('privacy_policy__title'),
              t('information_we_do_not_collect__title'),
              t('information_we_collect__title'),
              t('how_we_use_your_information__title'),
              t('information_security__title'),
              t('marketing_and_advertising__title'),
              t('changes_to_the_privacy_policy__title'),
              t('contact_us__title'),
            ].map((item, index) => (
              <Typography
                key={item}
                variant='body2'
                onClick={() => handlePrivacyItemClick(index)}
                sx={{
                  width: 272,
                  height: 48,
                  lineHeight: '48px',
                  bgcolor:
                    activePolicyIndex === index ? '#F4F4F4' : 'transparent',
                  px: 2,
                }}
              >
                {item}
              </Typography>
            ))}
          </Box>

          <Box sx={{ flex: 1 }}>
            <Box sx={{ pt: 4 }}>
              <Typography
                variant='custom'
                component={'h1'}
                sx={{ mb: 2, fontSize: 48 }}
                ref={privacyPolicyRef}
              >
                {t('privacy_policy__title')}
              </Typography>

              <Typography variant='body2' sx={{ mb: 2 }}>
                {t('privacy_policy__update_time')}
              </Typography>

              <Typography variant='body2' sx={{ mb: 2 }}>
                {t('privacy_policy__description_1')}
              </Typography>

              <Typography variant='body2' sx={{ mb: 2 }}>
                {t('privacy_policy__description_2')}
              </Typography>
            </Box>

            <Box sx={{ pt: 4 }}>
              <Typography
                variant='h4'
                sx={{ pb: 2, fontWeight: 700 }}
                ref={informationWeDoNotCollectRef}
              >
                {t('information_we_do_not_collect__title')}
              </Typography>

              <Typography
                variant='custom'
                component='h3'
                sx={{ pb: 2, pt: 3, fontSize: 24 }}
              >
                {t('personal_information__title')}
              </Typography>

              <Typography variant='body2' sx={{ pb: 2 }}>
                {t('personal_information__content')}
              </Typography>
            </Box>

            <Box sx={{ pt: 4 }}>
              <Typography
                variant='h4'
                ref={informationWeCollectRef}
                sx={{ pb: 2, fontWeight: 700 }}
              >
                {t('information_we_collect__title')}
              </Typography>

              <Typography
                variant='custom'
                component='h3'
                sx={{ pb: 2, pt: 3, fontSize: 24 }}
              >
                {t('chrome_extension_automatically_generated_reports__title')}
              </Typography>

              <Typography variant='body2' sx={{ pb: 2 }}>
                {t('chrome_extension_automatically_generated_reports__content')}
              </Typography>

              <Typography
                variant='custom'
                component='h3'
                sx={{ pb: 2, pt: 3, fontSize: 24 }}
              >
                {t('google_analytics_title')}
              </Typography>

              <Typography variant='body2' sx={{ mb: 2 }}>
                {t('google_analytics_content')}
              </Typography>
            </Box>

            <Box sx={{ pt: 4 }}>
              <Typography
                variant='h4'
                ref={howWeUseYourInformationRef}
                sx={{ pb: 2, fontWeight: 700 }}
              >
                {t('how_we_use_your_information__title')}
              </Typography>

              <Typography variant='body2' sx={{ mb: 2 }}>
                {t('how_we_use_your_information__sub_title')}
              </Typography>
              <Typography variant='body2' sx={{ mb: 2 }}>
                1) {t('how_we_use_your_information__list_1')}
              </Typography>
              <Typography variant='body2' sx={{ mb: 2 }}>
                2) {t('how_we_use_your_information__list_2')}
              </Typography>
              <Typography variant='body2' sx={{ mb: 2 }}>
                3) {t('how_we_use_your_information__list_3')}
              </Typography>
              <Typography variant='body2' sx={{ mb: 2 }}>
                4) {t('how_we_use_your_information__list_4')}
              </Typography>
            </Box>

            <Box sx={{ pt: 4 }}>
              <Typography
                variant='h4'
                ref={informationSecurityRef}
                sx={{ pb: 2, fontWeight: 700 }}
              >
                {t('information_security__title')}
              </Typography>

              <Typography variant='body2' sx={{ mb: 2 }}>
                {t('information_security__content')}
              </Typography>
            </Box>

            <Box sx={{ pt: 4 }}>
              <Typography
                variant='h4'
                ref={marketingAndAdvertisingRef}
                sx={{ pb: 2, fontWeight: 700 }}
              >
                {t('marketing_and_advertising__title')}
              </Typography>

              <Typography variant='body2' sx={{ mb: 2 }}>
                {t('marketing_and_advertising__content_part_1')}
                <ProLink
                  href={'mailto:hello@maxai.me'}
                  sx={{ textDecoration: 'underline' }}
                >
                  hello@maxai.me
                </ProLink>
                {t('marketing_and_advertising__content_part_2')}
              </Typography>
            </Box>

            <Box sx={{ pt: 4 }}>
              <Typography
                variant='h4'
                ref={changesToThePrivacyPolicyRef}
                sx={{ pb: 2, fontWeight: 700 }}
              >
                {t('changes_to_the_privacy_policy__title')}
              </Typography>
              <Typography variant='body2' sx={{ mb: 2 }}>
                {t('changes_to_the_privacy_policy__content')}
              </Typography>
            </Box>

            <Box sx={{ pt: 4 }}>
              <Typography
                variant='h4'
                ref={contactUsRef}
                sx={{ pb: 2, fontWeight: 700 }}
              >
                {t('contact_us__title')}
              </Typography>
              <Typography variant='body2' sx={{ pb: 2 }}>
                {t('contact_us__content')}
                <ProLink
                  href={'mailto:hello@maxai.me'}
                  sx={{ textDecoration: 'underline' }}
                >
                  hello@maxai.me
                </ProLink>
              </Typography>
            </Box>
          </Box>
        </Box>
      </AppContainer>
    </>
  );
};

export default PrivacyPage;
