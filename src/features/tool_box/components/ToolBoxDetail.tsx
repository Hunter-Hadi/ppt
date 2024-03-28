import { Box, Typography } from '@mui/material';
import { FC, useMemo, useState } from 'react';

import AppContainer from '@/app_layout/AppContainer';
import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import UploadButton from '@/features/common/components/UploadButton';
import ToolBoxBanner from '@/features/tool_box/components/ToolBoxBanner';
import ToolBoxIcon from '@/features/tool_box/components/ToolBoxIcon';
import { IToolUrkKeyType, toolBoxObjData } from '@/features/tool_box/constant';

import ToolBoxFunctionalityPdfToImg from './ToolBoxFunctionality/ToolBoxFunctionalityPdfToImg';

interface IToolBoxDetailProps {
  urlKey: IToolUrkKeyType;
}

const ToolBoxDetail: FC<IToolBoxDetailProps> = ({ urlKey }) => {
  const currentToolData = useMemo(() => toolBoxObjData[urlKey], [urlKey]);
  const [fileList, setFileList] = useState<FileList | null>(null);
  const onChangeFile = (fileList: FileList) => {
    console.log('simply onChangeFile', fileList);
    setFileList(fileList);
  };
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
        {!fileList && (
          <UploadButton
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: 240,
              width: 226,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            variant='outlined'
            isDrag={true}
            onChange={onChangeFile}
            accept={currentToolData.accept}
          >
            <ToolBoxIcon name='CloudUploadIcon' />
            <Typography
              sx={{
                fontSize: {
                  xs: 12,
                  lg: 13,
                },
              }}
            >
              Click to upload or drag and drop
            </Typography>
          </UploadButton>
        )}
        {urlKey === 'pdf-to-png' && fileList && (
          <ToolBoxFunctionalityPdfToImg fileList={fileList} />
        )}
      </Box>
    </AppContainer>
  );
};
export default ToolBoxDetail;
