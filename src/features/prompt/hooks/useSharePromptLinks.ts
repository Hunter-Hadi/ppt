import { useMemo } from 'react';

import { WWW_PROJECT_LINK } from '@/global_constants';

export const useSharePromptLinks = (id?: string, title?: string) => {
  const shareLink = useMemo(() => {
    return `${WWW_PROJECT_LINK}/prompts/${id}`;
  }, [id]);

  const lineBreak = '%0D%0A';

  const content = useMemo(() => {
    return `Prompt template: ${encodeURIComponent(
      title || '',
    )}<br/><br/>Try this prompt on`.replace(/<br\s*\/?>/gm, lineBreak);
  }, [title]);

  const twitterShareLink = useMemo(() => {
    return `https://twitter.com/intent/tweet?text=${content}&url=${shareLink}`;
  }, [shareLink, content]);
  const emailShareLink = useMemo(() => {
    return `mailto:?subject=${encodeURIComponent(
      'Prompt template: ',
    )}${encodeURIComponent(
      `${title}` || '',
    )}&body=${content}${lineBreak}${shareLink}`;
  }, [shareLink, title, content]);
  const facobookShareLink = useMemo(() => {
    return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareLink,
    )}`;
  }, [shareLink]);

  return {
    shareLink,
    twitterShareLink,
    emailShareLink,
    facobookShareLink,
  };
};
