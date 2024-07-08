import MuiAvatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';

import { useCommonUserProfile } from '@/packages/auth';
import { useConnectMaxAIAccount } from '@/packages/auth/hooks/useConnectMaxAIAccount';
import {
  COMMON_MAXAI_APP_PROJECT_HOST,
  useMaxAITranslation,
} from '@/packages/common';

export interface IAuthAvatarProps {
  logoutRedirectUrl?: string;
}

const AuthAvatar: FC<IAuthAvatarProps> = ({ logoutRedirectUrl }) => {
  const { isLogin, sigOutMaxAIAccount } = useConnectMaxAIAccount();
  const { userProfile } = useCommonUserProfile();
  const { t } = useMaxAITranslation();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!isLogin || !userProfile) {
    return null;
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title={t('package__auth:auth_avatar__account_settings')}>
          <IconButton
            onClick={handleClick}
            size='small'
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
          >
            <MuiAvatar sx={{ width: 32, height: 32, lineHeight: 'unset' }}>
              {userProfile && userProfile.email
                ? userProfile.email.slice(0, 1).toUpperCase()
                : 'M'}
            </MuiAvatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem disabled>
          <Typography variant={'body2'}>{userProfile?.email}</Typography>
        </MenuItem>
        <MenuItem
          component={'a'}
          href={`${COMMON_MAXAI_APP_PROJECT_HOST}/my-plan`}
          onClick={() => {
            handleClose();
          }}
        >
          <Typography variant={'body2'}>
            {t('package__auth:auth_avatar__menu_item__my_plan')}
          </Typography>
        </MenuItem>
        <MenuItem
          component={'a'}
          href={`${COMMON_MAXAI_APP_PROJECT_HOST}/rewards`}
          onClick={() => {
            handleClose();
          }}
        >
          <Typography variant={'body2'}>
            {t('package__auth:auth_avatar__menu_item__rewards')}
          </Typography>
        </MenuItem>
        <MenuItem
          component={'a'}
          href={`${COMMON_MAXAI_APP_PROJECT_HOST}/get-started`}
          onClick={() => {
            handleClose();
          }}
        >
          <Typography variant={'body2'}>
            {t('package__auth:auth_avatar__menu_item__get_started')}
          </Typography>
        </MenuItem>

        <MenuItem
          onClick={() => {
            sigOutMaxAIAccount(logoutRedirectUrl);
          }}
        >
          <Typography variant={'body2'}>
            {t('package__auth:auth_avatar__menu_item__log_out')}
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default AuthAvatar;
