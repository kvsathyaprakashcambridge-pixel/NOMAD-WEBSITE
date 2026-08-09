import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu'
import { X1_VARIANTS } from '../data/x1-variants'
import { useCart } from '../context/CartContext'
import ProductPrice from '../components/ProductPrice'
import '../styles/x1-detail.css'

export default function X1() {
  const { variantId } = useParams()
  const navigate = useNavigate()
  const { dispatch } = useCart()
  
  // Find variant, fallback to original 'x1' if not found
  const variant = X1_VARIANTS.find(v => v.id === variantId) || X1_VARIANTS[0]
  
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState('description') // 'description', 'specs', 'who'
  const [quantity, setQuantity] = useState(1)

  // Reset states when variant changes
  useEffect(() => {
    setActiveImageIndex(0)
    setQuantity(1)
    setActiveTab('description')
    window.scrollTo(0, 0)
  }, [variantId])

  const gallery = variant.gallery
  
  const handlePrev = () => {
    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : gallery.length - 1))
  }
  
  const handleNext = () => {
    setActiveImageIndex((prev) => (prev < gallery.length - 1 ? prev + 1 : 0))
  }

  const handleAddToCart = () => {
    dispatch({ 
      type: 'ADD_ITEM', 
      payload: { 
        id: variant.name, 
        name: variant.name, 
        variant: variant.colour, 
        price: variant.price, 
        img: variant.img 
      } 
    })
    
    // Add additional items if quantity > 1
    for (let i = 1; i < quantity; i++) {
      dispatch({ 
        type: 'INCREMENT', 
        payload: { 
          id: variant.name, 
          variant: variant.colour 
        } 
      })
    }
    
    dispatch({ type: 'TOGGLE_PANEL', payload: true })
  }

  return (
    <main className="x1-detail-page">
      <div className="x1-detail-container">
        
        {/* Gallery Section */}
        <div className="x1-gallery-section">
          <div className="x1-main-image-container">
            <img 
              src={gallery[activeImageIndex].src} 
              alt={gallery[activeImageIndex].alt || `${variant.name} main view`}
              className="x1-main-image"
            />
            {gallery.length > 1 && (
              <div className="x1-gallery-controls">
                <button 
                  className="x1-gallery-btn" 
                  onClick={handlePrev}
                  aria-label="Previous image"
                >
                  <LuChevronLeft size={24} />
                </button>
                <button 
                  className="x1-gallery-btn" 
                  onClick={handleNext}
                  aria-label="Next image"
                >
                  <LuChevronRight size={24} />
                </button>
              </div>
            )}
          </div>
          
          {gallery.length > 1 && (
            <div className="x1-thumbnails" role="tablist" aria-label="Product image thumbnails">
              {gallery.map((img, idx) => (
                <button 
                  key={idx}
                  className={`x1-thumbnail-btn ${idx === activeImageIndex ? 'active' : ''}`}
                  onClick={() => setActiveImageIndex(idx)}
                  role="tab"
                  aria-selected={idx === activeImageIndex}
                  aria-label={`View image ${idx + 1}`}
                >
                  <img src={img.src} alt="" className="x1-thumbnail-img" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info Section */}
        <div className="x1-info-section">
          <Link to="/product" className="x1-back-link">
            &larr; BACK TO ALL BAGS
          </Link>
          
          <div className="x1-product-series">{variant.series}</div>
          <h1 className="x1-product-title">{variant.name}</h1>
          <div className="x1-product-color">{variant.colour}</div>
          <div className="x1-product-price">
            <ProductPrice priceString={variant.price} />
          </div>

          <div className="x1-tabs">
            <div className="x1-tab-list" role="tablist">
              <button 
                className={`x1-tab-btn ${activeTab === 'description' ? 'active' : ''}`}
                onClick={() => setActiveTab('description')}
                role="tab"
                aria-selected={activeTab === 'description'}
              >
                Description
              </button>
              <button 
                className={`x1-tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
                onClick={() => setActiveTab('specs')}
                role="tab"
                aria-selected={activeTab === 'specs'}
              >
                Specs
              </button>
              <button 
                className={`x1-tab-btn ${activeTab === 'who' ? 'active' : ''}`}
                onClick={() => setActiveTab('who')}
                role="tab"
                aria-selected={activeTab === 'who'}
              >
                Who it's for
              </button>
            </div>
            
            <div className="x1-tab-content" role="tabpanel">
              {activeTab === 'description' && (
                <p>{variant.description}</p>
              )}
              {activeTab === 'specs' && (
                <div className="x1-specs-grid">
                  {variant.specs.map((spec, idx) => (
                    <div key={idx} className="x1-spec-item">
                      <span className="x1-spec-label">{spec.label}</span>
                      <span className="x1-spec-value">{spec.value}</span>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'who' && (
                <p>{variant.whoItsFor}</p>
              )}
            </div>
          </div>

          <div className="x1-actions-wrapper">
            <div className="x1-qty-selector">
              <button 
                className="x1-qty-btn" 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Decrease quantity"
              >
                &minus;
              </button>
              <div className="x1-qty-value" aria-live="polite">
                {quantity}
              </div>
              <button 
                className="x1-qty-btn" 
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            
            <button 
              className="x1-add-btn" 
              onClick={handleAddToCart}
            >
              ADD TO MANIFEST
            </button>
          </div>
        </div>
        
      </div>
    </main>
  )
}
