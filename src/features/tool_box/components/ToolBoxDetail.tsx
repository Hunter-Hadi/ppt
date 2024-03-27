import { FC, useMemo } from 'react';

import AppContainer from '@/app_layout/AppContainer';
import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import { IToolUrkKeyType, toolBoxObjData } from '@/features/tool_box/constant';

import ToolBoxBanner from './ToolBoxBanner';

interface IToolBoxDetailProps {
  urlKey: IToolUrkKeyType;
}

const ToolBoxDetail: FC<IToolBoxDetailProps> = ({ urlKey }) => {
  const currentToolData = useMemo(() => toolBoxObjData[urlKey], [urlKey]);
  return (
    <AppContainer sx={{ bgcolor: '#fff' }} maxWidth={1312}>
      <AppDefaultSeoLayout title={'ToolBox | MaxAI.me'} />
      <ToolBoxBanner
        title={currentToolData.title}
        description={currentToolData.description}
      />
    </AppContainer>
  );
};
export default ToolBoxDetail;
