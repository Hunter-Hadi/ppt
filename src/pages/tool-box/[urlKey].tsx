import { Box, CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import ToolBoxDetail from '@/features/tool_box/components/ToolBoxDetail';
import { IToolUrkKeyType, toolBoxObjData } from '@/features/tool_box/constant';

const UrlKeyToolBoxDetail = () => {
  const router = useRouter();
  const { urlKey } = router.query as { urlKey?: IToolUrkKeyType };
  //通过匹配进入虽然可以，但是会延迟加载，是否要优化掉待定
  useEffect(() => {
    if (urlKey && !toolBoxObjData[urlKey]) {
      router.replace('/404');
    }
  }, [urlKey, router]);

  if (urlKey && toolBoxObjData[urlKey]) {
    return <ToolBoxDetail urlKey={urlKey} />;
  } else {
    return (
      <Box
        sx={{
          height: '50vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
};
export default UrlKeyToolBoxDetail;
