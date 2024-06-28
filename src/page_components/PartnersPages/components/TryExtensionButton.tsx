import { Button, SxProps, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { FC } from 'react';

import { EXTENSION_SHARE_TRACKER_LINK } from '@/global_constants';

interface IProps {
  sx?: SxProps;
  propRef?: string;
  text?: string | null;
  href?: string | null;
  target?: React.HTMLAttributeAnchorTarget;
}

const TryExtensionButton: FC<IProps> = ({
  sx,
  propRef,
  text,
  href,
  target = '_blank',
}) => {
  const { t } = useTranslation();

  return (
    <Button
      href={href ? href : `${EXTENSION_SHARE_TRACKER_LINK}`}
      target={target}
      sx={{
        position: 'absolute',
        top: -24,
        left: '50%',
        bgcolor: '#F4EBFB',
        transform: 'translateX(-50%)',
        borderRadius: 99,
        px: 2,
        py: 1,
        whiteSpace: 'nowrap',
        ...sx,
      }}
    >
      {}
      <Typography color='primary'>
        {text ? text : t('pages:partners__try_our_extension')}
      </Typography>
    </Button>
  );
};

export default TryExtensionButton;
