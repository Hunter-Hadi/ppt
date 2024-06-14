import {
  Button,
  buttonClasses,
  ButtonProps,
  SxProps,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { FC, HTMLAttributeAnchorTarget, useMemo } from 'react';

import CustomIcon from '@/components/CustomIcon';
import useLandingABTester from '@/features/ab_tester/hooks/useLandingABTester';
import { mixpanelTrack } from '@/features/mixpanel/utils';
import useFunnelSurveyController from '@/features/survey/hooks/useFunnelSurveyController';
import useBrowserAgent from '@/hooks/useBrowserAgent';
import useShareTrackerLink, {
  IUseShareTrackerLinkProps,
} from '@/hooks/useShareTrackerLink';
import { openWindow } from '@/utils/utils';

interface IProps {
  sx?: SxProps;
  target?: HTMLAttributeAnchorTarget;
  variant?: ButtonProps['variant'];
  showAgent?: 'Edge' | 'Chrome';
  trackerLinkProps?: IUseShareTrackerLinkProps;
  iconSize?: number;
  text?: string;

  // 是否开启 label 自适应长度（屏幕宽度变小，文本变短）
  adaptiveLabel?: boolean;

  startIcon?: ButtonProps['startIcon'];
  endIcon?: ButtonProps['endIcon'];

  onClick?: (e: React.MouseEvent) => void;
}

const CTAInstallButton: FC<IProps> = ({
  sx,
  target = '_blank',
  variant = 'outlined',
  showAgent,
  trackerLinkProps = {},
  iconSize = 32,
  text,

  adaptiveLabel = false,

  startIcon,
  endIcon,

  onClick,
}) => {
  const route = useRouter();
  const isEmbedMode = route.pathname === '/embed/introduction';
  const theme = useTheme();
  // const isDownSm = useMediaQuery(theme.breakpoints.down('sm')); // 屏幕宽度小于 768 时为 true
  const isDownLg = useMediaQuery(theme.breakpoints.down('lg')); // 屏幕宽度小于 1280 时为 true

  const { installOpenWithNewWindow } = useLandingABTester();

  const { t } = useTranslation();

  const { extensionLink, links, ref } = useShareTrackerLink({
    ...trackerLinkProps,
    agent: showAgent,
  });

  const { browserAgent } = useBrowserAgent();

  const { reStartOpenPopupTimer } = useFunnelSurveyController(
    'SURVEY_INSTALL_DROPPED',
  );

  const agent = showAgent ?? browserAgent;

  const iconName = agent === 'Edge' ? 'EdgeColor' : 'ChromeColor';

  const label = useMemo(() => {
    if (text || text === '') {
      return text;
    }
    if (isEmbedMode) {
      if (isDownLg) {
        return agent === 'Edge'
          ? t('button:external_add_to_edge_for_free__mini')
          : t('button:external_add_to_chrome_for_free__mini');
      }
      return agent === 'Edge'
        ? t('button:external_add_to_edge_for_free')
        : t('button:external_add_to_chrome_for_free');
    } else {
      if (adaptiveLabel && isDownLg) {
        return agent === 'Edge'
          ? t('button:add_to_edge_for_free__mini')
          : t('button:add_to_chrome_for_free__mini');
      }
      return agent === 'Edge'
        ? t('button:add_to_edge_for_free')
        : t('button:add_to_chrome_for_free');
    }
  }, [agent, t, adaptiveLabel, isDownLg, text, isEmbedMode]);

  const href = useMemo(() => {
    if (agent === 'Edge') {
      return links[agent];
    }

    return extensionLink;
  }, [extensionLink, agent, links]);

  const sxCache = useMemo(() => {
    if (isEmbedMode && (sx as any)?.fontSize?.xs === 32) {
      (sx as any).fontSize.xs = 26;
    }
    return {
      // width: { xs: '100%', sm: 300 },
      height: 64,
      fontSize: {
        xs: 14,
        lg: isEmbedMode ? 14 : 18,
      },
      fontWeight: 600,
      px: {
        xs: 1.5,
        lg: 3,
      },
      py: 1.5,
      borderRadius: 2,

      [`.${buttonClasses.startIcon}`]:
        label.length <= 0
          ? {
              m: 0,
            }
          : {
              mr: 1.5,
            },

      ...sx,
    };
  }, [sx, isEmbedMode, label]);

  const handleClick = (e: React.MouseEvent) => {
    if (installOpenWithNewWindow) {
      e.preventDefault;
      openWindow(href);
    }
    reStartOpenPopupTimer(30 * 1000); // 30s
    mixpanelTrack('install_started', {
      ref,
    });

    onClick && onClick(e);
  };

  return (
    <Button
      {...(installOpenWithNewWindow
        ? {}
        : {
            component: 'a',
            href,
            target,
          })}
      startIcon={
        startIcon || startIcon === null ? (
          startIcon
        ) : (
          <CustomIcon
            icon={iconName}
            sx={{
              filter: 'drop-shadow(0px 0px 4px #403d3d8c)',
              fontSize: `${iconSize}px !important`,
              color: 'red',
            }}
          />
        )
      }
      endIcon={endIcon}
      variant={variant}
      sx={sxCache}
      onClick={handleClick}
    >
      {label}
    </Button>
  );
};

export default CTAInstallButton;
