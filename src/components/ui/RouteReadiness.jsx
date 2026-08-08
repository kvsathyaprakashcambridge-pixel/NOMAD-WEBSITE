import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLoader } from '../../context/LoaderContext'

/**
 * Mounted at the top level inside Routes.
 * Calls hideLoader() when the pathname changes AND the component
 * commits to the DOM — meaning the new page is actually mounted.
 */
export default function RouteReadiness() {
  const location = useLocation()
  const { hideLoader, active } = useLoader()

  useEffect(() => {
    if (active) hideLoader()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  return null
}
