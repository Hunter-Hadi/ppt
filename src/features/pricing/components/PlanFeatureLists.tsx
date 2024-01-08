import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import {
  Box,
  Grid,
  Stack,
  SxProps,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { capitalize } from 'lodash-es';
import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import LazyLoadImage from '@/components/LazyloadImage';
import WikiText from '@/components/text/WikiText';
import { RENDER_PLAN_TYPE } from '@/features/pricing/type';
import useVideoPopupController from '@/features/videoPopup/hooks/useVideoPopupController';

import { PLAN_FEATURES_CATEGORY } from '../constant';
import { FeaturesCategoryIcon, FeaturesIcon } from './FeaturesIcon';

interface IProps {
  planType?: RENDER_PLAN_TYPE;
  sx?: SxProps;
}

const PlanFeatureLists: FC<IProps> = ({ planType, sx }) => {
  const { t } = useTranslation(['modules']);
  const { openVideoPopup } = useVideoPopupController();

  // 屏幕宽度大于等于 1110px
  const matches = useMediaQuery('(min-width:1110px)');

  const coverPlanType = useMemo(() => {
    if (planType !== 'free') {
      const planTypeName = planType?.split('_')[0];
      return planTypeName ?? planType ?? '';
    }

    return 'free';
  }, [planType]);

  return (
    <Stack spacing={4} sx={sx} borderRadius={1}>
      <Box
        p={2}
        sx={{
          bgcolor: '#F5F6F7',
        }}
      >
        <Typography
          variant='custom'
          fontSize={22}
          fontWeight={700}
          lineHeight={1.2}
        >
          {t('plan_features_list__title', { plan: capitalize(coverPlanType) })}
        </Typography>
      </Box>
      {PLAN_FEATURES_CATEGORY.map((category) => (
        <Box key={category.name} px={2} pb={2}>
          <Stack>
            <Stack direction={'row'} alignItems='center' spacing={1} mb={2}>
              {category.icon && <FeaturesCategoryIcon name={category.icon} />}
              <Typography
                variant='body2'
                fontWeight={700}
                color={'primary.main'}
              >
                {t(category.name)}
              </Typography>
            </Stack>
            <Grid container spacing={2}>
              {category.features.map((feature) => {
                const FeatureItemCom = (
                  <Stack
                    direction={'row'}
                    bgcolor='#F5F6F7'
                    p={2}
                    spacing={2}
                    borderRadius={2}
                    boxSizing='border-box'
                    height='100%'
                    onClick={() => {
                      feature.youtube && openVideoPopup(feature.youtube.link);
                    }}
                  >
                    {feature.icon && (
                      <Box
                        p={0.5}
                        bgcolor='#fff'
                        borderRadius={2}
                        sx={{
                          width: 'max-content',
                          height: 'max-content',
                          flexShrink: 0,
                          lineHeight: 0,
                        }}
                      >
                        <FeaturesIcon name={feature.icon} fontSize={36} />
                      </Box>
                    )}
                    <Stack>
                      <Typography
                        fontSize={16}
                        fontWeight={600}
                        lineHeight={1.5}
                        color={'text.primary'}
                        // noWrap={matches ? true : false}
                        variant='custom'
                      >
                        {t(feature.title)}
                      </Typography>
                      <Typography
                        fontSize={14}
                        lineHeight={1.5}
                        color={'text.primary'}
                        variant='custom'
                      >
                        {t(feature.planStatus[coverPlanType].statusText)}
                      </Typography>
                    </Stack>
                  </Stack>
                );

                return (
                  <Grid
                    key={feature.title}
                    item
                    xs={6}
                    md={matches ? 4 : 6}
                    lg={4}
                  >
                    {feature.tooltip && feature.tooltip.desc ? (
                      <WikiText
                        key={feature.title}
                        tooltipProps={{
                          sx: {
                            zIndex: 1299,
                          },
                        }}
                        wiki={
                          <Stack
                            spacing={1.2}
                            component='div'
                            position={'relative'}
                          >
                            {feature.tooltip.imageLink ? (
                              <Box
                                sx={{
                                  position: 'relative',
                                  width: '100%',
                                  height: 'auto',
                                  borderRadius: '4px',
                                  overflow: 'hidden',
                                  cursor: feature.youtube ? 'pointer' : 'auto',
                                  '& img': {
                                    width: '100%',
                                    height: 'auto',
                                  },
                                }}
                                onClick={() => {
                                  if (feature.youtube) {
                                    openVideoPopup(feature.youtube.link);
                                  }
                                }}
                              >
                                {feature.youtube && (
                                  <Box
                                    sx={{
                                      position: 'absolute',
                                      top: 52,
                                      left: '50%',
                                      ml: '-24px',
                                      cursor: 'pointer',
                                      borderRadius: '50%',
                                      lineHeight: 0,
                                      background: 'black',
                                      opacity: 0.4,
                                      transition: 'opacity 0.45s ease',
                                      '&:hover': {
                                        opacity: 0.6,
                                      },
                                    }}
                                  >
                                    <PlayArrowRoundedIcon
                                      sx={{
                                        fontSize: 48,
                                        color: 'white',
                                      }}
                                    />
                                  </Box>
                                )}

                                <LazyLoadImage
                                  skeletonHeight={140}
                                  src={feature.tooltip.imageLink}
                                  alt={`${feature.title} img`}
                                />
                              </Box>
                            ) : null}
                            <Typography
                              variant='custom'
                              fontSize={'14px'}
                              fontWeight={400}
                              lineHeight={1.4}
                              textAlign={'left'}
                              color={'rgba(255,255,255,.87)'}
                            >
                              {t(feature.tooltip.desc)}
                            </Typography>
                          </Stack>
                        }
                        text={FeatureItemCom}
                      />
                    ) : (
                      <>{FeatureItemCom}</>
                    )}
                  </Grid>
                );
              })}
            </Grid>
          </Stack>
        </Box>
      ))}
    </Stack>
  );
};

export default PlanFeatureLists;
