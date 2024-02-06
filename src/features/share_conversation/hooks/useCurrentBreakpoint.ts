import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const useCurrentBreakpoint = () => {
  const theme = useTheme();
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>('xl');
  useEffect(() => {
    const handleResize = () => {
      const breakpoints = theme.breakpoints.values;
      const width = window.innerWidth;
      let breakpoint: Breakpoint = 'xl';
      if (width < breakpoints.sm) {
        breakpoint = 'xs';
      } else if (width < breakpoints.md) {
        breakpoint = 'sm';
      } else if (width < breakpoints.lg) {
        breakpoint = 'md';
      } else if (width < breakpoints.xl) {
        breakpoint = 'lg';
      }
      setCurrentBreakpoint(breakpoint);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [theme.breakpoints.values]);

  return currentBreakpoint;
};
export default useCurrentBreakpoint;
