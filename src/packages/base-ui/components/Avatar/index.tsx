import LoadingButton from '@mui/lab/LoadingButton';
import MuiAvatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React, { FC, useEffect } from 'react';
import {
  authLogout,
  getAccessToken,
  useCommonUserProfile,
} from 'src/packages/auth';

import {
  COMMON_MAXAI_API_HOST,
  MAXAI_CHROME_EXTENSION_APP_HOMEPAGE_URL,
} from '@/features/common/constants';
import { useConnectMaxAIAccount } from '@/packages/auth/hooks/useConnectMaxAIAccount';

const Avatar: FC = () => {
  const { isLogin, sigOutMaxAIAccount } = useConnectMaxAIAccount();
  const { userProfile } = useCommonUserProfile();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [deleteAccountModalOpen, setDeleteAccountModalOpen] =
    React.useState<boolean>(false);

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
        <Tooltip title='Account settings'>
          <IconButton
            onClick={handleClick}
            size='small'
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
          >
            <MuiAvatar sx={{ width: 32, height: 32 }}>
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
          href={`${MAXAI_CHROME_EXTENSION_APP_HOMEPAGE_URL}/my-plan`}
          onClick={() => {
            handleClose();
          }}
        >
          <Typography variant={'body2'}>My Plan</Typography>
        </MenuItem>
        <MenuItem
          component={'a'}
          href={`${MAXAI_CHROME_EXTENSION_APP_HOMEPAGE_URL}/rewards`}
          onClick={() => {
            handleClose();
          }}
        >
          <Typography variant={'body2'}>Rewards</Typography>
        </MenuItem>
        <MenuItem
          component={'a'}
          href={`${MAXAI_CHROME_EXTENSION_APP_HOMEPAGE_URL}/get-started`}
          onClick={() => {
            handleClose();
          }}
        >
          <Typography variant={'body2'}>Get started</Typography>
        </MenuItem>
        {/* TODO: 公共模块中的 avatar 展示不提供 Deactivate account 入口 */}
        {/* <MenuItem
          onClick={() => {
            setDeleteAccountModalOpen(true);
          }}
        >
          <Typography variant={'body2'}>Deactivate account</Typography>
        </MenuItem> */}
        <MenuItem
          onClick={() => {
            sigOutMaxAIAccount();
          }}
        >
          <Typography variant={'body2'}>Log out</Typography>
        </MenuItem>
      </Menu>
      <DeleteAccountModal
        show={deleteAccountModalOpen}
        onClose={() => {
          setDeleteAccountModalOpen(false);
        }}
      />
    </>
  );
};
const DeleteAccountModal: FC<{
  show: boolean;
  onClose?: () => void;
}> = (props) => {
  const { show, onClose } = props;
  const [loading, setLoading] = React.useState<boolean>(false);
  const [reason, setReason] = React.useState<string>('');
  useEffect(() => {
    setReason('');
  }, [show]);
  return (
    <Modal onClose={onClose} open={show}>
      <Paper
        sx={{
          width: '100%',
          height: 'unset',
          maxWidth: 800,
          margin: '5vh auto',
        }}
      >
        <Stack p={2} spacing={2}>
          <Typography fontSize={'20px'} lineHeight={'28px'} fontWeight={700}>
            Deactivate account
          </Typography>
          <Typography
            color={'#db4437'}
            fontSize={'16px'}
            lineHeight={'24px'}
            fontWeight={600}
          >
            This action will permanently deactivate your account.
          </Typography>
          <Stack spacing={2}>
            <Typography fontSize={'16px'} lineHeight={'24px'}>
              {`You're about to start the process of deactivating your MaxAI.Me
            account and erase all associated data. This action is irreversible.
            By proceeding with this action, you will:`}
            </Typography>
            <Typography fontSize={'16px'} lineHeight={'24px'}>
              1. Permanently deactivate your account.
            </Typography>
            <Typography fontSize={'16px'} lineHeight={'24px'}>
              2. Erase all your personal data, history, preferences, and any
              associated content.
            </Typography>
            <Typography fontSize={'16px'} lineHeight={'24px'}>
              3. Remove all your subscription status with no refund.
            </Typography>
          </Stack>
          <Typography fontSize={'16px'} lineHeight={'24px'} fontWeight={600}>
            {`(Please note that this action is irreversible and you won't be able to recover any data once the account is deactivated.)`}
          </Typography>
          <Typography fontSize={'16px'} lineHeight={'24px'} fontWeight={600}>
            By clicking confirm, you are confirming you have read all the above
            information carefully.
          </Typography>
          <Divider />
          <Stack spacing={0.5}>
            <Typography fontSize={'16px'} lineHeight={'24px'}>
              Please let us know why you leave?
            </Typography>
            <TextField
              value={reason}
              onChange={(event) => {
                setReason(event.target.value);
              }}
              placeholder={'Help us improve'}
              size={'small'}
            />
          </Stack>
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'end'}
            spacing={1}
          >
            <LoadingButton
              loading={loading}
              variant={'outlined'}
              color={'primary'}
              onClick={async () => {
                try {
                  setLoading(true);
                  await fetch(
                    COMMON_MAXAI_API_HOST + '/user/delete_user_account',
                    {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${getAccessToken()}`,
                      },
                      body: JSON.stringify({
                        reason,
                      }),
                    },
                  );
                  authLogout();
                } catch (e) {
                  if ((e as any)?.response?.data?.detail) {
                    // show error
                    console.error((e as any)?.response?.data?.detail);
                  }
                } finally {
                  setLoading(false);
                  onClose?.();
                }
              }}
            >
              Confirm deactivation
            </LoadingButton>
            <Button variant={'contained'} color={'primary'} onClick={onClose}>
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Modal>
  );
};
export default Avatar;
