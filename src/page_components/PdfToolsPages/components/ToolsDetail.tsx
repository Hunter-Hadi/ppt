import { Box } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FC, lazy, Suspense, useMemo } from 'react';

import AppContainer from '@/app_layout/AppContainer';
import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import AppLoadingLayout from '@/app_layout/AppLoadingLayout';
import ToolsBanner from '@/page_components/PdfToolsPages/components/ToolsBanner';
import {
  IToolUrkKeyType,
  toolsObjectData,
} from '@/page_components/PdfToolsPages/constant';

const FunctionalityPdfToImage = lazy(
  () =>
    import(
      '@/features/functionality_pdf_to_image/components/FunctionalityPdfToImage'
    ),
);
const FunctionalityPdfMerge = lazy(
  () =>
    import(
      '@/features/functionality_pdf_merge/components/FunctionalityPdfMerge'
    ),
);
const FunctionalityPdfSplit = lazy(
  () =>
    import(
      '@/features/functionality_pdf_split/components/FunctionalityPdfSplit'
    ),
);
interface IToolsDetailProps {
  urlKey: IToolUrkKeyType;
}

const ToolsDetail: FC<IToolsDetailProps> = ({ urlKey }) => {
  const currentToolData = useMemo(() => toolsObjectData[urlKey], [urlKey]);
  const { t } = useTranslation();
  const urkKeyOfSeoInfo: {
    [key in IToolUrkKeyType]: {
      title: string;
      description: string;
    };
  } = {
    'pdf-to-jpeg': {
      title: t('seo:pdf_tools__pdf_to_jpeg__title'),
      description: t('seo:pdf_tools__pdf_to_jpeg__description'),
    },
    'pdf-to-png': {
      title: t('seo:pdf_tools__pdf_to_png__title'),
      description: t('seo:pdf_tools__pdf_to_png__description'),
    },
    'merge-pdfs': {
      title: t('seo:pdf_tools__merge_pdfs__title'),
      description: t('seo:pdf_tools__merge_pdfs__description'),
    },
    'split-pdf': {
      title: t('seo:pdf_tools__split_pdf__title'),
      description: t('seo:pdf_tools__split_pdf__description'),
    },
  };
  return (
    <AppContainer sx={{ bgcolor: '#fff', width: '100%' }} maxWidth={1312}>
      <AppDefaultSeoLayout
        title={urkKeyOfSeoInfo[urlKey].title}
        description={urkKeyOfSeoInfo[urlKey].description}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pb: 5,
          width: '100%',
        }}
      >
        <ToolsBanner
          title={currentToolData.title}
          description={currentToolData.description}
        />
        {(urlKey === 'pdf-to-jpeg' || urlKey === 'pdf-to-png') && (
          <Suspense fallback={<AppLoadingLayout loading />}>
            <FunctionalityPdfToImage toType={urlKey} />
          </Suspense>
        )}
        {urlKey === 'merge-pdfs' && (
          <Suspense fallback={<AppLoadingLayout loading />}>
            <FunctionalityPdfMerge />
          </Suspense>
        )}
        {urlKey === 'split-pdf' && (
          <Suspense fallback={<AppLoadingLayout loading />}>
            <FunctionalityPdfSplit />
          </Suspense>
        )}
      </Box>
    </AppContainer>
  );
};
export default ToolsDetail;
