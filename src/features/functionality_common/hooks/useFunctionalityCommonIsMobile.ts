import { useMediaQuery } from '@mui/material'

const useFunctionalityCommonIsMobile = () => {
  const isMobile = useMediaQuery('(max-width:600px)')

  return isMobile
}
export default useFunctionalityCommonIsMobile
