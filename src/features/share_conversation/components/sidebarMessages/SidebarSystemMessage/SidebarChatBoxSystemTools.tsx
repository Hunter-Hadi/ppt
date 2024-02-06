import { FC } from 'react';

import { ISystemChatMessage } from '@/features/share_conversation/types';

const SidebarChatBoxSystemTools: FC<{
  solutionsShow: boolean;
  onSolutionToggle: () => void;
  message: ISystemChatMessage;
}> = (props) => {
  // system message 暂时不渲染
  return null;
};
export default SidebarChatBoxSystemTools;
