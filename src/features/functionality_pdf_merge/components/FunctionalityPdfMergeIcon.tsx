import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import { SxProps } from '@mui/material';
import { FC } from 'react';
interface IFunctionalityIconProps {
  sx?: SxProps;
}
const FunctionalityPdfMergeIcon: FC<
  { name: string } & IFunctionalityIconProps
> = ({ name, ...restProps }) => {
  const renderIcon = () => {
    switch (name) {
      case 'CloseTwoTone':
        return <CloseTwoToneIcon {...restProps} />;
      default: {
        return null;
      }
    }
  };

  return renderIcon();
};
export default FunctionalityPdfMergeIcon;
