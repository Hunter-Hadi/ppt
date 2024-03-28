import { Box } from '@mui/material';
import { FC, lazy, useMemo } from 'react';

import AppContainer from '@/app_layout/AppContainer';
import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import ToolBoxBanner from '@/page_components/ToolBoxPages/components/ToolBoxBanner';
import {
  IToolUrkKeyType,
  toolBoxObjData,
} from '@/page_components/ToolBoxPages/constant';

const ToolBoxFunctionalityPdfToImg = lazy(
  () => import('@/features/ToolBoxFunctionalityPdfToImg'),
);

interface IToolBoxDetailProps {
  urlKey: IToolUrkKeyType;
}

const ToolBoxDetail: FC<IToolBoxDetailProps> = ({ urlKey }) => {
  const currentToolData = useMemo(() => toolBoxObjData[urlKey], [urlKey]);

  return (
    <AppContainer sx={{ bgcolor: '#fff' }} maxWidth={1312}>
      <AppDefaultSeoLayout title={'ToolBox | MaxAI.me'} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pb: 5,
        }}
      >
        <ToolBoxBanner
          title={currentToolData.title}
          description={currentToolData.description}
        />
        <ToolBoxFunctionalityPdfToImg urlKey={urlKey} />
      </Box>
    </AppContainer>
  );
};
export default ToolBoxDetail;
