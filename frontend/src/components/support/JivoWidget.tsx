import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '@/auth/useAuth'

const JIVO_SCRIPT_ID = 'jivo-widget-script'
const JIVO_SCRIPT_SRC = '//code.jivo.ru/widget/qdqeQizGKQ'

declare global {
  interface Window {
    jivo_destroy?: () => void
  }
}

export function JivoWidget() {
  const { pathname } = useLocation()
  const { user, isLoading } = useAuth()
  const isAuthPage = ['/login', '/register', '/forgot-password'].includes(pathname)
    || pathname.startsWith('/auth/')
  const shouldLoad = !isLoading && !isAuthPage && (Boolean(user) || pathname.startsWith('/legal/'))

  useEffect(() => {
    if (!shouldLoad || document.getElementById(JIVO_SCRIPT_ID)) return

    const script = document.createElement('script')
    script.id = JIVO_SCRIPT_ID
    script.src = JIVO_SCRIPT_SRC
    script.async = true
    document.body.appendChild(script)

    return () => {
      window.jivo_destroy?.()
      script.remove()
    }
  }, [shouldLoad])

  return null
}
