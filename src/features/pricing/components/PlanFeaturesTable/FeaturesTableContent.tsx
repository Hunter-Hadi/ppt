import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import { Stack, SvgIcon, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { FC } from 'react';

import WikiText from '@/components/text/WikiText';
import { PLAN_FEATURES_CATEGORY } from '@/features/pricing/constant';
import { RENDER_PLAN_TYPE } from '@/features/pricing/type';
import useVideoPopupController from '@/features/videoPopup/hooks/useVideoPopupController';

import { FeaturesCategoryIcon, FeaturesIcon } from '../FeaturesIcon';
import {
  FEATURE_TABLE_FIRST_COLUMN_WIDTH,
  IFeatureTableVariant,
  TABLE_COLUMN,
} from '.';

interface IProps {
  variant: IFeatureTableVariant;
  assignRenderPlan?: RENDER_PLAN_TYPE[];
}

const FeaturesTableContent: FC<IProps> = ({ variant, assignRenderPlan }) => {
  const { openVideoPopup } = useVideoPopupController();
  const { t } = useTranslation();

  const canRenderPlan = (plan: RENDER_PLAN_TYPE) => {
    // 当 assignRenderPlan 为空时，默认全部渲染
    if (!assignRenderPlan || assignRenderPlan.length <= 0) {
      return true;
    }

    return assignRenderPlan.includes(plan);
  };

  return (
    <Stack spacing={4}>
      {PLAN_FEATURES_CATEGORY.map((category) => (
        <Stack key={category.name}>
          <Stack direction='row' p={2} alignItems='center' spacing={1}>
            {category.icon && <FeaturesCategoryIcon name={category.icon} />}
            <Typography variant='body2' fontWeight={700} color={'primary.main'}>
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
                      const FeatureItemCom = (
                        <Stack
                          direction={'row'}
                          alignItems='center'
                          spacing={0.25}
                          onClick={() => {
                            feature.youtube &&
                              openVideoPopup(feature.youtube.link);
                          }}
                        >
                          <Typography
                            variant='custom'
                            fontSize={16}
                            fontWeight={500}
                            color='text.primary'
                          >
                            {t(feature.title)}
                          </Typography>
                          {feature.desc && (
                            <Typography
                              variant='custom'
                              fontSize={14}
                              color='text.secondary'
                              sx={{
                                letterSpacing: '-0.42px',
                              }}
                            >
                              {t(feature.desc)}
                            </Typography>
                          )}
                        </Stack>
                      );

                      return (
                        <Stack
                          key={feature.title}
                          direction={'row'}
                          alignItems='center'
                          spacing={1}
                          sx={{
                            flex: 1,
                            borderRight: notRightBorder
                              ? '0px solid'
                              : '1px solid',
                            borderColor: '#E0E0E0',
                            px: 2,
                            py: 1,
                            minWidth: '230px',
                          }}
                        >
                          {feature.icon && (
                            <FeaturesIcon name={feature.icon} fontSize={24} />
                          )}
                          {feature.tooltip && feature.tooltip.desc ? (
                            <WikiText
                              key={feature.title}
                              tooltipProps={{
                                placement: 'top',
                              }}
                              textProps={{
                                sx: {
                                  width: 'max-content',
                                },
                              }}
                              wiki={
                                <Stack
                                  spacing={1.2}
                                  component='div'
                                  width={240}
                                >
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
                          {feature.youtube && (
                            <Stack
                              direction={'row'}
                              alignItems='center'
                              spacing={0.25}
                              sx={{
                                borderRadius: 99,
                                opacity: 0.87,
                                pl: 0.25,
                                pr: 0.5,
                                py: 0.25,
                                bgcolor: 'rgba(0, 0, 0, 0.08)',
                                color: 'text.secondary',
                                cursor: 'pointer',
                              }}
                              onClick={() => {
                                feature.youtube &&
                                  openVideoPopup(feature.youtube.link);
                              }}
                            >
                              <PlayCircleFilledWhiteOutlinedIcon
                                sx={{
                                  fontSize: 16,
                                }}
                              />
                              <Typography variant='custom' fontSize={14}>
                                {feature.youtube.time}
                              </Typography>
                            </Stack>
                          )}
                        </Stack>
                      );
                    })}
                  </Stack>
                );
              }

              // 后面的 plan features 列
              if (!canRenderPlan(column as RENDER_PLAN_TYPE)) {
                return null;
              }

              return (
                <Stack
                  key={column}
                  flex={1}
                  sx={{
                    minWidth: '230px',
                  }}
                >
                  {category.features.map((feature) => {
                    const planeStatus = feature.planStatus[column];

                    return (
                      <Stack
                        direction={'row'}
                        key={feature.title}
                        alignItems='center'
                        spacing={1}
                        sx={{
                          flex: 1,
                          borderRight: notRightBorder
                            ? '0px solid'
                            : '1px solid',
                          borderColor: '#E0E0E0',
                          px: 2,
                          py: 1.5,
                        }}
                      >
                        {planeStatus.status === 'all' && (
                          <CheckOutlinedIcon
                            sx={{
                              color: '#34A853',
                            }}
                          />
                        )}
                        {planeStatus.status === 'limit' && <LimitStatusIcon />}
                        {planeStatus.status === 'none' && (
                          <ClearOutlinedIcon
                            sx={{
                              color: '#DB4437',
                            }}
                          />
                        )}

                        <Typography
                          variant='custom'
                          fontSize={16}
                          fontWeight={500}
                          color='text.primary'
                        >
                          {t(planeStatus.statusText)}
                        </Typography>
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

const LimitStatusIcon = () => {
  return (
    <SvgIcon>
      <svg viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <g mask='url(#mask0_5800_57258)'>
          <path
            d='M7.80733 7.64777C8.95898 7.04733 10.2531 6.67471 11.6336 6.59304C16.0482 6.33188 19.9366 9.12966 21.2337 13.152C21.5316 14.0713 21.6932 15.052 21.6945 16.0703L21.6946 16.0831C21.6946 16.8115 21.1041 17.4019 20.3758 17.4019C19.6474 17.4019 19.0567 16.8112 19.0567 16.0829C19.0567 15.8255 19.0416 15.5713 19.0139 15.3213C18.9829 15.0381 18.9348 14.7604 18.8707 14.4894C18.8379 14.3512 18.8014 14.2142 18.7603 14.0794C17.861 11.112 15.02 9.03477 11.7888 9.22592C11.099 9.26672 10.4391 9.40809 9.82237 9.63493L7.80733 7.64777Z'
            fill='#F4C06D'
          />
          <path
            d='M6.57868 12.132L5.09617 9.76385C4.00496 10.9913 3.23018 12.5001 2.88989 14.1573C2.76184 14.7792 2.69458 15.4233 2.69458 16.0831C2.69458 16.8114 3.28502 17.4019 4.01337 17.4019C4.74172 17.4019 5.33216 16.8114 5.33216 16.0831C5.33216 14.8552 5.65467 13.7027 6.21959 12.7055L6.21722 12.7038C6.32842 12.5071 6.4491 12.3163 6.57868 12.132Z'
            fill='#F4C06D'
          />
          <path
            d='M13.223 17.2143C13.5251 16.9745 13.713 16.6485 13.7865 16.2364C13.8601 15.8243 13.754 15.4747 13.4684 15.1877L6.56783 8.16179C6.49167 8.08525 6.40586 8.04686 6.31042 8.04663C6.21498 8.0464 6.12137 8.08053 6.02958 8.14903C5.94925 8.21374 5.89942 8.29378 5.88011 8.38918C5.86079 8.48457 5.87965 8.58006 5.93668 8.67564L11.162 16.9802C11.3788 17.3281 11.6961 17.5188 12.1141 17.5523C12.532 17.5858 12.9017 17.4731 13.223 17.2143Z'
            fill='#F4C06D'
          />
        </g>
      </svg>
    </SvgIcon>
  );
};

export default FeaturesTableContent;
