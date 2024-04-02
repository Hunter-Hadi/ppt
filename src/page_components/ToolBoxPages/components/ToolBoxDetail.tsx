import { Box } from '@mui/material';
import { FC, lazy, useMemo } from 'react';

import AppContainer from '@/app_layout/AppContainer';
import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import ToolBoxBanner from '@/page_components/ToolBoxPages/components/ToolBoxBanner';
import {
  IToolUrkKeyType,
  toolBoxObjectData,
} from '@/page_components/ToolBoxPages/constant';

const ToolBoxFunctionalityPdfToImg = lazy(
  () => import('@/features/ToolBoxFunctionalityPdfToImg/components'),
);
// const ToolBoxFunctionalityPdfMerge = lazy(
//   () => import('@/features/ToolBoxFunctionalityPdfMerge/components'),
// );
interface IToolBoxDetailProps {
  urlKey: IToolUrkKeyType;
}

const ToolBoxDetail: FC<IToolBoxDetailProps> = ({ urlKey }) => {
  const currentToolData = useMemo(() => toolBoxObjectData[urlKey], [urlKey]);

  return (
    <AppContainer sx={{ bgcolor: '#fff', width: '100%' }} maxWidth={1312}>
      <AppDefaultSeoLayout title={'ToolBox | MaxAI.me'} />
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
        <ToolBoxBanner
          title={currentToolData.title}
          description={currentToolData.description}
        />
        {(urlKey === 'pdf-to-jpeg' || urlKey === 'pdf-to-png') && (
          <ToolBoxFunctionalityPdfToImg toType={urlKey} />
        )}
        {/* {urlKey === 'merge-pdfs' && <ToolBoxFunctionalityPdfMerge />} */}
      </Box>
    </AppContainer>
  );
};
export default ToolBoxDetail;
