import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Button, Menu, MenuItem } from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import { useTranslation } from 'next-i18next';
import * as React from 'react';
import { FC, useState } from 'react';

import ProLink from '@/components/ProLink';
import { isInIframe } from '@/utils/utils';

interface IProps {
  isSmallScreen?: boolean;
}

const INDUSTRIES_MENU_LIST = [
  { label: 'industry:executives__title', href: '/use-cases/executives' },
  { label: 'industry:marketing__title', href: '/use-cases/marketing' },
  { label: 'industry:education__title', href: '/use-cases/education' },
  { label: 'industry:consulting__title', href: '/use-cases/consulting' },
  { label: 'industry:hr__title', href: '/use-cases/hr' },
  { label: 'industry:finance__title', href: '/use-cases/finance' },
  { label: 'industry:real_estate__title', href: '/use-cases/real-estate' },
  { label: 'industry:technical__title', href: '/use-cases/tech' },
];

const IndustriesItem: FC<IProps> = ({ isSmallScreen }) => {
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    // setExpanded(false);
  };

  const handleSelectIndustry = (index: number) => {
    console.log('handleSelectIndustry ==> ', index);

    switch (index) {
      case 0:
        window.open('/use-cases/executives', isInIframe() ? '_blank' : '_self');
        break;
      case 1:
        window.open('/use-cases/marketing', isInIframe() ? '_blank' : '_self');
        break;
      case 2:
        window.open('/use-cases/education', isInIframe() ? '_blank' : '_self');
        break;
      case 3:
        window.open('/use-cases/consulting', isInIframe() ? '_blank' : '_self');
        break;
      case 4:
        window.open('/use-cases/hr', isInIframe() ? '_blank' : '_self');
        break;
      case 5:
        window.open('/use-cases/finance', isInIframe() ? '_blank' : '_self');
        break;
      case 6:
        window.open(
          '/use-cases/real-estate',
          isInIframe() ? '_blank' : '_self',
        );
        break;
      case 7:
        window.open('/use-cases/tech', isInIframe() ? '_blank' : '_self');
        break;
      default:
        break;
    }
    handleClose();
  };

  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      console.log('newExpanded ===> ', newExpanded);

      setExpanded(newExpanded ? panel : false);
    };

  return (
    <>
      <MuiAccordion
        disableGutters
        elevation={0}
        square
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
        sx={{
          display: {
            xs: 'block',
            md: 'none',
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
            {t('modules:header__menu__industries')}

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
          {INDUSTRIES_MENU_LIST.map((industriesItem) => (
            <MenuItem
              key={industriesItem.href}
              sx={{
                borderRadius: '8px',
                fontSize: 16,
                fontWeight: 600,
                mb: 1,
                p: 0,
              }}
            >
              <ProLink
                href={industriesItem.href}
                target={isInIframe() ? '_blank' : '_self'}
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
        </MuiAccordionDetails>
      </MuiAccordion>

      <Button
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          display: {
            xs: 'none',
            md: 'flex',
          },
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
        {t('modules:header__menu__industries')}
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
        {INDUSTRIES_MENU_LIST.map((industriesItem) => (
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
              target={isInIframe() ? '_blank' : '_self'}
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
};

export default IndustriesItem;
