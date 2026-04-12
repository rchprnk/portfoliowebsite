import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useReveal } from '../hooks/useReveal'

const StarIcon = () => (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill="none">
    <line x1="100" y1="0" x2="100" y2="200" stroke="url(#sg1)" strokeWidth="22" strokeLinecap="round"/>
    <line x1="0" y1="100" x2="200" y2="100" stroke="url(#sg1)" strokeWidth="22" strokeLinecap="round"/>
    <line x1="20" y1="20" x2="180" y2="180" stroke="url(#sg2)" strokeWidth="14" strokeLinecap="round"/>
    <line x1="180" y1="20" x2="20" y2="180" stroke="url(#sg2)" strokeWidth="14" strokeLinecap="round"/>
    <line x1="100" y1="10" x2="145" y2="55" stroke="url(#sg3)" strokeWidth="8" strokeLinecap="round"/>
    <line x1="100" y1="10" x2="55"  y2="55" stroke="url(#sg3)" strokeWidth="8" strokeLinecap="round"/>
    <line x1="190" y1="100" x2="145" y2="55"  stroke="url(#sg3)" strokeWidth="8" strokeLinecap="round"/>
    <line x1="190" y1="100" x2="145" y2="145" stroke="url(#sg3)" strokeWidth="8" strokeLinecap="round"/>
    <line x1="100" y1="190" x2="145" y2="145" stroke="url(#sg3)" strokeWidth="8" strokeLinecap="round"/>
    <line x1="100" y1="190" x2="55"  y2="145" stroke="url(#sg3)" strokeWidth="8" strokeLinecap="round"/>
    <line x1="10" y1="100" x2="55" y2="145" stroke="url(#sg3)" strokeWidth="8" strokeLinecap="round"/>
    <line x1="10" y1="100" x2="55" y2="55"  stroke="url(#sg3)" strokeWidth="8" strokeLinecap="round"/>
    <circle cx="100" cy="100" r="12" fill="url(#sg1)"/>
    <defs>
      <linearGradient id="sg1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#c8dff2"/>
        <stop offset="40%" stopColor="#8ab0d0"/>
        <stop offset="100%" stopColor="#2a4a6e"/>
      </linearGradient>
      <linearGradient id="sg2" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#9abdd8"/>
        <stop offset="100%" stopColor="#1e3a5f"/>
      </linearGradient>
      <linearGradient id="sg3" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#7aa0c0"/>
        <stop offset="100%" stopColor="#1a3050"/>
      </linearGradient>
    </defs>
  </svg>
)

const Contact = () => {
  const { t } = useTranslation()
  const ref = useReveal()
  const [activeBtn, setActiveBtn] = useState<'telegram' | 'email' | null>(null)

  return (
    <section className="contact" id="contact">
      <div className="contact__inner">
        <div className="contact__card reveal" ref={ref}>

          {/* Зірки — з'являються тільки при hover на кнопці */}
          <div className={`contact__star contact__star--tl ${activeBtn ? 'contact__star--active' : ''}`}>
            <StarIcon />
          </div>
          <div className={`contact__star contact__star--tr ${activeBtn ? 'contact__star--active' : ''}`}>
            <StarIcon />
          </div>
          <div className={`contact__star contact__star--br ${activeBtn ? 'contact__star--active' : ''}`}>
            <StarIcon />
          </div>

          {/* Сяйво від кнопки */}
          <div className={`contact__card-glow ${activeBtn === 'telegram' ? 'contact__card-glow--purple' : ''} ${activeBtn === 'email' ? 'contact__card-glow--blue' : ''}`} />

          <div className="contact__content">
            <h2 className="contact__title">
              {t('contact.title_line1')}
              <span className="contact__title--italic"> {t('contact.title_line2')}</span>
            </h2>

            <p className="contact__subtitle">{t('contact.subtitle')}</p>

            <div className="contact__actions">
              
                <a href="https://t.me/rchprnk"
                target="_blank"
                rel="noopener noreferrer"
                className="contact__btn contact__btn--light"
                onMouseEnter={() => setActiveBtn('telegram')}
                onMouseLeave={() => setActiveBtn(null)}
              >
                <span>✈</span> {t('contact.telegram')}
              </a>

              
                <a href="mailto:your@email.com"
                className="contact__btn contact__btn--dark"
                onMouseEnter={() => setActiveBtn('email')}
                onMouseLeave={() => setActiveBtn(null)}
              >
                <span>✉</span> {t('contact.email')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact