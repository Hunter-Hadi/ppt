import Box from '@mui/material/Box';
import Button, { ButtonProps } from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import React from 'react';

import UploadButton, {
  IUploadButtonProps,
} from '@/features/common/components/UploadButton';

import FunctionalityCommonIcon, {
  IFunctionalityIconProps,
} from './FunctionalityCommonIcon';
import FunctionalityCommonTooltip from './FunctionalityCommonTooltip';
type IBtnProps = ButtonProps & {
  children: React.ReactNode;
  tooltip?: string;
  tooltipKey?: number | string;
};
export type IButtonConfig = {
  type: 'button' | 'icons' | 'upload';
  isShow?: boolean;
  buttonProps?: IBtnProps;
  iconPropsList?: ({
    name: string;
    tooltip?: string;
    onClick: () => void;
  } & IFunctionalityIconProps)[];
  uploadProps?: IUploadButtonProps & {
    children: React.ReactNode;
    tooltip?: string;
  };
};

type FunctionalityCommonButtonListViewProps = {
  buttonConfigs: IButtonConfig[];
};
/**
 * 公共按钮列表组件 作用是把重复的按钮组件抽离出来，统一高度大小和样式
 */
export const FunctionalityCommonButtonListView: React.FC<
  FunctionalityCommonButtonListViewProps
> = ({ buttonConfigs }) => {
  const getButtonProps = (params: IBtnProps | undefined) => {
    if (params) {
      const { tooltip, tooltipKey, ...buttonProps } = params;
      return buttonProps;
    } else {
      return {};
    }
  };
  return (
    <Grid
      container
      justifyContent='center'
      alignItems='center'
      flexWrap='wrap'
      spacing={2}
    >
      {buttonConfigs.map((config, index) => {
        if (config.isShow === false) return null;
        return (
          <Grid
            item
            key={index}
            xs={6}
            md={2}
            display={config.type === 'icons' ? 'flex' : 'block'}
          >
            <React.Fragment>
              {config.type === 'button' && (
                <FunctionalityCommonTooltip
                  title={config.buttonProps?.tooltip || ''}
                  key={config.buttonProps?.tooltipKey}
                >
                  <Button
                    size='large'
                    {...{
                      sx: {
                        height: 48,
                        width: '100%',
                      },
                      ...getButtonProps(config.buttonProps),
                    }}
                  />
                </FunctionalityCommonTooltip>
              )}
              {config.type === 'icons' &&
                config.iconPropsList?.map(
                  ({ onClick, tooltip, ...iconProps }, index) => (
                    <FunctionalityCommonTooltip
                      key={index}
                      title={tooltip || ''}
                    >
                      <Box
                        sx={{
                          height: 35,
                          cursor: 'pointer',
                        }}
                        onClick={onClick}
                      >
                        <FunctionalityCommonIcon
                          sx={{
                            cursor: 'pointer',
                            fontSize: 35,
                          }}
                          {...iconProps}
                        />
                      </Box>
                    </FunctionalityCommonTooltip>
                  ),
                )}
              {config.type === 'upload' && (
                <FunctionalityCommonTooltip
                  title={config.uploadProps?.tooltip || ''}
                >
                  <Box>
                    {config.uploadProps && (
                      <UploadButton {...config.uploadProps} />
                    )}
                  </Box>
                </FunctionalityCommonTooltip>
              )}
            </React.Fragment>
          </Grid>
        );
      })}
    </Grid>
  );
};
