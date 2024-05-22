import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { FC, useMemo } from 'react';

import ResponsiveImage from '@/components/ResponsiveImage';
import usePreloadImages from '@/features/common/hooks/usePreloadImages';
import CTAInstallButton from '@/page_components/CTAInstallButton';

import {
  FEATURES_CAROUSEL_LIST,
  FEATURES_CONTENT_DATA_MAP,
  IFeaturesCarouselItemKey,
} from '.';

interface IProps {
  activeFeatureItem: IFeaturesCarouselItemKey;
}

const FeaturesCarouselContent: FC<IProps> = ({ activeFeatureItem }) => {
  const { t } = useTranslation();

  const needToPreloadImages = useMemo(() => {
    return FEATURES_CAROUSEL_LIST.map((featureCarouselItem) => {
      const currentContent = FEATURES_CONTENT_DATA_MAP[featureCarouselItem];
      return currentContent.imageUrl;
    });
  }, []);

  usePreloadImages(needToPreloadImages);

  const renderContent = (contentDataKey: IFeaturesCarouselItemKey) => {
    const currentContent = FEATURES_CONTENT_DATA_MAP[activeFeatureItem];

    const isActive = contentDataKey === activeFeatureItem;

    return (
      <Grid
        container
        spacing={{ xs: 3, sm: 7 }}
        // 为了 SEO，能爬取到 每个 features 的内容，所以这么渲染
        sx={[!isActive && { display: 'none' }]}
      >
        <Grid item xs={12} sm={12} md={6}>
          <Stack>
            <Typography
              variant='custom'
              fontSize={{
                xs: 20,
                sm: 24,
                md: 32,
              }}
              fontWeight={700}
              lineHeight={1.5}
              mb={{
                xs: 1.5,
                sm: 3,
              }}
            >
              {t(currentContent.title)}
            </Typography>
            <Divider
              sx={{
                mb: {
                  xs: 1.5,
                  sm: 3,
                },
              }}
            />
            {currentContent.descriptionLabel && (
              <Typography
                fontSize={{
                  xs: 16,
                  sm: 18,
                }}
                variant='custom'
                color='text.secondary'
              >
                {t(currentContent.descriptionLabel)}
              </Typography>
            )}
            <Stack
              component={'ul'}
              pl={3}
              color='text.secondary'
              lineHeight={1.5}
              mb={{
                xs: 2.5,
                sm: 5,
              }}
            >
              {currentContent.descriptionList.map((descriptionItem) => (
                <Typography
                  key={descriptionItem}
                  variant='custom'
                  fontSize={{
                    xs: 16,
                    sm: 18,
                  }}
                  component={'li'}
                  lineHeight={1.5}
                >
                  {t(descriptionItem)}
                </Typography>
              ))}
            </Stack>
            <CTAInstallButton
              variant={'contained'}
              text={t('pages:home_page__features_carousel__cta_button__text')}
              trackerLinkProps={{
                defaultRef: 'homepage',
                queryRefEnable: true,
                pathnameRefEnable: false,
              }}
              iconSize={0}
              adaptiveLabel
              sx={{
                width: 'max-content',
                height: 48,
                px: 2.5,
                fontSize: 16,
                background: 'primary.main',
              }}
              endIcon={<EastOutlinedIcon />}
              startIcon={null}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box
            sx={{
              mx: 'auto',
              bgcolor: '#F8F8F8',
              borderRadius: 4,
            }}
          >
            <ResponsiveImage
              alt={activeFeatureItem}
              src={currentContent.imageUrl}
              width={544}
              height={408}
            />
          </Box>
        </Grid>
      </Grid>
    );
  };

  return (
    <Box
      sx={{
        p: {
          xs: 3,
          sm: 6,
        },
        bgcolor: 'white',
        boxShadow: '0px 8px 16px -8px #00000014',
        border: '1px solid #9065B03D',
        borderRadius: 4,
      }}
    >
      {FEATURES_CAROUSEL_LIST.map((featureCarouselItem) =>
        renderContent(featureCarouselItem),
      )}
    </Box>
  );
};

export default FeaturesCarouselContent;
