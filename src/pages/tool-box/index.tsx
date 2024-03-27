import { useRouter } from 'next/router';

import ToolBoxHome from '@/features/tool_box/components/ToolBoxHome';
import { IToolUrkKeyType } from '@/features/tool_box/constant';

const ToolBox = () => {
  const router = useRouter();
  const onClickKey = (key: IToolUrkKeyType) => {
    router.push(`/tool-box/${key}`);
  };
  return <ToolBoxHome onClickKey={onClickKey} />;
};
export default ToolBox;
