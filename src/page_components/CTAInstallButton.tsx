import { Button, ButtonProps, SxProps } from '@mui/material';
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
}

const CTAInstallButton: FC<IProps> = ({
  sx,
  target = '_blank',
  variant = 'outlined',
  showAgent,
  trackerLinkProps = {},
  iconSize = 36,
}) => {
  const { t } = useTranslation('button');

  const { extensionLink, links, ref } = useShareTrackerLink({
    ...trackerLinkProps,
    agent: showAgent,
  });

  const { browserAgent } = useBrowserAgent();

  const agent = showAgent ?? browserAgent;

  const iconName = agent === 'Edge' ? 'EdgeColor' : 'ChromeColor';

  const label = useMemo(
    () =>
      agent === 'Edge'
        ? t('add_to_edge_for_free')
        : t('add_to_chrome_for_free'),
    [agent, t],
  );

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
      fontSize: 20,
      fontWeight: 600,
      px: 3,
      py: 1.5,
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
