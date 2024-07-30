import { useEffect, useState } from 'react'

const usePageLoaded = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])
  return {
    isLoaded,
  }
}

export default usePageLoaded
