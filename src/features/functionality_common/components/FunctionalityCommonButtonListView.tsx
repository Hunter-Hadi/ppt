import Box from '@mui/material/Box';
import Button, { ButtonTypeMap } from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'next-i18next';
import React from 'react';

import FunctionalityCommonIcon, {
  IFunctionalityIconProps,
} from './FunctionalityCommonIcon';
import FunctionalityCommonTooltip from './FunctionalityCommonTooltip';

export type ButtonConfig = {
  type: 'button' | 'icons';
  tooltip: string; // This will be the i18n translation key for the tooltip
  btnProps?: ButtonTypeMap<{}, 'button'> & { children: React.ReactNode };
  icons?: ({
    name: string;
    onClick: () => void;
  } & IFunctionalityIconProps)[];
};

type FunctionalityCommonButtonListViewProps = {
  buttonConfigs: ButtonConfig[];
};

export const FunctionalityCommonButtonListView: React.FC<
  FunctionalityCommonButtonListViewProps
> = ({ buttonConfigs }) => {
  const { t } = useTranslation();

  return (
    <Grid
      container
      justifyContent='center'
      alignItems='center'
      flexWrap='wrap'
      spacing={2}
    >
      {buttonConfigs.map((config, index) => {
        return (
          <Grid item key={index} xs={6} md={2}>
            <FunctionalityCommonTooltip title={t(config.tooltip)}>
              <React.Fragment>
                {config.type === 'button' && (
                  <Button
                    {...{
                      sx: {
                        height: 48,
                        width: '100%',
                        size: 'large',
                        variant: '',
                      },
                      ...config.btnProps,
                    }}
                  >
                    {config.btnProps?.children}
                  </Button>
                )}
                {config.type === 'icons' &&
                  config.icons?.map(({ onClick, ...iconProps }, index) => (
                    <Box key={index} onClick={onClick}>
                      <FunctionalityCommonIcon
                        sx={{
                          cursor: 'pointer',
                          fontSize: 35,
                        }}
                        {...iconProps}
                      />
                    </Box>
                  ))}
              </React.Fragment>
            </FunctionalityCommonTooltip>
          </Grid>
        );
      })}
    </Grid>
  );
};
