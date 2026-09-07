import { useCallback, useState } from 'react'

export type ToastState = {
  message: string
  tone: 'success' | 'error'
} | null

export function useToast() {
  const [toast, setToast] = useState<ToastState>(null)

  const showToast = useCallback(
    (message: string, tone: 'success' | 'error' = 'success') => {
      setToast({ message, tone })
    },
    [],
  )

  const dismissToast = useCallback(() => setToast(null), [])

  return { toast, setToast, showToast, dismissToast }
}
