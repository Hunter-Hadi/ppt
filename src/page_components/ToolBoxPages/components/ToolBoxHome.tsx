import { FC, useMemo } from 'react';

import AppContainer from '@/app_layout/AppContainer';
import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import ToolBoxBanner from '@/page_components/ToolBoxPages/components/ToolBoxBanner';
import ToolBoxCards from '@/page_components/ToolBoxPages/components/ToolBoxCards';
import {
  IToolUrkKeyType,
  toolBoxObjData,
} from '@/page_components/ToolBoxPages/constant';

interface IToolBoxHomeProps {
  onClickKey?: (key: IToolUrkKeyType) => void;
}
const ToolBoxHome: FC<IToolBoxHomeProps> = ({ onClickKey }) => {
  const toolList = useMemo(
    () => Object.keys(toolBoxObjData).map((key) => toolBoxObjData[key]),
    [],
  );
  return (
    <AppContainer sx={{ bgcolor: '#fff' }} maxWidth={1312}>
      <AppDefaultSeoLayout title={'ToolBox | MaxAI.me'} />
      <ToolBoxBanner
        title='AI 工具箱'
        description='所有工具都在您的浏览器中运行，以获得完全的隐私。'
      />
      <ToolBoxCards list={toolList} onClickKey={onClickKey} />
    </AppContainer>
  );
};
export default ToolBoxHome;
