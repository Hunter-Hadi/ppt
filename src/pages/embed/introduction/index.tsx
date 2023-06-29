import { Box } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

import useEffectOnce from '@/hooks/useEffectOnce';
import { HomePageContent } from '@/pages';

const EmbedIntroduction = () => {
  const [loaded, setLoaded] = useState(false);
  const contentRef = useRef<any>(null);

  useEffectOnce(() => setLoaded(true));

  useEffect(() => {
    if (loaded && window.parent) {
      console.log('window.parent', window.parent, window.parent === window);
      window.parent.postMessage(
        {
          type: 'embed',
          height: contentRef.current?.offsetHeight,
        },
        '*',
      );
    }
  }, [loaded]);

  return (
    <Box ref={contentRef}>
      <HomePageContent />
    </Box>
  );
};

export default EmbedIntroduction;
