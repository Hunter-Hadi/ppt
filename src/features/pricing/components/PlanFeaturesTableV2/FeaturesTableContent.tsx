import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import HorizontalRuleOutlinedIcon from '@mui/icons-material/HorizontalRuleOutlined';
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import React, { FC } from 'react';

import LazyLoadImage from '@/features/common/components/LazyLoadImage';
import { PLAN_FEATURES_CATEGORY_V2 } from '@/features/pricing/constant/features_v2';
import useVideoPopupController from '@/features/video_popup/hooks/useVideoPopupController';

import { FEATURE_TABLE_FIRST_COLUMN_WIDTH, TABLE_COLUMN } from '.';

// interface IProps {}

const FeaturesTableContent: FC = () => {
  const { openVideoPopup } = useVideoPopupController();
  const { t } = useTranslation();

  return (
    <Stack spacing={4} pt={4}>
      {PLAN_FEATURES_CATEGORY_V2.map((category) => (
        <Stack key={category.categoryKey}>
          <Stack
            direction='row'
            px={{
              xs: 2,
              md: 3,
            }}
            py={1.5}
            alignItems='center'
            spacing={1}
          >
            <Typography
              variant='custom'
              fontSize={20}
              lineHeight={1.4}
              fontWeight={700}
              color={'primary.main'}
            >
              {t(category.name)}
            </Typography>
          </Stack>
          <Stack direction={'row'}>
            {TABLE_COLUMN.map((column, index) => {
              const notRightBorder = index >= TABLE_COLUMN.length - 1;
              if (column === 'features') {
                // 第一列
                return (
                  <Stack
                    key={column}
                    flex={1}
                    minWidth={FEATURE_TABLE_FIRST_COLUMN_WIDTH}
                  >
                    {category.features.map((feature) => {
                      const tooltipMaxWidth = feature.tooltip?.imageLink
                        ? 432
                        : 300;
                      return (
                        <Stack
                          key={feature.title}
                          spacing={0.5}
                          sx={{
                            flex: 1,
                            borderRight: notRightBorder
                              ? '0px solid'
                              : '1px solid',
                            borderColor: '#E0E0E0',
                            px: {
                              xs: 2,
                              md: 3,
                            },
                            py: 1.5,
                          }}
                        >
                          <Stack
                            direction={'row'}
                            alignItems='center'
                            spacing={1}
                          >
                            <Typography
                              variant='custom'
                              fontSize={16}
                              lineHeight={1.5}
                              color='text.primary'
                            >
                              {t(feature.title)}
                            </Typography>
                            <Tooltip
                              componentsProps={{
                                tooltip: {
                                  sx: {
                                    maxWidth: tooltipMaxWidth,
                                    p: 0,
                                  },
                                },
                              }}
                              title={
                                feature.tooltip ? (
                                  <Stack
                                    spacing={1.5}
                                    p={1.5}
                                    maxWidth={tooltipMaxWidth}
                                  >
                                    {feature.tooltip.imageLink && (
                                      <Box width='100%'>
                                        <LazyLoadImage
                                          width={'100%'}
                                          src={feature.tooltip.imageLink}
                                          skeletonHeight={260}
                                          alt={''}
                                        />
                                      </Box>
                                    )}
                                    {feature.tooltip?.videoUrl && (
                                      <Button
                                        size='small'
                                        variant='outlined'
                                        startIcon={<PlayCircleOutlinedIcon />}
                                        sx={{
                                          width: 'max-content',
                                          borderColor: '#E9D7FE !important',
                                          bgcolor: '#fff !important',
                                          color: 'primary.main !important',
                                          px: 1,
                                          py: 0.2,
                                          fontSize: 14,
                                          lineHeight: 1.5,
                                        }}
                                        onClick={() => {
                                          feature.tooltip?.videoUrl &&
                                            openVideoPopup(
                                              feature.tooltip.videoUrl,
                                            );
                                        }}
                                      >
                                        {t(
                                          'pricing:features__tooltips__play_video',
                                        )}
                                      </Button>
                                    )}
                                    {feature.tooltip?.title && (
                                      <Typography variant='body1'>
                                        {t(feature.tooltip.title)}
                                      </Typography>
                                    )}
                                    {feature.tooltip?.desc && (
                                      <Typography variant='caption'>
                                        {t(feature.tooltip.desc)}
                                      </Typography>
                                    )}
                                  </Stack>
                                ) : null
                              }
                              arrow
                              placement='top'
                            >
                              {feature.tooltip ? (
                                <Stack
                                  alignItems={'center'}
                                  justifyContent='center'
                                  borderRadius={'50%'}
                                  width={20}
                                  height={20}
                                >
                                  <TooltipIcon />
                                </Stack>
                              ) : (
                                <></>
                              )}
                            </Tooltip>
                          </Stack>
                          {feature.desc && (
                            <Typography
                              variant='custom'
                              fontSize={14}
                              color='text.secondary'
                              lineHeight={1.5}
                            >
                              {t(feature.desc)}
                            </Typography>
                          )}
                        </Stack>
                      );
                    })}
                  </Stack>
                );
              }

              // 后面的 plan features 列
              return (
                <Stack key={column} flex={1} sx={{}}>
                  {category.features.map((feature) => {
                    const planeStatus = feature.planStatus[column];

                    return (
                      <Stack
                        direction={'row'}
                        key={feature.title}
                        alignItems='center'
                        justifyContent={'center'}
                        textAlign={'center'}
                        spacing={1}
                        sx={{
                          flex: 1,
                          borderRight: notRightBorder
                            ? '0px solid'
                            : '1px solid',
                          borderColor: '#E0E0E0',
                          px: 2,
                          py: 1.5,
                          // minWidth: '230px',
                          boxSizing: 'border-box',
                        }}
                      >
                        {planeStatus.status === 'checked' && (
                          <CheckCircleOutlineOutlinedIcon
                            sx={{
                              color: 'text.primary',
                            }}
                          />
                        )}
                        {planeStatus.status === 'none' && (
                          <HorizontalRuleOutlinedIcon
                            sx={{
                              color: '#ADB2C3',
                            }}
                          />
                        )}
                        {planeStatus.status === 'value' && (
                          <Typography
                            variant='custom'
                            fontSize={16}
                            fontWeight={500}
                            lineHeight={1.5}
                            color='text.primary'
                          >
                            {t(planeStatus.statusText)}
                          </Typography>
                        )}
                      </Stack>
                    );
                  })}
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};

export default FeaturesTableContent;

const TooltipIcon = () => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_9998_254249)'>
        <path
          d='M20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10Z'
          fill='black'
          fillOpacity='0.08'
        />
        <path
          d='M9.41247 15V7.36364H10.5857V15H9.41247ZM10.009 6.09091C9.78037 6.09091 9.58316 6.01302 9.41744 5.85724C9.25504 5.70147 9.17383 5.5142 9.17383 5.29545C9.17383 5.0767 9.25504 4.88944 9.41744 4.73366C9.58316 4.57789 9.78037 4.5 10.009 4.5C10.2377 4.5 10.4333 4.57789 10.5957 4.73366C10.7614 4.88944 10.8442 5.0767 10.8442 5.29545C10.8442 5.5142 10.7614 5.70147 10.5957 5.85724C10.4333 6.01302 10.2377 6.09091 10.009 6.09091Z'
          fill='black'
          fillOpacity='0.6'
        />
      </g>
      <defs>
        <clipPath id='clip0_9998_254249'>
          <rect width='20' height='20' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};
