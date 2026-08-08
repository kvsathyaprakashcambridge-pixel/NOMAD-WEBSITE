import { createContext, useContext, useRef, useState, useCallback } from 'react'

const LoaderContext = createContext(null)

export function LoaderProvider({ children }) {
  const [active, setActive] = useState(false)
  const [opts, setOpts] = useState({
    words: ['NOMAD', 'SYSTEM', 'DESIGN', 'EXPLORE', 'MOVE'],
    variant: 'full',
  })
  const loaderRef = useRef(null)

  const showLoader = useCallback((options = {}) => {
    const mergedOpts = {
      words: options.words ?? ['NOMAD', 'SYSTEM', 'DESIGN', 'EXPLORE', 'MOVE'],
      variant: options.variant ?? 'full',
    }
    setOpts(mergedOpts)
    setActive(true)
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (loaderRef.current?.enter) {
            loaderRef.current.enter().then(resolve)
          } else {
            resolve()
          }
        })
      })
    })
  }, [])

  const hideLoader = useCallback(() => {
    if (loaderRef.current?.exit) {
      loaderRef.current.exit().then(() => setActive(false))
    } else {
      setActive(false)
    }
  }, [])

  return (
    <LoaderContext.Provider value={{ active, opts, loaderRef, showLoader, hideLoader }}>
      {children}
    </LoaderContext.Provider>
  )
}

export function useLoader() {
  const ctx = useContext(LoaderContext)
  if (!ctx) throw new Error('useLoader must be inside <LoaderProvider>')
  return ctx
}
