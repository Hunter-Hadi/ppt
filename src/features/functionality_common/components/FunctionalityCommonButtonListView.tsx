import { IconButton, IconButtonProps } from '@mui/material';
import Button, { ButtonProps } from '@mui/material/Button';
import Grid, { RegularBreakpoints } from '@mui/material/Grid';
import React from 'react';

import UploadButton, {
  IUploadButtonProps,
} from '@/features/common/components/UploadButton';

import FunctionalityCommonIcon from './FunctionalityCommonIcon';
import FunctionalityCommonTooltip from './FunctionalityCommonTooltip';
type IButtonProps = ButtonProps & {
  children: React.ReactNode;
  tooltip?: string;
  tooltipKey?: number | string;
};
export type IButtonConfig = {
  type: 'button' | 'iconButton' | 'upload';
  isShow?: boolean;
  buttonProps?: IButtonProps;
  iconButtonProps?: ({
    name: string;
    tooltip?: string;
  } & IconButtonProps)[];
  uploadProps?: IUploadButtonProps & {
    children: React.ReactNode;
    tooltip?: string;
  };
};

type IFunctionalityCommonButtonListViewProps = {
  buttonConfigs: IButtonConfig[];
  gridBreakpoints?: RegularBreakpoints;
};
/**
 * 公共按钮列表组件 作用是把需要重复的按钮视图组件抽离出来，统一高度大小和样式和管理，以及更好的可视化
 */
export const FunctionalityCommonButtonListView: React.FC<
  IFunctionalityCommonButtonListViewProps
> = ({ buttonConfigs, gridBreakpoints }) => {
  const getButtonProps = (params: IButtonProps | undefined) => {
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
            justifyContent={{
              xs: 'center',
              md: 'start',
            }}
            display={config.type === 'iconButton' ? 'flex' : 'block'}
            {...gridBreakpoints}
          >
            <React.Fragment>
              {config.type === 'button' && (
                <FunctionalityCommonTooltip
                  title={config.buttonProps?.tooltip || ''}
                  key={config.buttonProps?.tooltipKey}
                >
                  <Button
                    size='large'
                    variant='outlined'
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
              {config.type === 'iconButton' &&
                config.iconButtonProps?.map(
                  ({ name, tooltip, ...iconProps }, index) => (
                    <FunctionalityCommonTooltip
                      key={index}
                      title={tooltip || ''}
                    >
                      <IconButton color='primary' {...iconProps}>
                        <FunctionalityCommonIcon
                          sx={{
                            fontSize: 34,
                          }}
                          name={name}
                        />
                      </IconButton>
                    </FunctionalityCommonTooltip>
                  ),
                )}
              {config.type === 'upload' && config.uploadProps && (
                <FunctionalityCommonTooltip
                  title={config.uploadProps?.tooltip || ''}
                >
                  <UploadButton {...config.uploadProps} />
                </FunctionalityCommonTooltip>
              )}
            </React.Fragment>
          </Grid>
        );
      })}
    </Grid>
  );
};
