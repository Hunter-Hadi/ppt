import { useRouter } from 'next/router';

import ToolBoxHome from '@/page_components/ToolBoxPages/components/ToolBoxHome';
import { IToolUrkKeyType } from '@/page_components/ToolBoxPages/constant';

const ToolBox = () => {
  const router = useRouter();
  const onClickKey = (key: IToolUrkKeyType) => {
    router.push(`/tool-box/${key}`);
  };
  return <ToolBoxHome onClickKey={onClickKey} />;
};
export default ToolBox;
