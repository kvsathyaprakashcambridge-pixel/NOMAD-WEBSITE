import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Header from './components/Header'
import Footer from './components/Footer'
import MobileMenu from './components/MobileMenu'
import BackTop from './components/BackTop'
import Home from './pages/Home'
import Product from './pages/Product'
import Features from './pages/Features'
import Story from './pages/Story'
import Contact from './pages/Contact'
import './styles/globals.css'
import './styles/home.css'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/features" element={<Features />} />
        <Route path="/story" element={<Story />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
      <MobileMenu />
      <BackTop />
    </BrowserRouter>
  )
}

export default App
