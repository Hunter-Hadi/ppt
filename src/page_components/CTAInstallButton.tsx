import {
  Button,
  ButtonProps,
  SxProps,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { FC, HTMLAttributeAnchorTarget, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import CustomIcon from '@/components/CustomIcon';
import useBrowserAgent from '@/hooks/useBrowserAgent';
import useShareTrackerLink, {
  IUseShareTrackerLinkProps,
} from '@/hooks/useShareTrackerLink';

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
}) => {
  const theme = useTheme();
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm')); // 屏幕宽度小于 768 时为 true

  const { t } = useTranslation('button');

  const { extensionLink, links, ref } = useShareTrackerLink({
    ...trackerLinkProps,
    agent: showAgent,
  });

  const { browserAgent } = useBrowserAgent();

  const agent = showAgent ?? browserAgent;

  const iconName = agent === 'Edge' ? 'EdgeColor' : 'ChromeColor';

  const label = useMemo(() => {
    if (text) {
      return text;
    }

    if (adaptiveLabel && isDownSm) {
      return agent === 'Edge'
        ? t('add_to_edge_for_free__mini')
        : t('add_to_chrome_for_free__mini');
    }

    return agent === 'Edge'
      ? t('add_to_edge_for_free')
      : t('add_to_chrome_for_free');
  }, [agent, t, adaptiveLabel, isDownSm, text]);

  const href = useMemo(() => {
    if (agent === 'Edge') {
      return (
        links[agent] + `?ref=${agent === 'Edge' ? '[maxai-edge]_' : ''}${ref}`
      );
    }

    return extensionLink;
  }, [extensionLink, agent, links, ref]);

  const sxCache = useMemo(() => {
    return {
      // width: { xs: '100%', sm: 300 },
      height: 64,
      fontSize: 16,
      fontWeight: 600,
      px: {
        xs: 1.5,
        sm: 3,
      },
      py: 1.5,
      borderRadius: 2,
      ...sx,
    };
  }, [sx]);

  return (
    <Button
      href={href}
      target={target}
      startIcon={
        <CustomIcon
          icon={iconName}
          sx={{
            fontSize: `${iconSize}px !important`,
          }}
        />
      }
      variant={variant}
      sx={sxCache}
    >
      {label}
    </Button>
  );
};

export default CTAInstallButton;
