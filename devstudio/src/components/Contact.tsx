import { useTranslation } from 'react-i18next'
import { useReveal } from '../hooks/useReveal'

const Contact = () => {
  const { t } = useTranslation()
  const ref = useReveal()

  return (
    <section className="contact" id="contact">
      <div className="contact__inner">
        <div className="contact__card reveal" ref={ref}>

          {/* Декоративні зірки */}
          <div className="contact__star contact__star--tl">✳</div>
          <div className="contact__star contact__star--tr">✳</div>
          <div className="contact__star contact__star--br">✳</div>

          {/* Фоновий градієнт що рухається при hover */}
          <div className="contact__glow" />

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
              >
                <span>✈</span> {t('contact.telegram')}
              </a>
              
                <a href="mailto:your@email.com"
                className="contact__btn contact__btn--dark"
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