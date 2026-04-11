import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

const priceUsd = ['~$100', '~$180', '~$300', '~$70']
const popular = [false, true, false, false]

const Pricing = () => {
  const { t } = useTranslation()
  const [openIndex, setOpenIndex] = useState<number | null>(1)
  const headerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  const plans = t('pricing.plans', { returnObjects: true }) as Array<{
    title: string
    duration: string
    features: string[]
  }>

  useEffect(() => {
    // Анімація заголовку
    const headerEl = headerRef.current
    if (headerEl) {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            headerEl.classList.add('revealed')
            obs.disconnect()
          }
        },
        { threshold: 0.2 }
      )
      obs.observe(headerEl)
    }

    // Анімація рядків акордеону по черзі
    const observers: IntersectionObserver[] = []

    itemRefs.current.forEach((el, index) => {
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.classList.add('accordion-item--visible')
            }, index * 120)
            obs.disconnect()
          }
        },
        { threshold: 0.1 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [plans])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="pricing" id="pricing">
      <div className="pricing__inner">
        <div className="section-header reveal" ref={headerRef}>
          <h2 className="section-title">{t('pricing.title')}</h2>
          <p className="section-subtitle">{t('pricing.subtitle')}</p>
        </div>

        <div className="pricing__accordion">
          {plans.map((plan, index) => (
            <div
              key={index}
              ref={(el) => { itemRefs.current[index] = el }}
              className={`accordion-item ${openIndex === index ? 'accordion-item--open' : ''} ${popular[index] ? 'accordion-item--popular' : ''}`}
            >
              <button
                className="accordion-item__header"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="accordion-item__left">
                  {popular[index] && (
                    <span className="accordion-item__popular">★ Most Popular</span>
                  )}
                  <span className="accordion-item__title">{plan.title}</span>
                </div>
                <div className="accordion-item__right">
                  <span className="accordion-item__price">{priceUsd[index]}</span>
                  <span className="accordion-item__arrow">
                    {openIndex === index ? '∧' : '∨'}
                  </span>
                </div>
              </button>

              {openIndex === index && (
                <div className="accordion-item__body">
                  <ul className="accordion-item__features">
                    {plan.features.map((f) => (
                      <li key={f} className="accordion-item__feature">
                        <span>✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="accordion-item__footer">
                    <span className="accordion-item__duration">🕐 {plan.duration}</span>
                    <button
                      className="btn btn--primary"
                      onClick={() => scrollTo('contact')}
                    >
                      {t('pricing.cta')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing