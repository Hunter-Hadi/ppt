import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';

import AppContainer from '@/app_layout/AppContainer';
import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import ToolsBanner from '@/page_components/PdfToolsPages/components/ToolsBanner';
import ToolsCards from '@/page_components/PdfToolsPages/components/ToolsCards';
import { toolsObjectData } from '@/page_components/PdfToolsPages/constant';

const ToolsHome = () => {
  const { t } = useTranslation();

  const toolList = useMemo(
    () => Object.keys(toolsObjectData).map((key) => toolsObjectData[key]),
    [],
  );
  return (
    <AppContainer sx={{ bgcolor: '#fff' }} maxWidth={1312}>
      <AppDefaultSeoLayout
        title={t('seo:pdf_tools__title')}
        description={t('seo:pdf_tools__description')}
      />
      <ToolsBanner
        title={t('pages:tools__index_page__title')}
        description={t('pages:tools__index_page__description')}
      />
      <ToolsCards list={toolList} />
    </AppContainer>
  );
};
export default ToolsHome;
