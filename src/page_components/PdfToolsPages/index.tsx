import { useTranslation } from 'next-i18next';

import AppContainer from '@/app_layout/AppContainer';
import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import ToolsHome from '@/page_components/PdfToolsPages/components/ToolsHome';

const PdfToolsMainPages = () => {
  const { t } = useTranslation();

  return (
    <AppContainer sx={{ bgcolor: '#fff' }} maxWidth={1312}>
      <AppDefaultSeoLayout
        title={t('seo:pdf_tools__title')}
        description={t('seo:pdf_tools__description')}
      />
      <ToolsHome />
    </AppContainer>
  );
};
export default PdfToolsMainPages;
