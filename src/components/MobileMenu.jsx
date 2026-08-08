import { Link, useLocation } from 'react-router-dom'
import TransitionLink from './ui/TransitionLink'

const mobileItems = [
  {
    label: 'Home', to: '/',
    paths: ['M3 12l9-9 9 9v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', 'M9 22V12h6v10'],
  },
  {
    label: 'Product', to: '/product',
    paths: ['M6 2l3 4h6l3-4', 'M3 7h18l-1 14H4z', 'M8 11h8'],
  },
  {
    label: 'Features', to: '/features',
    paths: ['M12 2a10 10 0 1 0 10 10H12z', 'M12 2v10h10'],
  },
  {
    label: 'Our Story', to: '/story',
    paths: ['M4 19.5A2.5 2.5 0 0 1 6.5 17H20', 'M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z'],
  },
  {
    label: 'Contact', to: '/contact',
    paths: ['M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z', 'M22 6l-10 7L2 6'],
  },
]

export default function MobileMenu() {
  const location = useLocation()
  return (
    <nav className="mobile-menu" aria-label="Mobile navigation">
      {mobileItems.map(({ label, to, paths }) => (
        <TransitionLink
          key={to}
          to={to}
          className={`mobile-menu__item${location.pathname === to ? ' active' : ''}`}
          aria-current={location.pathname === to ? 'page' : undefined}
        >
          <svg className="mobile-menu__icon" viewBox="0 0 24 24" aria-hidden="true">
            {paths.map((d, i) => <path key={i} d={d} />)}
          </svg>
          <span>{label}</span>
        </TransitionLink>
      ))}
    </nav>
  )
}
