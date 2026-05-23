import { useTranslation } from 'react-i18next'
import styles from './Testimonials.module.css'

const Testimonials = () => {
  const { t } = useTranslation()
  const metrics = t('testimonials.metrics', { returnObjects: true }) as Array<{
    value: string
    label: string
  }>
  const quotes = t('testimonials.items', { returnObjects: true }) as Array<{
    quote: string
    name: string
    role: string
  }>

  return (
    <section className={styles.testimonials} id="studio">
      <div className={styles.inner}>
        <div className={styles.lead}>
          <div className="section-header">
            <span className="section-kicker">{t('testimonials.kicker')}</span>
            <h2 className="section-title">{t('testimonials.title')}</h2>
            <p className="section-subtitle">{t('testimonials.subtitle')}</p>
          </div>

          <div className={styles.metrics} aria-label="Studio proof points">
            {metrics.map((metric) => (
              <div key={metric.label} className={styles.metric}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.quotes}>
          {quotes.map((item) => (
            <article key={item.name} className={styles.quoteCard}>
              <p className={styles.quoteMark}>“</p>
              <p className={styles.quoteText}>{item.quote}</p>
              <div className={styles.quoteMeta}>
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
