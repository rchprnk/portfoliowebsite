let refreshTimer: ReturnType<typeof setTimeout> | null = null

export const scheduleScrollRefresh = (delayMs = 360) => {
  if (refreshTimer) window.clearTimeout(refreshTimer)
  refreshTimer = window.setTimeout(async () => {
    const [{ gsap }, { ScrollTrigger }] = await Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ])
    gsap.registerPlugin(ScrollTrigger)
    ScrollTrigger.refresh()
    refreshTimer = null
  }, delayMs)
}
