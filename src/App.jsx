import { lazy, Suspense, useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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

// Inner component so it can use useLoader (must be inside LoaderProvider)
function AppInner() {
  const { loaderRef, opts, active } = useLoader()
  return (
    <>
      <ScrollToTop />
      <Header />
      <Suspense fallback={<div style={{ minHeight: '100vh', background: '#0a0b09' }} />}>
        <RouteReadiness />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/features" element={<Features />} />
          <Route path="/story" element={<Story />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/x1/:variantId" element={<X1 />} />
        </Routes>
      </Suspense>
      <Footer />
      <MobileMenu />
      <ManifestPanel />
      <BackTop />

      {/* Global overlay — mounted once, GSAP controls visibility */}
      <WordLoader
        ref={loaderRef}
        words={opts.words}
        variant={opts.variant}
      />
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
