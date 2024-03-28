import CircularProgress from '@mui/material/CircularProgress';
import { SxProps } from '@mui/material/styles';
import saveAs from 'file-saver';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { FC, useState } from 'react';

import { promiseTimeout } from '@/features/common/utils/promiseUtils';
import { ContextMenuIcon } from '@/features/share_conversation/components/ContextMenuIcon';
import TooltipIconButton from '@/features/share_conversation/components/TooltipIconButton';
import { IChatMessage } from '@/features/share_conversation/types';
import {
  clientGetMaxAIFileUrlWithFileId,
  getChatMessageAttachments,
  getMaxAIFileIdFromAttachmentURL,
} from '@/features/share_conversation/utils/chatMessageAttachmentHelper';
import { isAIMessage } from '@/features/share_conversation/utils/chatMessageUtils';
import { webappGet } from '@/utils/request';

const SidebarAIMessageAttachmentsDownloadButton: FC<{
  message: IChatMessage;
  sx?: SxProps;
}> = (props) => {
  const { t } = useTranslation();
  const [downloading, setDownloading] = useState(false);
  const { message, sx } = props;
  const attachments = getChatMessageAttachments(message);

  const { query } = useRouter();

  const share_id = query.id as string;

  const downloadAttachments = async () => {
    setDownloading(true);
    await Promise.all(
      attachments.map(async (attachment) => {
        let downloadUrl = attachment.uploadedUrl;
        if (!downloadUrl) {
          return;
        }
        const maxAIFileId = getMaxAIFileIdFromAttachmentURL(downloadUrl);
        if (maxAIFileId) {
          if (maxAIFileId.endsWith('.webp')) {
            downloadUrl = downloadUrl =
              (
                await clientGetMaxAIFileUrlWithFileId(
                  maxAIFileId.replace('.webp', '.png'),
                  {
                    share_id,
                    message_id: message.messageId,
                  },
                )
              )?.file_url || downloadUrl;
          } else {
            downloadUrl =
              (
                await clientGetMaxAIFileUrlWithFileId(maxAIFileId, {
                  share_id,
                  message_id: message.messageId,
                })
              )?.file_url || downloadUrl;
          }
        }
        try {
          const result = await promiseTimeout(
            webappGet(downloadUrl, {
              parse: 'blob',
              contentType: 'image/png',
            }),
            20 * 1000,
            {
              success: false,
            } as any,
          );
          if (result.success && result?.data?.type) {
            let fileName = message.text;
            if (isAIMessage(message)) {
              fileName = message.originalMessage?.metadata?.title?.title || '';
            }
            // download image
            saveAs(result.data, `${fileName}.png`);
          } else {
            // NOTE: 保底方案
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = 'download';
            a.click();
            a.remove();
          }
        } catch (e) {
          console.error(e);
        }
      }),
    )
      .then()
      .catch()
      .finally(() => {
        setDownloading(false);
      });
  };
  if (attachments.length === 0) {
    return null;
  }
  return (
    <TooltipIconButton
      sx={{
        ...sx,
      }}
      title={t('common:download_image')}
      onClick={downloadAttachments}
    >
      {downloading ? (
        <CircularProgress size={'16px'} color='inherit' />
      ) : (
        <ContextMenuIcon icon={'FileDownload'} sx={{ fontSize: '16px' }} />
      )}
    </TooltipIconButton>
  );
};

export default SidebarAIMessageAttachmentsDownloadButton;
