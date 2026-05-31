type RevealVariant = 'lift' | 'card' | 'chip' | 'detail'

type RevealGroup = {
  selector: string
  variant: RevealVariant
  step?: number
  maxDelay?: number
}

const REVEAL_GROUPS: RevealGroup[] = [
  { selector: '.section-header, [class*="techstackLead"], [class*="workHeader"]', variant: 'lift', step: 90, maxDelay: 180 },
  { selector: '[class*="heroTrustItem"], [class*="heroProofCard"], [class*="techstackStat"], [class*="metric"], [class*="quoteCard"], [class*="footerMetaCard"]', variant: 'card', step: 85, maxDelay: 340 },
  { selector: '[class*="techstackItem"], [class*="contactPoint"], [class*="workDeckTechs"] span, [class*="workModalTags"] span', variant: 'chip', step: 45, maxDelay: 260 },
  { selector: '[class*="processTitle"], [class*="processDesc"], [class*="contactMeta"] div, [class*="contactSocialLink"]', variant: 'detail', step: 70, maxDelay: 260 },
]

const isManagedElsewhere = (element: Element) => {
  const className = String((element as HTMLElement).className)
  return (
    className.includes('accordionItem') ||
    className.includes('processStep') ||
    className.includes('workDeckCard') ||
    Boolean(element.closest('[class*="workStackStage"]'))
  )
}

export const initPremiumScrollMotion = () => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return () => {}
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}

  const targets = new Set<HTMLElement>()

  REVEAL_GROUPS.forEach(({ selector, variant, step = 70, maxDelay = 280 }) => {
    document.querySelectorAll<HTMLElement>(selector).forEach((element, index) => {
      if (isManagedElsewhere(element) || targets.has(element)) return

      const delay = Math.min((index % 8) * step, maxDelay)
      element.dataset.premiumReveal = variant
      element.style.setProperty('--premium-reveal-delay', `${delay}ms`)
      targets.add(element)
    })
  })

  if (!targets.size) return () => {}

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const element = entry.target as HTMLElement
        if (entry.isIntersecting) {
          element.dataset.premiumRevealState = 'visible'
        } else {
          delete element.dataset.premiumRevealState
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  )

  targets.forEach((target) => observer.observe(target))

  return () => {
    observer.disconnect()
    targets.forEach((target) => {
      delete target.dataset.premiumReveal
      delete target.dataset.premiumRevealState
      target.style.removeProperty('--premium-reveal-delay')
    })
  }
}
