import Stack from '@mui/material/Stack';
import { useTranslation } from 'next-i18next';
import React, { FC, useMemo, useState } from 'react';

import { ContextMenuIcon } from '@/features/share_conversation/components/ContextMenuIcon';
import SidebarCopyButton from '@/features/share_conversation/components/SidebarCopyButton';
import SidebarAIMessageAttachmentsDownloadButton from '@/features/share_conversation/components/sidebarMessages/SidebarAIMessage/SidebarAIMessageContent/SidebarAIMessageImageContent/SidebarAIMessageAttachmentsDownloadButton';
import TooltipIconButton from '@/features/share_conversation/components/TooltipIconButton';
import { IAIResponseMessage } from '@/features/share_conversation/types';
import { formatAIMessageContent } from '@/features/share_conversation/utils/chatMessagesHelper';
import { findSelectorParent } from '@/features/share_conversation/utils/socialMedia/platforms/utils';

const SidebarAIMessageTools: FC<{
  useChatGPTAble?: boolean;
  message: IAIResponseMessage;
}> = (props) => {
  const { message } = props;
  const { t } = useTranslation();
  const [isCoping, setIsCoping] = useState(false);
  const messageContentType =
    message.originalMessage?.content?.contentType || 'text';
  const gmailChatBoxAiToolsRef = React.useRef<HTMLDivElement>(null);
  const memoCopyText = useMemo(() => {
    return formatAIMessageContent(message);
  }, [message]);
  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      spacing={0.5}
      ref={gmailChatBoxAiToolsRef}
    >
      {messageContentType === 'image' && (
        <TooltipIconButton
          loading={isCoping}
          disabled={isCoping}
          title={t('common:copy_image')}
          onClick={async (event) => {
            const image = findSelectorParent(
              '.maxai-ai-message__image__content__box img',
              event.currentTarget,
            ) as HTMLImageElement;
            if (!image?.src) {
              return;
            }
            setIsCoping(true);
            try {
              const newImage = new Image();
              newImage.src = image.src;
              await new Promise((resolve) => {
                try {
                  newImage.crossOrigin = 'anonymous';
                } catch (error) {
                  resolve(false);
                  setIsCoping(false);
                }
                newImage.onload = () => {
                  const canvas = document.createElement('canvas');
                  canvas.width = newImage.naturalWidth;
                  canvas.height = newImage.naturalHeight;
                  const ctx = canvas.getContext('2d');
                  if (ctx) {
                    ctx.drawImage(newImage, 0, 0);
                    canvas.toBlob(function (blob) {
                      if (blob) {
                        const item = new ClipboardItem({ 'image/png': blob });
                        navigator.clipboard
                          .write([item])
                          .then(function () {
                            console.log('Image copied to clipboard');
                            resolve(true);
                          })
                          .catch(function (error) {
                            console.error(
                              'Error copying image to clipboard',
                              error,
                            );
                            resolve(false);
                          })
                          .finally(() => {});
                      } else {
                        resolve(false);
                      }
                    });
                  }
                };
                newImage.onerror = () => {
                  resolve(false);
                };
              });
            } catch (e) {
              setIsCoping(false);
            }
          }}
        >
          <ContextMenuIcon
            icon={'Copy'}
            sx={{
              fontSize: '16px',
            }}
          />
        </TooltipIconButton>
      )}
      {message && (
        <SidebarAIMessageAttachmentsDownloadButton message={message} />
      )}
      {messageContentType === 'text' && <SidebarCopyButton message={message} />}
      {/* {messageContentType === 'text' && (
        <FloatingInputButton
          className={'max-ai__actions__button--use-max-ai'}
          iconButton
          onBeforeShowContextMenu={() => {
            return {
              template: memoCopyText,
              target: gmailChatBoxAiToolsRef.current
                ?.parentElement as HTMLElement,
            };
          }}
        />
      )} */}
    </Stack>
  );
};
export default SidebarAIMessageTools;
