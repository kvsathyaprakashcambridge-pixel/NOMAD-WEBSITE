import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Header from './components/Header'
import Footer from './components/Footer'
import MobileMenu from './components/MobileMenu'
import BackTop from './components/BackTop'
import WordLoader from './components/ui/WordLoader'
import RouteReadiness from './components/ui/RouteReadiness'
import ManifestPanel from './components/ManifestPanel'
import { LoaderProvider, useLoader } from './context/LoaderContext'
import { CartProvider } from './context/CartContext'
import './styles/globals.css'
import './styles/home.css'
import './styles/loader.css'

const Home = lazy(() => import('./pages/Home'))
const Product = lazy(() => import('./pages/Product'))
const Features = lazy(() => import('./pages/Features'))
const Story = lazy(() => import('./pages/Story'))
const Contact = lazy(() => import('./pages/Contact'))
const X1 = lazy(() => import('./pages/X1'))
const Login = lazy(() => import('./pages/Login'))

// Inner component so it can use useLoader (must be inside LoaderProvider)
function AppInner() {
  const { loaderRef, opts } = useLoader()
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'

  return (
    <>
      <ScrollToTop />

      {/* Site chrome — hidden on the login route */}
      {!isLoginPage && <Header />}

      <Suspense fallback={<div style={{ minHeight: '100vh', background: isLoginPage ? '#0d0f10' : 'var(--paper, #f4f1e9)' }} />}>
        {/* RouteReadiness hides the WordLoader transition overlay when the new page mounts */}
        {!isLoginPage && <RouteReadiness />}
        <Routes>
          <Route path="/"              element={<Home />} />
          <Route path="/product"       element={<Product />} />
          <Route path="/features"      element={<Features />} />
          <Route path="/story"         element={<Story />} />
          <Route path="/contact"       element={<Contact />} />
          <Route path="/x1"            element={<Navigate to="/x1/x1" replace />} />
          <Route path="/x1/:variantId" element={<X1 />} />
          <Route path="/login"         element={<Login />} />
        </Routes>
      </Suspense>

      {!isLoginPage && <Footer />}
      {!isLoginPage && <MobileMenu />}
      {!isLoginPage && <ManifestPanel />}
      {!isLoginPage && <BackTop />}

      {/* Global transition overlay — only shown between non-login routes */}
      {!isLoginPage && (
        <WordLoader
          ref={loaderRef}
          words={opts.words}
          variant={opts.variant}
        />
      )}
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <LoaderProvider>
        <CartProvider>
          <AppInner />
        </CartProvider>
      </LoaderProvider>
    </BrowserRouter>
  )
}

export default App
