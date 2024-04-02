import { Box } from '@mui/material';
import { FC, lazy, Suspense, useMemo } from 'react';

import AppContainer from '@/app_layout/AppContainer';
import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import AppLoadingLayout from '@/app_layout/AppLoadingLayout';
import ToolsBanner from '@/page_components/ToolsPages/components/ToolsBanner';
import {
  IToolUrkKeyType,
  toolsObjectData,
} from '@/page_components/ToolsPages/constant';

const FunctionalityPdfToImg = lazy(
  () =>
    import(
      '@/features/functionality_pdf_to_img/components/FunctionalityPdfToImg'
    ),
);
const FunctionalityPdfMerge = lazy(
  () =>
    import(
      '@/features/functionality_pdf_merge/components/FunctionalityPdfMerge'
    ),
);
interface IToolsDetailProps {
  urlKey: IToolUrkKeyType;
}

const ToolsDetail: FC<IToolsDetailProps> = ({ urlKey }) => {
  const currentToolData = useMemo(() => toolsObjectData[urlKey], [urlKey]);

  return (
    <AppContainer sx={{ bgcolor: '#fff', width: '100%' }} maxWidth={1312}>
      <AppDefaultSeoLayout title={'Tools | MaxAI.me'} />
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
            <FunctionalityPdfToImg toType={urlKey} />
          </Suspense>
        )}
        {urlKey === 'merge-pdfs' && <FunctionalityPdfMerge />}
      </Box>
    </AppContainer>
  );
};
export default ToolsDetail;
