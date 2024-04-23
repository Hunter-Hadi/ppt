import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { FC, useMemo } from 'react';

import ResponsiveImage from '@/components/ResponsiveImage';
import usePreloadImages from '@/features/common/hooks/usePreloadImages';
import CTAInstallButton from '@/page_components/CTAInstallButton';

import { IFeaturesCarouselItemKey } from '.';

interface IProps {
  activeFeatureItem: IFeaturesCarouselItemKey;
}

const FeaturesCarouselContent: FC<IProps> = ({ activeFeatureItem }) => {
  const { t } = useTranslation();
  const content = useMemo(() => {
    const contentDataMap: Record<
      IFeaturesCarouselItemKey,
      {
        title: string;
        descriptionLabel?: string;
        descriptionList: string[];
      }
    > = {
      Chat: {
        title: 'pages:home_page__features_carousel__feature_chat__title',
        descriptionLabel:
          'pages:home_page__features_carousel__feature_chat__description_label',
        descriptionList: [
          'pages:home_page__features_carousel__feature_chat__description1',
          'pages:home_page__features_carousel__feature_chat__description2',
          'pages:home_page__features_carousel__feature_chat__description3',
          'pages:home_page__features_carousel__feature_chat__description4',
        ],
      },
      Rewriter: {
        title: 'pages:home_page__features_carousel__feature_rewriter__title',
        descriptionList: [
          'pages:home_page__features_carousel__feature_rewriter__description1',
          'pages:home_page__features_carousel__feature_rewriter__description2',
          'pages:home_page__features_carousel__feature_rewriter__description3',
          'pages:home_page__features_carousel__feature_rewriter__description4',
          'pages:home_page__features_carousel__feature_rewriter__description5',
        ],
      },

      'Quick-Reply': {
        title: 'pages:home_page__features_carousel__feature_reply__title',
        descriptionLabel:
          'pages:home_page__features_carousel__feature_reply__description_label',
        descriptionList: [
          'pages:home_page__features_carousel__feature_reply__description1',
          'pages:home_page__features_carousel__feature_reply__description2',
          'pages:home_page__features_carousel__feature_reply__description3',
          'pages:home_page__features_carousel__feature_reply__description4',
        ],
      },
      Summary: {
        title: 'pages:home_page__features_carousel__feature_summary__title',
        descriptionLabel:
          'pages:home_page__features_carousel__feature_summary__description_label',
        descriptionList: [
          'pages:home_page__features_carousel__feature_summary__description1',
          'pages:home_page__features_carousel__feature_summary__description2',
          'pages:home_page__features_carousel__feature_summary__description3',
          'pages:home_page__features_carousel__feature_summary__description4',
        ],
      },
      Search: {
        title: 'pages:home_page__features_carousel__feature_search__title',
        descriptionList: [
          'pages:home_page__features_carousel__feature_search__description1',
          'pages:home_page__features_carousel__feature_search__description2',
          'pages:home_page__features_carousel__feature_search__description3',
          'pages:home_page__features_carousel__feature_search__description4',
        ],
      },
      Art: {
        title: 'pages:home_page__features_carousel__feature_art__title',
        descriptionList: [
          'pages:home_page__features_carousel__feature_art__description1',
          'pages:home_page__features_carousel__feature_art__description2',
          'pages:home_page__features_carousel__feature_art__description3',
          'pages:home_page__features_carousel__feature_art__description4',
        ],
      },
      Translator: {
        title: 'pages:home_page__features_carousel__feature_translator__title',
        descriptionList: [
          'pages:home_page__features_carousel__feature_translator__description1',
          'pages:home_page__features_carousel__feature_translator__description2',
          'pages:home_page__features_carousel__feature_translator__description3',
          'pages:home_page__features_carousel__feature_translator__description4',
        ],
      },
      Reader: {
        title: 'pages:home_page__features_carousel__feature_reader__title',
        descriptionList: [
          'pages:home_page__features_carousel__feature_reader__description1',
          'pages:home_page__features_carousel__feature_reader__description2',
          'pages:home_page__features_carousel__feature_reader__description3',
          'pages:home_page__features_carousel__feature_reader__description4',
        ],
      },
      Prompts: {
        title: 'pages:home_page__features_carousel__feature_prompts__title',
        descriptionList: [
          'pages:home_page__features_carousel__feature_prompts__description1',
          'pages:home_page__features_carousel__feature_prompts__description2',
          'pages:home_page__features_carousel__feature_prompts__description3',
          'pages:home_page__features_carousel__feature_prompts__description4',
        ],
      },
    };

    const currentContent = contentDataMap[activeFeatureItem];

    return (
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
    );
  }, [activeFeatureItem, t]);

  usePreloadImages([
    '/assets/landing/feature-carousel/chat.png',
    '/assets/landing/feature-carousel/rewriter.png',
    '/assets/landing/feature-carousel/reply.png',
    '/assets/landing/feature-carousel/summary.png',
    '/assets/landing/feature-carousel/search.png',
    '/assets/landing/feature-carousel/art.png',
    '/assets/landing/feature-carousel/translator.png',
    '/assets/landing/feature-carousel/prompts.png',
    '/assets/landing/feature-carousel/reader.png',
  ]);

  const imageSrc = useMemo(() => {
    if (activeFeatureItem === 'Chat') {
      return '/assets/landing/feature-carousel/chat.png';
    }
    if (activeFeatureItem === 'Rewriter') {
      return '/assets/landing/feature-carousel/rewriter.png';
    }
    if (activeFeatureItem === 'Quick-Reply') {
      return '/assets/landing/feature-carousel/reply.png';
    }
    if (activeFeatureItem === 'Summary') {
      return '/assets/landing/feature-carousel/summary.png';
    }
    if (activeFeatureItem === 'Search') {
      return '/assets/landing/feature-carousel/search.png';
    }
    if (activeFeatureItem === 'Art') {
      return '/assets/landing/feature-carousel/art.png';
    }
    if (activeFeatureItem === 'Translator') {
      return '/assets/landing/feature-carousel/translator.png';
    }
    if (activeFeatureItem === 'Prompts') {
      return '/assets/landing/feature-carousel/prompts.png';
    }
    if (activeFeatureItem === 'Reader') {
      return '/assets/landing/feature-carousel/reader.png';
    }

    return '';
  }, [activeFeatureItem]);

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
      <Grid container spacing={{ xs: 3, sm: 7 }}>
        <Grid item xs={12} sm={12} md={6}>
          {content}
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
              src={imageSrc}
              width={544}
              height={408}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FeaturesCarouselContent;
