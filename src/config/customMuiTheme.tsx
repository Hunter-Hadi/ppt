import { createTheme, responsiveFontSizes } from '@mui/material';
import NextLink, { LinkProps } from 'next/link';
import React, { forwardRef } from 'react';

import globalFont from '@/config/font';

type CustomColor = {
  main: React.CSSProperties['color'];
  hoverColor: React.CSSProperties['color'];
  borderColor: React.CSSProperties['color'];
  background: React.CSSProperties['color'];
  paperBackground: React.CSSProperties['color'];
  secondaryBackground: React.CSSProperties['color'];
};

export const customColor = {
  main: '#9065B0',
  hoverColor: '#73518D',
  lightBorderColor: 'rgba(0,0,0,0.08)',
  lightBackground: '#fff',
  lightPaperBackground: '#fff',
  lightSecondaryBackground: '#F4F4F4',

  darkMain: '#9065B0',
  darkBorderColor: 'rgba(255, 255, 255, 0.08)',
  darkBackground: '#202124',
  darkPaperBackground: '#2c2c2c',
  darkSecondaryBackground: '#3B3D3E',
  darkHoverColor: '#A684C0',
};

const getIsDarkMode = () => {
  // 20221121 强制 light mode
  return false;
};

const LinkBehaviour = forwardRef<HTMLAnchorElement, LinkProps>(
  function LinkBehaviour(props, ref) {
    return <NextLink ref={ref} {...props} />;
  },
);

declare module '@mui/material/styles' {
  interface Palette {
    table: {
      title: React.CSSProperties['color'];
      column: React.CSSProperties['color'];
    };
    customColor: CustomColor;
    pageBackground: React.CSSProperties['color'];
  }
  interface PaletteOptions {
    table: {
      title: React.CSSProperties['color'];
      column: React.CSSProperties['color'];
    };
    customColor: CustomColor;
    pageBackground: React.CSSProperties['color'];
  }
  interface TypographyVariants {
    bulleted: React.CSSProperties;
    numbered: React.CSSProperties;
    custom: React.CSSProperties;
    buttonText: React.CSSProperties;
  }
  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    bulleted?: React.CSSProperties;
    numbered?: React.CSSProperties;
    custom?: React.CSSProperties;
    buttonText?: React.CSSProperties;
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

const customMuiTheme = responsiveFontSizes(
  createTheme({
    typography: {
      allVariants: {
        fontFamily: `${globalFont.style.fontFamily}, sans-serif, -apple-system,
            BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
            Fira Sans, Droid Sans, Helvetica Neue !important;`,
      },
      h1: {
        fontSize: 32,
        fontWeight: 900,
        lineHeight: 1.25,
        letterSpacing: -0.51,
      },
      h2: {
        fontSize: 22,
        fontWeight: 800,
        lineHeight: 1.272,
      },
      h3: {
        fontSize: 20,
        fontWeight: 800,
        lineHeight: 1.2,
      },
      body1: {
        fontSize: 20,
        fontWeight: 400,
        lineHeight: 1.6,
        letterSpacing: -0.06,
        paragraphSpacing: 32,
      },
      body2: {
        fontSize: 16,
        fontWeight: 400,
        lineHeight: 1.5,
      },
      caption: {
        fontSize: 14,
        fontWeight: 400,
        lineHeight: 1.428,
      },
      bulleted: {
        fontSize: 20,
        fontWeight: 400,
        lineHeight: 1.4,
        letterSpacing: -0.06,
      },
      numbered: {
        fontSize: 16,
        fontWeight: 400,
        lineHeight: 1.4,
        letterSpacing: -0.06,
      },
      buttonText: {
        fontSize: 16,
        fontWeight: 700,
        lineHeight: 1.5,
      },
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
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
      MuiButtonBase: {
        defaultProps: {
          LinkComponent: LinkBehaviour,
        },
      },
    },
    palette: {
      primary: {
        main: customColor.main,
      },
      mode: getIsDarkMode() ? 'dark' : 'light',
      background: {
        paper: getIsDarkMode() ? customColor.darkPaperBackground : '#ffffff',
        default: getIsDarkMode() ? customColor.darkBackground : '#ffffff',
      },
      pageBackground: getIsDarkMode()
        ? customColor.darkBackground
        : customColor.lightBackground,
      customColor: {
        main: customColor.main,
        borderColor: getIsDarkMode()
          ? customColor.darkBorderColor
          : customColor.lightBorderColor,
        background: getIsDarkMode()
          ? customColor.darkBackground
          : customColor.lightBackground,
        paperBackground: getIsDarkMode()
          ? customColor.darkPaperBackground
          : customColor.lightPaperBackground,
        secondaryBackground: getIsDarkMode()
          ? customColor.darkSecondaryBackground
          : customColor.lightSecondaryBackground,
        hoverColor: getIsDarkMode()
          ? customColor.darkHoverColor
          : customColor.hoverColor,
      },
      table: {
        title: getIsDarkMode() ? customColor.darkBackground : '#f5f5f5',
        column: getIsDarkMode() ? customColor.darkPaperBackground : '#ffffff',
      },
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

export default customMuiTheme;
