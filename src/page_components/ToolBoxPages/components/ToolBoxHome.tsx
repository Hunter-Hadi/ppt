import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';

import AppContainer from '@/app_layout/AppContainer';
import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import ToolBoxBanner from '@/page_components/ToolBoxPages/components/ToolBoxBanner';
import ToolBoxCards from '@/page_components/ToolBoxPages/components/ToolBoxCards';
import { toolBoxObjectData } from '@/page_components/ToolBoxPages/constant';

const ToolBoxHome = () => {
  const { t } = useTranslation();

  const toolList = useMemo(
    () => Object.keys(toolBoxObjectData).map((key) => toolBoxObjectData[key]),
    [],
  );
  return (
    <AppContainer sx={{ bgcolor: '#fff' }} maxWidth={1312}>
      <AppDefaultSeoLayout title={'ToolBox | MaxAI.me'} />
      <ToolBoxBanner
        title={t('pages:tool_box_index_page_title')}
        description={t('pages:tool_box_index_page_description')}
      />
      <ToolBoxCards list={toolList} />
    </AppContainer>
  );
};
export default ToolBoxHome;
