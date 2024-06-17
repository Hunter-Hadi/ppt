import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MoneyOffOutlinedIcon from '@mui/icons-material/MoneyOffOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { Box, Grid, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FC, useEffect, useRef, useState } from 'react';

import AppContainer from '@/app_layout/AppContainer';
import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import ProLink from '@/components/ProLink';

const PrivacyPages: FC = () => {
  const { t } = useTranslation();
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
        title={t('seo:privacy__title')}
        description={t('seo:privacy__description')}
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
            Our Commitment to Your Privacy
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
            {`At MaxAI, your privacy is not just a priority; it's a principle. In the era where digital footprints are extensively tracked, we take a different path with the MaxAI.me Chrome extension. We're not here to monetize your personal information; we're here to enhance your digital experience, securely and privately.`}
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
              {`We Only Know What's Necessary`}
            </Typography>

            <Typography
              variant='body2'
              sx={{ color: 'rgba(0,0,0,0.6)', textAlign: 'center' }}
            >
              {`We don't collect a dossier on you. The extent of our knowledge is your email and name—just enough to recognize you across devices and sync your settings. Beyond that, your personal life remains just that: personal.`}
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
              {`We Don't See Your Browsing/Chatting Data`}
            </Typography>

            <Typography
              variant='body2'
              sx={{ color: 'rgba(0,0,0,0.6)', textAlign: 'center' }}
            >
              {`Your browsing and chatting habits are your own. The MaxAI Chrome extension operates without intruding into your personal activities online. We collect no information on the sites you visit or the content you engage with. Our focus is solely on improving your experience without compromising your privacy.`}
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
              {`We Don't Monetize Your Trust`}
            </Typography>

            <Typography
              variant='body2'
              sx={{ color: 'rgba(0,0,0,0.6)', textAlign: 'center' }}
            >
              {`We believe in earning and keeping your trust, not selling it. Your data isn't a commodity to us. Therefore, we don't sell any information to third parties. Our business model revolves around providing a superior product, not leveraging user data for profit.`}
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ backgroundColor: '#9065B014', p: 4, borderRadius: '8px' }}>
          <Typography
            variant='body1'
            sx={{ margin: '0 auto', textAlign: 'center', maxWidth: 864 }}
          >
            Our mission with MaxAI is simple: to offer{` `}
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
              a privacy-centric tool that respects you and your digital
              boundaries.
            </Typography>
            {` `}
            {`We're in the business of innovation, not information selling. Your digital journey should be yours to control, and with MaxAI, we ensure it stays that way.`}
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
              'Privacy Policy',
              'Information We Do Not Collect',
              'Information We Collect',
              'How we use your information',
              'Information Security',
              'Marketing and advertising',
              'Changes to the Privacy Policy',
              'Data retention',
              'Contact Us',
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
                Privacy Policy
              </Typography>

              <Typography variant='body2' sx={{ mb: 2 }}>
                Last Updated: June 29, 2023
              </Typography>

              <Typography variant='body2' sx={{ mb: 2 }}>
                {`Welcome to the Privacy Policy for the MaxAI.me Chrome extension (hereinafter referred to as "MaxAI", "MaxAI.me", "we", "us", or "our"). We understand the importance of your privacy, and we are committed to protecting your personal information. This Privacy Policy outlines the types of information we collect, how we use it, and the measures we take to protect your data.`}
              </Typography>

              <Typography variant='body2' sx={{ mb: 2 }}>
                By using the MaxAI Chrome extension, you acknowledge and agree
                to the terms and conditions of this Privacy Policy. If you do
                not agree with any part of this Privacy Policy, please do not
                use or install the MaxAI Chrome extension.
              </Typography>
            </Box>

            <Box sx={{ pt: 4 }}>
              <Typography
                variant='h4'
                sx={{ pb: 2, fontWeight: 700 }}
                ref={informationWeDoNotCollectRef}
              >
                Information We Do Not Collect
              </Typography>

              <Typography
                variant='custom'
                component='h3'
                sx={{ pb: 2, pt: 3, fontSize: 24 }}
              >
                Personal Information
              </Typography>

              <Typography variant='body2' sx={{ pb: 2 }}>
                We take your privacy seriously and only collect your email and
                name to identify you when you log in, helping to sync your
                settings across different browsers and devices. Other than that,
                we do not collect any other personal information. The MaxAI
                Chrome extension operates without requiring any additional
                personal data from you, and we do not store such information.
              </Typography>
            </Box>

            <Box sx={{ pt: 4 }}>
              <Typography
                variant='h4'
                ref={informationWeCollectRef}
                sx={{ pb: 2, fontWeight: 700 }}
              >
                Information We Collect
              </Typography>

              <Typography
                variant='custom'
                component='h3'
                sx={{ pb: 2, pt: 3, fontSize: 24 }}
              >
                Chrome Extension Automatically Generated Reports
              </Typography>

              <Typography variant='body2' sx={{ pb: 2 }}>
                One of the types of information we collect from users is the
                Chrome extension automatically generated report. This
                information is used for the sole purpose of improving the
                functionality of the MaxAI Chrome extension and understanding
                the usage patterns of our users. The collected data may include
                technical information such as browser version, extension
                version, and operating system.
              </Typography>

              <Typography
                variant='custom'
                component='h3'
                sx={{ pb: 2, pt: 3, fontSize: 24 }}
              >
                Google Analytics
              </Typography>

              <Typography variant='body2' sx={{ mb: 2 }}>
                {`The second type of information we collect is default information
                about user interactions with the MaxAI Chrome extension through
                the use of Google Analytics, a web analytics service provided by
                Google Inc. ("Google"). Google Analytics uses cookies to help
                us analyze how users use the extension. The information
                generated by the cookies about your use of the extension
                (including your IP address) will be transmitted to and stored by
                Google on servers in the United States.`}
              </Typography>
            </Box>

            <Box sx={{ pt: 4 }}>
              <Typography
                variant='h4'
                ref={howWeUseYourInformationRef}
                sx={{ pb: 2, fontWeight: 700 }}
              >
                How we use your information
              </Typography>

              <Typography variant='body2' sx={{ mb: 2 }}>
                We use the information we collect, including Chrome extension
                automatically generated reports, to:
              </Typography>
              <Typography variant='body2' sx={{ mb: 2 }}>
                {`1) Improve the MaxAI Chrome extension's functionality.`}
              </Typography>
              <Typography variant='body2' sx={{ mb: 2 }}>
                {`2) Analyze usage patterns to better understand user preferences.`}
              </Typography>
              <Typography variant='body2' sx={{ mb: 2 }}>
                {`3) Identify and troubleshoot issues with the Chrome extension.`}
              </Typography>
              <Typography variant='body2' sx={{ mb: 2 }}>
                {`4) Improve the overall user experience.`}
              </Typography>
            </Box>

            <Box sx={{ pt: 4 }}>
              <Typography
                variant='h4'
                ref={informationSecurityRef}
                sx={{ pb: 2, fontWeight: 700 }}
              >
                Information Security
              </Typography>

              <Typography variant='body2' sx={{ mb: 2 }}>
                We take the security of your information seriously and implement
                commercially reasonable technical, administrative, and
                organizational measures to protect your data, both online and
                offline from loss, misuse, and unauthorized access, disclosure,
                alteration, or destruction. However, please note that no method
                of transmission over the Internet or electronic storage is 100%
                secure. While we strive to use commercially acceptable means to
                protect your information, we cannot guarantee its absolute
                security. Therefore, you should take special care in deciding
                what information you share with us through the MaxAI Chrome
                extension or email.
              </Typography>
            </Box>

            <Box sx={{ pt: 4 }}>
              <Typography
                variant='h4'
                ref={marketingAndAdvertisingRef}
                sx={{ pb: 2, fontWeight: 700 }}
              >
                Marketing and advertising
              </Typography>

              <Typography variant='body2' sx={{ mb: 2 }}>
                Where required by law we will only send you marketing
                information, including sending you updates and information about
                our new products and services, upcoming events or other
                promotions or news, including by email or push notification, as
                permitted by law. You may opt-out of receiving such emails by
                following the instructions in each promotional email we send you
                or by updating your user settings. In addition, if at any time
                you wish not to receive future communications or you wish to
                have your name deleted from our mailing lists, please contact us
                at{` `}
                <ProLink
                  href={'mailto:hello@maxai.me'}
                  sx={{ textDecoration: 'underline' }}
                >
                  hello@maxai.me
                </ProLink>
                {` `}
                We will continue to contact you via email regarding the
                provision of our Services and to respond to your requests.
              </Typography>
            </Box>

            <Box sx={{ pt: 4 }}>
              <Typography
                variant='h4'
                ref={changesToThePrivacyPolicyRef}
                sx={{ pb: 2, fontWeight: 700 }}
              >
                Changes to the Privacy Policy
              </Typography>
              <Typography variant='body2' sx={{ mb: 2 }}>
                We may update this Privacy Policy from time to time. When we do,
                we will post an updated version on this page, unless another
                type of notice is required by applicable law.
              </Typography>
            </Box>

            <Box sx={{ pt: 4 }}>
              <Typography
                variant='h4'
                ref={changesToThePrivacyPolicyRef}
                sx={{ pb: 2, fontWeight: 700 }}
              >
                Data retention
              </Typography>
              <Typography variant='body2' sx={{ mb: 2 }}>
                {`We will retain your personal information, including data
                necessary for the functionality of the cross-device
                synchronization, such as your settings and other information,
                only for as long as necessary to provide the MaxAI Chrome
                extension's services to you, or for other legitimate business
                purposes such as resolving disputes, safety and security
                reasons, or complying with our legal obligations.`}
              </Typography>
              <Typography variant='body2' sx={{ mb: 2 }}>
                The length of time we retain your personal information will
                depend on several factors, including:
              </Typography>
              <Typography variant='body2' sx={{ mb: 2 }}>
                {`1) The amount, nature, and sensitivity of the information.`}
              </Typography>
              <Typography variant='body2' sx={{ mb: 2 }}>
                {`2) The potential risk of harm from unauthorized use or disclosure.`}
              </Typography>
              <Typography variant='body2' sx={{ mb: 2 }}>
                {`3) The purposes for which we process your information.`}
              </Typography>
              <Typography variant='body2' sx={{ mb: 2 }}>
                {`4) Any legal requirements we may be subject to.`}
              </Typography>
              <Typography variant='body2' sx={{ mb: 2 }}>
                If you choose to deactivate your account, we will delete your
                data from our servers within a reasonable timeframe.
              </Typography>
            </Box>

            <Box sx={{ pt: 4 }}>
              <Typography
                variant='h4'
                ref={contactUsRef}
                sx={{ pb: 2, fontWeight: 700 }}
              >
                Contact Us
              </Typography>
              <Typography variant='body2' sx={{ pb: 2 }}>
                If you have any questions or concerns about our Privacy Policy,
                please feel free to contact us at{` `}
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

export default PrivacyPages;
