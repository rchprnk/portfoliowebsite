import { useEffect } from 'react'

/**
 * ScrollTrigger refresh on resize only — no per-frame scroll polling.
 */
export const useSmoothScroll = () => {
  useEffect(() => {
    let cancelled = false
    let cleanup = () => {}

    const init = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])

      if (cancelled) return

      gsap.registerPlugin(ScrollTrigger)
      ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true })

      const refresh = () => {
        window.requestAnimationFrame(() => ScrollTrigger.refresh())
      }

      refresh()
      window.addEventListener('resize', refresh, { passive: true })
      cleanup = () => window.removeEventListener('resize', refresh)
    }

    void init()

    return () => {
      cancelled = true
      cleanup()
    }
  }, [])
}
