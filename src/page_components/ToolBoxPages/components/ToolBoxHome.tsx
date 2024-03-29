import { useMemo } from 'react';

import AppContainer from '@/app_layout/AppContainer';
import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import ToolBoxBanner from '@/page_components/ToolBoxPages/components/ToolBoxBanner';
import ToolBoxCards from '@/page_components/ToolBoxPages/components/ToolBoxCards';
import { toolBoxObjData } from '@/page_components/ToolBoxPages/constant';

const ToolBoxHome = () => {
  const toolList = useMemo(
    () => Object.keys(toolBoxObjData).map((key) => toolBoxObjData[key]),
    [],
  );
  return (
    <AppContainer sx={{ bgcolor: '#fff' }} maxWidth={1312}>
      <AppDefaultSeoLayout title={'ToolBox | MaxAI.me'} />
      <ToolBoxBanner
        title='MaxAI 工具箱'
        description='所有工具都在您的浏览器中运行，以获得完全的隐私。'
      />
      <ToolBoxCards list={toolList} />
    </AppContainer>
  );
};
export default ToolBoxHome;
