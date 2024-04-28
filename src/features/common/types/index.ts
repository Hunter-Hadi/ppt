import { SxProps } from '@mui/material/styles';

export interface IWithMuiSxProps<Theme extends object = object> {
  sx?: SxProps<Theme>;
}
