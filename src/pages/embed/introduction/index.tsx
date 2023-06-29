import { Box } from '@mui/material';
import { useEffect, useRef } from 'react';

import { HomePageContent } from '@/pages';

const EmbedIntroduction = () => {
  const contentRef = useRef<any>(null);

  useEffect(() => {
    if (window.parent) {
      window.parent.postMessage(
        {
          type: 'embed',
          height: contentRef.current?.offsetHeight,
        },
        '*',
      );
    }
  }, []);

  return (
    <Box ref={contentRef}>
      <HomePageContent />
    </Box>
  );
};

export default EmbedIntroduction;
