import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';

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
    <>
      <ToolsBanner
        title={t('pages:tools__index_page__title')}
        description={t('pages:tools__index_page__description')}
      />
      <ToolsCards list={toolList} />
    </>
  );
};
export default ToolsHome;
