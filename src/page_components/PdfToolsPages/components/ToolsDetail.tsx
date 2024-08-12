import { Box, Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import { useTranslation } from 'next-i18next'
import React, { createContext, useState } from 'react'
import { FC, Suspense, useMemo } from 'react'

import AppContainer from '@/app_layout/AppContainer'
import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout'
import AppLoadingLayout from '@/app_layout/AppLoadingLayout'
import FunctionalityProtectPdfMain from '@/features/functionality_protect_pdf/components/FunctionalityProtectPdfMain'
import ToolsBanner from '@/page_components/PdfToolsPages/components/ToolsBanner'
import ToolsCards from '@/page_components/PdfToolsPages/components/ToolsCards'
import ToolsDetailDescription from '@/page_components/PdfToolsPages/components/ToolsDetailDescription'
import {
  IToolUrkKeyType,
  toolsObjectData,
} from '@/page_components/PdfToolsPages/constant'
import { allPdfToolsDetailDescriptionObject } from '@/page_components/PdfToolsPages/constant/toolsDetailDescriptionData'

const FunctionalityPdfToImageMain = dynamic(
  () =>
    import(
      '@/features/functionality_pdf_to_image/components/FunctionalityPdfToImageMain'
    ),
  {
    loading: () => <AppLoadingLayout loading />,
  },
)

const FunctionalityPdfMergeMain = dynamic(
  () =>
    import(
      '@/features/functionality_pdf_merge/components/FunctionalityPdfMergeMain'
    ),
  {
    loading: () => <AppLoadingLayout loading />,
  },
)
const FunctionalityPdfSplitMain = dynamic(
  () =>
    import(
      '@/features/functionality_pdf_split/components/FunctionalityPdfSplitMain'
    ),
  {
    loading: () => <AppLoadingLayout loading />,
  },
)
const FunctionalityPdfToHtmlMain = dynamic(
  () =>
    import(
      '@/features/functionality_pdf_to_html/components/FunctionalityPdfToHtmlMain'
    ),
  {
    loading: () => <AppLoadingLayout loading />,
  },
)
const FunctionalitySignPdfMain = dynamic(
  () =>
    import(
      '@/features/functionality_sign_pdf/components/FunctionalitySignPdfMain'
    ),
  {
    loading: () => <AppLoadingLayout loading />,
  },
)
const FunctionalityCompressPdfMain = dynamic(
  () =>
    import(
      '@/features/functionality_compress_pdf/components/FunctionalityCompressPdfMain'
    ),
  {
    loading: () => <AppLoadingLayout loading />,
  },
)
const FunctionalityOcrPdfMain = dynamic(
  () =>
    import(
      '@/features/functionality_ocr_pdf/components/FunctionalityOcrPdfMain'
    ),
  {
    loading: () => <AppLoadingLayout loading />,
  },
)
const FunctionalityNumberPagesMain = dynamic(
  () =>
    import(
      '@/features/functionality_number_pages/components/FunctionalityNumberPagesMain'
    ),
  {
    loading: () => <AppLoadingLayout loading />,
  },
)
const FunctionalityRotatePdfMain = dynamic(
  () =>
    import(
      '@/features/functionality_rotate_pdf/components/FunctionalityRotatePdfMain'
    ),
  {
    loading: () => <AppLoadingLayout loading />,
  },
)
const FunctionalityImageToPdfMain = dynamic(
  () =>
    import(
      '@/features/functionality_image_to_pdf/components/FunctionalityImageToPdfMain'
    ),
  {
    loading: () => <AppLoadingLayout loading />,
  },
)

const FunctionalityUnlockPdfMain = dynamic(
  () =>
    import(
      '@/features/functionality_unlock_pdf/components/FunctionalityUnlockPdfMain'
    ),
  {
    loading: () => <AppLoadingLayout loading />,
  },
)

const FunctionalityWaterMarkPdfMain = dynamic(
  () =>
    import(
      '@/features/functionality_water_mark_pdf/components/FunctionalityWaterFramePdfMain'
    ),
  {
    loading: () => <AppLoadingLayout loading />,
  },
)
const FunctionalityPdfAnnotatorMain = dynamic(
  () =>
    import(
      '@/features/functionality_pdf_annotator/components/FunctionalityPdfAnnotatorMain'
    ),
)
const FunctionalityDeletePagePdfMain = dynamic(
  () =>
    import(
      '@/features/functionality_delete_page_pdf/components/FunctionalityDeletePagePdfMain'
    ),
  {
    loading: () => <AppLoadingLayout loading />,
  },
)

const FunctionalityExtractPagePdfMain = dynamic(
  () =>
    import(
      '@/features/functionality_extract_page_pdf/components/FunctionalityExtractPagePdfMain'
    ),
  {
    loading: () => <AppLoadingLayout loading />,
  },
)

const FunctionalityRedactPdfMain = dynamic(
  () =>
    import(
      '@/features/functionality_redact_pdf/components/FunctionalityRedactPdfMain'
    ),
    {
      loading: () => <AppLoadingLayout loading />,
    },
)
const FunctionalityFlattenPdfMain = dynamic(
  () =>
    import(
      '@/features/functionality_flatten_pdf/components/FunctionalityFlattenPdfMain'
    ),
  {
    loading: () => <AppLoadingLayout loading />,
  },
)
interface IToolsDetailProps {
  urlKey: IToolUrkKeyType
}
export const TopToolsDetailView = createContext({
  isSimplicityView: false,
  setIsSimplicityView: (value: boolean) => {},
})
const ToolsDetail: FC<IToolsDetailProps> = ({ urlKey }) => {
  const [isSimplicityView, setIsSimplicityView] = useState(false)
  const currentToolData = useMemo(() => toolsObjectData[urlKey], [urlKey])
  const { t } = useTranslation()
  const urkKeyOfSeoInfo: {
    [key in IToolUrkKeyType]: {
      title: string
      description: string
    }
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
    'compress-pdf': {
      title: t('seo:pdf_tools__compress_pdf__title'),
      description: t('seo:pdf_tools__compress_pdf__description'),
    },
    'pdf-ocr': {
      title: t('seo:pdf_tools__ocr_pdf__title'),
      description: t('seo:pdf_tools__ocr_pdf__description'),
    },
    'rotate-pdf': {
      title: t('seo:pdf_tools__rotate_pdf__title'),
      description: t('seo:pdf_tools__rotate_pdf__description'),
    },
    'add-page-numbers-to-pdf': {
      title: t('seo:pdf_tools__pdf_numbers_page__title'),
      description: t('seo:pdf_tools__pdf_numbers_page__description'),
    },
    'unlock-pdf': {
      title: t('pages__pdf_tools__unlock_pdf:seo_title'),
      description: t('pages__pdf_tools__unlock_pdf:seo_description'),
    },
    'pdf-annotator': {
      title: t('pages__pdf_tools__pdf_annotator:seo_title'),
      description: t('pages__pdf_tools__pdf_annotator:seo_description'),
    },
    'protect-pdf': {
      title: t('pages__pdf_tools__protect_pdf:seo_title'),
      description: t('pages__pdf_tools__protect_pdf:seo_description'),
    },
    'watermark-pdf': {
      title: t('seo:pdf_tools__pdf_watermark_page__title'),
      description: t('seo:pdf_tools__pdf_watermark_page__description'),
    },
    'delete-pages-from-pdf': {
      title: t('seo:pdf_tools__pdf_deletepages_page__title'),
      description: t('seo:pdf_tools__pdf_deletepages_page__description'),
    },
    'extract-pdf-pages': {
      title: t('seo:pdf_tools__pdf_extractpages_page__title'),
      description: t('seo:pdf_tools__pdf_extractpages_page__description'),
    },
    'redact-pdf': {
      title: t('pages__pdf_tools__redact_pdf:seo_title'),
      description: t('pages__pdf_tools__redact_pdf:seo_description'),
    },
    'flatten-pdf': {
      title: t('pages__pdf_tools__flatten_pdf:seo_title'),
      description: t('pages__pdf_tools__flatten_pdf:seo_description'),
    },
  }
  const toolsDetailDescriptionData = allPdfToolsDetailDescriptionObject[urlKey]
  const toolList = useMemo(
    () =>
      Object.keys(toolsObjectData)
        .filter((key) => key !== urlKey)
        .map((key) => toolsObjectData[key]),
    [urlKey],
  )

  return (
    <AppContainer sx={{ bgcolor: '#fff', width: '100%' }} maxWidth={1312}>
      <AppDefaultSeoLayout
        title={urkKeyOfSeoInfo[urlKey].title}
        description={urkKeyOfSeoInfo[urlKey].description}
      />
      <TopToolsDetailView.Provider
        value={{ isSimplicityView, setIsSimplicityView }}
      >
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
            title={currentToolData.detailTitle || currentToolData.title}
            isSimplicityView={isSimplicityView}
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
            {urlKey === 'compress-pdf' && <FunctionalityCompressPdfMain />}
            {urlKey === 'pdf-ocr' && <FunctionalityOcrPdfMain />}
            {urlKey === 'add-page-numbers-to-pdf' && (
              <FunctionalityNumberPagesMain />
            )}
            {urlKey === 'rotate-pdf' && <FunctionalityRotatePdfMain />}
            {urlKey === 'unlock-pdf' && <FunctionalityUnlockPdfMain />}
            {urlKey === 'protect-pdf' && <FunctionalityProtectPdfMain />}
            {urlKey === 'watermark-pdf' && <FunctionalityWaterMarkPdfMain />}
            {urlKey === 'pdf-annotator' && <FunctionalityPdfAnnotatorMain />}
            {urlKey === 'delete-pages-from-pdf' && (
              <FunctionalityDeletePagePdfMain />
            )}
            {urlKey === 'extract-pdf-pages' && (
              <FunctionalityExtractPagePdfMain />
            )}
            {urlKey === 'redact-pdf' && <FunctionalityRedactPdfMain />}
            {urlKey === 'flatten-pdf' && <FunctionalityFlattenPdfMain />}
          </Suspense>
        </Box>
        {toolsDetailDescriptionData && (
          <ToolsDetailDescription
            descriptionInfo={toolsDetailDescriptionData}
          />
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
            <ToolsCards list={toolList} isShowSeoTag={false} />
          </Box>
        )}
      </TopToolsDetailView.Provider>
    </AppContainer>
  )
}
export default ToolsDetail
