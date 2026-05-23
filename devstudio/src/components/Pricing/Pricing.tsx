import { useEffect, useRef, useState, type TransitionEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { pricingTiers } from '../../data/pricing'
import { scheduleScrollRefresh } from '../../lib/scheduleScrollRefresh'
import styles from './Pricing.module.css'

const Pricing = () => {
  const { t } = useTranslation()
  const [openIndex, setOpenIndex] = useState(1)
  const [visibleItems, setVisibleItems] = useState<Set<number>>(() => new Set())
  const headerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const headerEl = headerRef.current
    let headerObserver: IntersectionObserver | undefined
    if (headerEl) {
      headerObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            headerEl.classList.add('revealed')
            headerObserver?.disconnect()
          }
        },
        { threshold: 0.2 }
      )
      headerObserver.observe(headerEl)
    }

    const observers: IntersectionObserver[] = []
    const timers: number[] = []
    itemRefs.current.forEach((el, index) => {
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const timer = window.setTimeout(() => {
              setVisibleItems((current) => {
                if (current.has(index)) return current
                const next = new Set(current)
                next.add(index)
                return next
              })
            }, index * 120)
            timers.push(timer)
            obs.disconnect()
          }
        },
        { threshold: 0.1 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => {
      headerObserver?.disconnect()
      observers.forEach((o) => o.disconnect())
      timers.forEach((timer) => window.clearTimeout(timer))
    }
  }, [])

  const togglePlan = (index: number) => {
    setOpenIndex(index)
    scheduleScrollRefresh(380)
  }

  const handleBodyTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.propertyName === 'grid-template-rows') {
      scheduleScrollRefresh(60)
    }
  }

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className={styles.pricing} id="pricing" data-motion-section>
      <div className={styles.pricingInner}>
        <div className="section-header reveal" ref={headerRef}>
          <span className="section-kicker">{t('pricing.kicker')}</span>
          <h2 className="section-title">{t('pricing.title')}</h2>
          <p className="section-subtitle">{t('pricing.subtitle')}</p>
        </div>

        <div className={styles.pricingAccordion}>
          {pricingTiers.map((plan, index) => {
            const isOpen = openIndex === index

            return (
              <div
                key={plan.title}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                className={[
                  styles.accordionItem,
                  visibleItems.has(index) ? styles.accordionItemVisible : '',
                  isOpen ? styles.accordionItemOpen : '',
                ].join(' ')}
              >
                <button
                  type="button"
                  className={styles.accordionItemHeader}
                  onClick={() => togglePlan(index)}
                  aria-expanded={isOpen}
                >
                  <div className={styles.accordionItemLeft}>
                    {pricingTiers[index]?.popular && (
                      <span className={styles.accordionItemPopularLabel}>{t('pricing.featured')}</span>
                    )}
                    <span className={styles.accordionItemTitle}>{plan.title}</span>
                    <span className={styles.accordionItemDescription}>{plan.description}</span>
                  </div>
                  <div className={styles.accordionItemRight}>
                    <span className={styles.accordionItemPrice}>{plan.priceUsd}</span>
                    <span
                      className={[
                        styles.accordionItemArrow,
                        isOpen ? styles.accordionItemArrowOpen : '',
                      ].join(' ')}
                    >
                      ∨
                    </span>
                  </div>
                </button>

                <div
                  className={styles.accordionItemBodyWrap}
                  aria-hidden={!isOpen}
                  onTransitionEnd={handleBodyTransitionEnd}
                >
                  <div className={styles.accordionItemBodyInner}>
                    <div className={styles.accordionItemBody}>
                      <ul className={styles.accordionItemFeatures}>
                        {plan.description.split(', ').map((feature) => (
                          <li key={feature} className={styles.accordionItemFeature}>
                            <span>✓</span> {feature}
                          </li>
                        ))}
                      </ul>
                      <div className={styles.accordionItemFooter}>
                        {plan.delivery && (
                          <span className={styles.accordionItemDuration}>Delivery: {plan.delivery}</span>
                        )}
                        <button className="btn btn--primary" onClick={() => scrollTo('contact')}>
                          {t('pricing.cta')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Pricing
