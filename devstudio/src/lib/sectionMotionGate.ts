const SECTION_SELECTOR = '[data-motion-section]'

const setSectionFrozen = (section: HTMLElement, frozen: boolean) => {
  section.dataset.motionFrozen = frozen ? 'true' : 'false'
  section.style.setProperty('--section-anim-play-state', frozen ? 'paused' : 'running')
  // Keep ScrollTrigger active — disabling breaks pinned deck scroll in Work.
}

export const initSectionMotionGate = () => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return () => {}

  const sections = Array.from(document.querySelectorAll<HTMLElement>(SECTION_SELECTOR))
  if (!sections.length) return () => {}

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        setSectionFrozen(entry.target as HTMLElement, !entry.isIntersecting)
      })
    },
    { threshold: 0.05, rootMargin: '120px 0px' }
  )

  sections.forEach((section) => observer.observe(section))

  return () => observer.disconnect()
}
