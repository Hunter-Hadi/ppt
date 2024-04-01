import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import React, { FC, useState } from 'react';

import ProLink from '@/components/ProLink';

interface IProps {
  isSmallScreen?: boolean;
}

const FEATURES_MENU_LIST = [
  {
    label: 'features_landing:youtube_summary_pages__title',
    href: '/features/youtubesummary',
  },
  {
    label: 'features_landing:chat_pdf_pages__title',
    href: '/features/chatpdf',
  },
  {
    label: 'features_landing:translate_pages__title',
    href: '/features/translate',
  },
  { label: 'features_landing:vision_pages__title', href: '/features/vision' },
];

const FeaturesItem: FC<IProps> = ({ isSmallScreen }) => {
  const { t } = useTranslation();

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

  return (
    <>
      {/* 小屏幕显示 */}
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
            onClick={() => {}}
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant='custom' fontSize={16} fontWeight={600}>
              {t('modules:header__menu__features')}
            </Typography>
            <ExpandLessIcon
              sx={{
                width: 24,
                height: 24,
                rotate: expanded === 'panel1' ? 0 : '180deg',
                transition: 'all 0.3s ease',
              }}
            />
          </MenuItem>
        </MuiAccordionSummary>
        <MuiAccordionDetails sx={{ padding: '0 16px 8px 16px' }}>
          {FEATURES_MENU_LIST.map((industriesItem) => (
            <MenuItem
              key={industriesItem.href}
              sx={{
                borderRadius: '8px',
                mb: 1,
                p: 0,
              }}
            >
              <ProLink
                href={industriesItem.href}
                color='inherit'
                hardRefresh
                sx={{
                  width: '100%',
                  py: 1,
                  px: 2,
                }}
              >
                <Typography variant='custom' fontSize={16} fontWeight={600}>
                  {t(industriesItem.label)}
                </Typography>
              </ProLink>
            </MenuItem>
          ))}
        </MuiAccordionDetails>
      </MuiAccordion>

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
          <ExpandLessIcon
            sx={{
              width: 24,
              height: 24,
              rotate: open ? 0 : '180deg',
              transition: 'all 0.3s ease',
            }}
          />
        }
      >
        {t('modules:header__menu__features')}
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
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
        {FEATURES_MENU_LIST.map((industriesItem) => (
          <MenuItem
            key={industriesItem.href}
            sx={{
              borderRadius: '8px',
              fontSize: '16px !important',
              fontWeight: 600,
              mb: 2,
              p: 0,
            }}
          >
            <ProLink
              href={industriesItem.href}
              color='inherit'
              hardRefresh
              sx={{
                width: '100%',
                py: 1,
                px: 2,
              }}
            >
              {t(industriesItem.label)}
            </ProLink>
          </MenuItem>
        ))}
      </Menu>
    </>
  );

  // return (
  //   <Stack py={1.5} px={2}>
  //     <Typography
  //       variant='custom'
  //       fontSize={16}
  //       fontWeight={500}
  //       lineHeight={1.5}
  //     >
  //       {t('modules:header__menu__features')}
  //     </Typography>
  //   </Stack>
  // );
};

export default FeaturesItem;
