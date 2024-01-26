import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import { useRef } from 'react'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

const DEBOUNCE_WAIT = 300

export const useDebounce = (wait = DEBOUNCE_WAIT) => {
  const debounceTimeoutRef = useRef<number>()

  const clear = () => {
    if (debounceTimeoutRef.current) {
      window.clearTimeout(debounceTimeoutRef.current)
    }
  }

  const debounce = (callback: () => void, clearing = true) => {
    if (clearing) {
      clear()
    }

    debounceTimeoutRef.current = window.setTimeout(() => {
      callback()
    }, wait)
  }

  return [debounce]
}
