import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}

export const useQueryParam = () => {
  const { search } = useLocation()
  return new URLSearchParams(search)
}
