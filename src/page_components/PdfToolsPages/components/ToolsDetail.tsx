import { Box, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FC, lazy, Suspense, useMemo } from 'react';

import AppContainer from '@/app_layout/AppContainer';
import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import AppLoadingLayout from '@/app_layout/AppLoadingLayout';
import FunctionalityImageToPdfMain from '@/features/functionality_image_to_pdf/components/FunctionalityImageToPdfMain';
import ToolsBanner from '@/page_components/PdfToolsPages/components/ToolsBanner';
import ToolsCards from '@/page_components/PdfToolsPages/components/ToolsCards';
import ToolsDetailDescription from '@/page_components/PdfToolsPages/components/ToolsDetailDescription';
import {
  IToolUrkKeyType,
  toolsObjectData,
} from '@/page_components/PdfToolsPages/constant';
import { allPdfToolsDetailDescriptionObject } from '@/page_components/PdfToolsPages/constant/toolsDetailDescriptionData';

const FunctionalityPdfToImageMain = lazy(
  () =>
    import(
      '@/features/functionality_pdf_to_image/components/FunctionalityPdfToImageMain'
    ),
);
const FunctionalityPdfMergeMain = lazy(
  () =>
    import(
      '@/features/functionality_pdf_merge/components/FunctionalityPdfMergeMain'
    ),
);
const FunctionalityPdfSplitMain = lazy(
  () =>
    import(
      '@/features/functionality_pdf_split/components/FunctionalityPdfSplitMain'
    ),
);
const FunctionalityPdfToHtmlMain = lazy(
  () =>
    import(
      '@/features/functionality_pdf_to_html/components/FunctionalityPdfToHtmlMain'
    ),
);
const FunctionalitySignPdfMain = lazy(
  () =>
    import(
      '@/features/functionality_sign_pdf/components/FunctionalitySignPdfMain'
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
    'merge-pdf': {
      title: t('seo:pdf_tools__merge_pdf__title'),
      description: t('seo:pdf_tools__merge_pdf__description'),
    },
    'split-pdf': {
      title: t('seo:pdf_tools__split_pdf__title'),
      description: t('seo:pdf_tools__split_pdf__description'),
    },
    'png-to-pdf': {
      title: t('seo:pdf_tools__png_to_pdf__title'),
      description: t('seo:pdf_tools__png_to_pdf__description'),
    },
    'jpeg-to-pdf': {
      title: t('seo:pdf_tools__jpeg_to_pdf__title'),
      description: t('seo:pdf_tools__jpeg_to_pdf__description'),
    },
    'heic-to-pdf': {
      title: t('seo:pdf_tools__heic_to_pdf__title'),
      description: t('seo:pdf_tools__heic_to_pdf__description'),
    },
    'pdf-to-html': {
      title: t('seo:pdf_tools__pdf_to_html__title'),
      description: t('seo:pdf_tools__pdf_to_html__description'),
    },
    'sign-pdf': {
      title: t('seo:pdf_tools__sign_pdf__title'),
      description: t('seo:pdf_tools__sign_pdf__description'),
    },
  };
  const toolsDetailDescriptionData = allPdfToolsDetailDescriptionObject[urlKey];
  const toolList = useMemo(
    () =>
      Object.keys(toolsObjectData)
        .filter((key) => key !== urlKey)
        .map((key) => toolsObjectData[key]),
    [urlKey],
  );
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
          description={currentToolData.secondaryDescription}
        />
        <Suspense fallback={<AppLoadingLayout loading />}>
          {(urlKey === 'pdf-to-jpeg' || urlKey === 'pdf-to-png') && (
            <FunctionalityPdfToImageMain toType={urlKey} />
          )}
          {urlKey === 'merge-pdf' && <FunctionalityPdfMergeMain />}
          {urlKey === 'split-pdf' && <FunctionalityPdfSplitMain />}
          {(urlKey === 'png-to-pdf' ||
            urlKey === 'jpeg-to-pdf' ||
            urlKey === 'heic-to-pdf') && (
            <FunctionalityImageToPdfMain accept={currentToolData.accept} />
          )}
          {urlKey === 'pdf-to-html' && <FunctionalityPdfToHtmlMain />}
          {urlKey === 'sign-pdf' && <FunctionalitySignPdfMain />}
        </Suspense>
      </Box>
      {toolsDetailDescriptionData && (
        <ToolsDetailDescription descriptionInfo={toolsDetailDescriptionData} />
      )}
      {toolList && toolList.length > 0 && (
        <Box
          sx={{
            borderTop: '1px solid #e8e8e8',
          }}
        >
          <Typography
            component='h2'
            mt={10}
            mb={3}
            sx={{
              fontSize: {
                xs: 20,
                lg: 22,
              },
              fontWeight: 600,
              color: 'text.primary',
              textAlign: 'center',
            }}
          >
            {t('pages:pdf_tools__detail_page__more_pdf_tools')}
          </Typography>
          <ToolsCards list={toolList} />
        </Box>
      )}
    </AppContainer>
  );
};
export default ToolsDetail;
