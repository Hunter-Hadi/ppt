import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import React from 'react';

import { getIsDarkMode } from '@/config/customMuiTheme';

type CustomColor = {
  main: React.CSSProperties['color'];
  hoverColor: React.CSSProperties['color'];
  borderColor: React.CSSProperties['color'];
  background: React.CSSProperties['color'];
  paperBackground: React.CSSProperties['color'];
  secondaryBackground: React.CSSProperties['color'];
};
const customColor = {
  main: '#9065B0',
  darkMain: '#9065B0',

  hoverColor: '#73518D',
  darkHoverColor: '#A684C0',

  lightBorderColor: 'rgba(0,0,0,0.08)',
  lightBackground: '#fff',
  lightPaperBackground: '#fff',
  lightSecondaryBackground: '#F4F4F4',

  darkBorderColor: 'rgba(255, 255, 255, 0.08)',
  darkBackground: '#202124',
  darkPaperBackground: '#2c2c2c',
  darkSecondaryBackground: '#3B3D3E',
};

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
    table: {
      title: React.CSSProperties['color'];
      column: React.CSSProperties['color'];
    };
    customColor: CustomColor;
    pageBackground: React.CSSProperties['color'];
  }
  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
    table: {
      title: React.CSSProperties['color'];
      column: React.CSSProperties['color'];
    };
    customColor: CustomColor;
    pageBackground: React.CSSProperties['color'];
  }
  interface TypographyVariants {
    custom: React.CSSProperties;
  }
  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    custom?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    bulleted: true;
    numbered: true;
    custom: true;
    buttonText: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    secondary: true;
    normalOutlined: true;
  }
}

const isDarkMode = getIsDarkMode();

const ConversationCustomTheme = responsiveFontSizes(
  createTheme({
    components: {
      MuiTooltip: {
        defaultProps: {},
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            fontSize: '14px',
            textTransform: 'none',
          },
        },
        variants: [
          {
            props: { variant: 'secondary' },
            style: {
              backgroundColor: isDarkMode
                ? 'rgba(255, 255, 255, 0.12)'
                : 'rgba(0, 0, 0, 0.08)',
              color: isDarkMode
                ? 'rgba(255, 255, 255, 0.3)'
                : 'rgba(0, 0, 0, 0.38)',
              '&:hover': {
                backgroundColor: isDarkMode
                  ? 'rgba(255, 255, 255, 0.2)'
                  : 'rgba(0, 0, 0, 0.1)',
                color: isDarkMode
                  ? 'rgba(255, 255, 255, 0.3)'
                  : 'rgba(0, 0, 0, 0.38)',
              },
            },
          },
          {
            props: { variant: 'normalOutlined' },
            style: {
              backgroundColor: 'transparent',
              border: '1px solid',
              color: isDarkMode
                ? 'rgba(255, 255, 255, 1)'
                : 'rgba(0, 0, 0, 0.87)',
              borderColor: isDarkMode
                ? 'rgba(255, 255, 255, 0.23)'
                : 'rgba(0, 0, 0, 0.23)',
              '&:hover': {
                backgroundColor: 'transparent',
                borderColor: isDarkMode
                  ? 'rgba(255, 255, 255, 1)'
                  : 'rgba(0, 0, 0, 0.87)',
              },
            },
          },
        ],
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            width: '100%',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            outline: 'none',
          },
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
      },
      MuiPopover: {
        defaultProps: {
          sx: {
            fontSize: '14px',
          },
        },
      },
    },
    palette: {
      primary: {
        main: isDarkMode ? customColor.darkMain : customColor.main,
      },
      mode: isDarkMode ? 'dark' : 'light',
      background: {
        paper: isDarkMode
          ? customColor.darkPaperBackground
          : customColor.lightPaperBackground,
        default: isDarkMode
          ? customColor.darkBackground
          : customColor.lightBackground,
      },
      customColor: {
        main: customColor.main,
        borderColor: isDarkMode
          ? customColor.darkBorderColor
          : customColor.lightBorderColor,
        background: isDarkMode
          ? customColor.darkBackground
          : customColor.lightBackground,
        paperBackground: isDarkMode
          ? customColor.darkPaperBackground
          : customColor.lightPaperBackground,
        secondaryBackground: isDarkMode
          ? customColor.darkSecondaryBackground
          : customColor.lightSecondaryBackground,
        hoverColor: isDarkMode
          ? customColor.darkHoverColor
          : customColor.hoverColor,
      },
      neutral: {
        main: 'rgba(0, 0, 0, 0.4)',
        contrastText: 'rgba(0, 0, 0, 0.6)',
      },
      table: {
        title: isDarkMode ? customColor.darkBackground : '#f5f5f5',
        column: isDarkMode ? customColor.darkPaperBackground : '#ffffff',
      },
      pageBackground: isDarkMode
        ? customColor.darkBackground
        : customColor.lightBackground,
    },
    breakpoints: {
      values: {
        xs: 320,
        sm: 768,
        md: 1024,
        lg: 1280,
        xl: 1440,
      },
    },
  }),
);

export default ConversationCustomTheme;
