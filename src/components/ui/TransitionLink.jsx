import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useLoader } from '../../context/LoaderContext'

/**
 * Wraps react-router-dom <Link>.
 * On click: prevents default → triggers loader entrance → navigates.
 * The new page's RouteReadiness hook will call hideLoader() when mounted.
 *
 * Same-page links are ignored (no loader for current route).
 */
export default function TransitionLink({ to, children, className, ...rest }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { showLoader } = useLoader()

  const handleClick = (e) => {
    const target = typeof to === 'string' ? to : to?.pathname
    // Don't intercept: current route, external, or modifier keys
    if (
      !target ||
      target === location.pathname ||
      e.metaKey || e.ctrlKey || e.shiftKey || e.altKey
    ) return

    e.preventDefault()
    showLoader().then(() => {
      navigate(to)
    })
  }

  return (
    <Link to={to} className={className} onClick={handleClick} {...rest}>
      {children}
    </Link>
  )
}
