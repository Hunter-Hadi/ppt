import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { TFunction, useTranslation } from 'next-i18next';
import React, { FC, useState } from 'react';

import ProLink from '@/components/ProLink';
import { removeLocaleInPathname } from '@/i18n/utils';

interface IProps {
  isSmallScreen?: boolean;
  menulist: {
    label: string | ((t: TFunction) => React.ReactNode);
    href: string;
  }[];
  children: React.ReactNode;
}

const DropdownMenuItem: FC<IProps> = ({
  isSmallScreen,
  children,
  menulist,
}) => {
  const { t } = useTranslation();

  const router = useRouter();
  const pathname = removeLocaleInPathname(router.pathname);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    // setExpanded(false);
  };

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      console.log('newExpanded ===> ', newExpanded);

      setExpanded(newExpanded ? panel : false);
    };

  if (isSmallScreen) {
    // 小屏幕显示
    return (
      <MuiAccordion
        disableGutters
        elevation={0}
        square
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
        sx={{
          display: isSmallScreen ? 'block' : 'none',
          '&::before': {
            content: 'none',
          },
        }}
      >
        <MuiAccordionSummary
          component='li'
          aria-controls='panel1d-content'
          id='panel1d-header'
          sx={{
            padding: 0,
            '& .MuiAccordionSummary-content': {
              margin: 0,
            },
          }}
        >
          <MenuItem
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              py: 2,
            }}
          >
            {children}
            <ChevronRightOutlinedIcon
              sx={{
                width: 24,
                height: 24,
                rotate: expanded === 'panel1' ? '90deg' : 0,
                transition: 'all 0.3s ease',
              }}
            />
          </MenuItem>
        </MuiAccordionSummary>
        <MuiAccordionDetails sx={{ padding: '0 16px 8px 16px' }}>
          {menulist.map((menuItem) => (
            <MenuItem
              key={menuItem.href}
              selected={pathname === menuItem.href}
              sx={{
                borderRadius: '8px',
                mb: 1,
                p: 0,
              }}
            >
              <ProLink
                href={menuItem.href}
                color='inherit'
                hardRefresh
                sx={{
                  width: '100%',
                  py: 1,
                  px: 2,
                }}
              >
                <Typography variant='custom' fontSize={16} fontWeight={500}>
                  {typeof menuItem.label === 'function'
                    ? menuItem.label(t)
                    : t(menuItem.label)}
                </Typography>
              </ProLink>
            </MenuItem>
          ))}
        </MuiAccordionDetails>
      </MuiAccordion>
    );
  } else {
    return (
      <>
        {/* 大屏幕显示 */}
        <Button
          onClick={handleClick}
          sx={{
            display: isSmallScreen ? 'none' : 'flex',
            fontSize: 16,
            fontWeight: 500,
            lineHeight: 1.5,
            color: 'text.primary',
            px: 2,
            py: 1.5,
            '&:hover': {
              backgroundColor: '#eee',
            },
            '&:active': {
              backgroundColor: 'rgba(0,0,0,0.08)',
            },
            '& .MuiButton-endIcon': {
              ml: 0.5,
            },
          }}
          endIcon={
            <ChevronRightOutlinedIcon
              sx={{
                width: 24,
                height: 24,
                rotate: open ? '90deg' : 0,
                transition: 'all 0.3s ease',
              }}
            />
          }
        >
          {children}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          sx={{
            display: {
              xs: 'none',
              md: 'block',
            },
            '& .MuiPaper-root': {
              width: '320px',
              mt: { xs: 1, sm: '21px' },
              ml: '22px',
              borderRadius: '0 0 8px 8px',
              'box-shadow': '0px 2px 8px 0px #00000014',
              padding: '16px 16px 0 16px',
            },
            '& .MuiList-root': {
              padding: 0,
            },
          }}
        >
          {menulist.map((menuItem) => (
            <MenuItem
              key={menuItem.href}
              selected={pathname === menuItem.href}
              sx={{
                borderRadius: '8px',
                fontSize: '16px !important',
                fontWeight: 600,
                mb: 2,
                p: 0,
              }}
            >
              <ProLink
                href={menuItem.href}
                color='inherit'
                hardRefresh
                sx={{
                  width: '100%',
                  py: 1,
                  px: 2,
                }}
              >
                {typeof menuItem.label === 'function'
                  ? menuItem.label(t)
                  : t(menuItem.label)}
              </ProLink>
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  }
};

export default DropdownMenuItem;
