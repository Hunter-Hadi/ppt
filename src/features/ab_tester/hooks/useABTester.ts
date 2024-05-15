import { useMemo } from 'react';

import { getFingerPrint } from '@/utils/fingerPrint';

const useABTester = () => {
  // const [variant, setVariant] = useState<string>('A');

  const variant = useMemo(() => {
    const variantGroupsLength = 2;
    const fingerprint = getFingerPrint();
    return parseInt(fingerprint.slice(-10), 16) % variantGroupsLength === 0
      ? 'Group A'
      : 'Group B';
  }, []);

  return {
    variant,
  };
};

export default useABTester;
