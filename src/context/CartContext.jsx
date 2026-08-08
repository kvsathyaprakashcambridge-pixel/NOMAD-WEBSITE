import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext(null)

const initialState = {
  items: [],
  panelOpen: false,
  sealedStatus: false,
  lastAddedTimestamp: null
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.payload.id && item.variant === action.payload.variant
      )
      
      let newItems
      if (existingItemIndex >= 0) {
        newItems = [...state.items]
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + 1,
          addedAt: Date.now()
        }
      } else {
        newItems = [...state.items, { ...action.payload, quantity: 1, addedAt: Date.now() }]
      }
      
      return { 
        ...state, 
        items: newItems,
        lastAddedTimestamp: Date.now(),
        lastAddedItem: action.payload
      }
    }
    case 'INCREMENT': {
      const newItems = state.items.map(item => 
        item.id === action.payload.id && item.variant === action.payload.variant
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
      return { ...state, items: newItems, lastAddedTimestamp: Date.now(), lastAddedItem: action.payload }
    }
    case 'DECREMENT': {
      const newItems = state.items.map(item => 
        item.id === action.payload.id && item.variant === action.payload.variant
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
      return { ...state, items: newItems }
    }
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => 
        !(item.id === action.payload.id && item.variant === action.payload.variant)
      )
      return { ...state, items: newItems }
    }
    case 'TOGGLE_PANEL':
      return { ...state, panelOpen: action.payload ?? !state.panelOpen, sealedStatus: false }
    case 'SEAL_START':
      return { ...state, sealedStatus: true }
    case 'SEAL_FINISH':
      return { ...state, items: [], sealedStatus: false, panelOpen: false }
    case 'HYDRATE':
      return { ...state, items: action.payload }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Hydrate on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('nomad-manifest')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) {
          dispatch({ type: 'HYDRATE', payload: parsed })
        }
      }
    } catch (e) {
      console.warn('Failed to parse manifest from localStorage')
    }
  }, [])

  // Persist on change
  useEffect(() => {
    localStorage.setItem('nomad-manifest', JSON.stringify(state.items))
  }, [state.items])

  // Context value helpers
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = state.items.reduce((sum, item) => {
    // Basic parse of price string assuming standard format (e.g. "₹3,999" -> 3999)
    const numericPrice = typeof item.price === 'number' 
      ? item.price 
      : parseInt(item.price.replace(/[^0-9]/g, ''), 10) || 0
    return sum + (numericPrice * item.quantity)
  }, 0)

  const value = {
    state,
    dispatch,
    totalItems,
    totalPrice
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
