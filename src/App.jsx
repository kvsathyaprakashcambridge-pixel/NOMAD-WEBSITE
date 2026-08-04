import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Header from './components/Header'
import Footer from './components/Footer'
import MobileMenu from './components/MobileMenu'
import BackTop from './components/BackTop'
import './styles/globals.css'
import './styles/home.css'

const Home = lazy(() => import('./pages/Home'))
const Product = lazy(() => import('./pages/Product'))
const Features = lazy(() => import('./pages/Features'))
const Story = lazy(() => import('./pages/Story'))
const Contact = lazy(() => import('./pages/Contact'))

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Suspense fallback={<div style={{ minHeight: '100vh', background: '#0a0b09' }} />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/features" element={<Features />} />
          <Route path="/story" element={<Story />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
      <Footer />
      <MobileMenu />
      <BackTop />
    </BrowserRouter>
  )
}

export default App
