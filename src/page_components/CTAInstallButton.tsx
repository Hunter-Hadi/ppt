import { Button, ButtonProps, SxProps } from '@mui/material';
import React, { FC, HTMLAttributeAnchorTarget } from 'react';

import CustomIcon from '@/components/CustomIcon';
import ProLink from '@/components/ProLink';
import useShareTrackerLink, {
  IUseShareTrackerLinkProps,
} from '@/hooks/useShareTrackerLink';
import { getBrowserAgent } from '@/utils/utils';

interface IProps {
  sx?: SxProps;
  target?: HTMLAttributeAnchorTarget;
  variant?: ButtonProps['variant'];
  showAgent?: 'Edge' | 'Chrome';
  trackerLinkProps?: IUseShareTrackerLinkProps;
}

const CTAInstallButton: FC<IProps> = ({
  sx,
  target = '_blank',
  variant = 'outlined',
  showAgent,
  trackerLinkProps = {},
}) => {
  const { extensionLink, links, ref } = useShareTrackerLink({
    ...trackerLinkProps,
    agent: showAgent,
  });
  const agent = showAgent ?? getBrowserAgent();

  const iconName = agent === 'Edge' ? 'EdgeColor' : 'ChromeColor';

  const label =
    agent === 'Edge' ? 'Add to Edge for free' : 'Add to Chrome for free';

  return (
    <ProLink
      target={target}
      href={
        showAgent === 'Edge' ? links[showAgent] + `?ref=${ref}` : extensionLink
      }
    >
      <Button
        startIcon={
          <CustomIcon
            icon={iconName}
            sx={{
              fontSize: '36px !important',
            }}
          />
        }
        variant={variant}
        sx={{
          // width: { xs: '100%', sm: 300 },
          height: 64,
          fontSize: 20,
          fontWeight: 600,
          px: 3,
          py: 1.5,
          ...sx,
        }}
      >
        {label}
      </Button>
    </ProLink>
  );
};

export default CTAInstallButton;
