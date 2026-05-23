import styles from './TechStack.module.css'
import { useTranslation } from 'react-i18next'

const SignalCard = ({
  value,
  label,
}: {
  value: string
  label: string
}) => {
  return (
    <article className={styles.techstackStat}>
      <strong>{value}</strong>
      <span>{label}</span>
    </article>
  )
}

const TechStack = () => {
  const { t } = useTranslation()
  const stats = t('techstack.stats', { returnObjects: true }) as Array<{
    value: string
    label: string
  }>
  const stack = t('techstack.stack', { returnObjects: true }) as string[]

  return (
    <section className={styles.techstack} id="signals" data-motion-section>
      <div className={`${styles.techstackInner} frame-corners`}>
        <span className="frame-corner frame-corner--tl" aria-hidden="true" />
        <span className="frame-corner frame-corner--tr" aria-hidden="true" />
        <span className="frame-corner frame-corner--bl" aria-hidden="true" />
        <span className="frame-corner frame-corner--br" aria-hidden="true" />
        <div className={styles.techstackLead}>
          <span className="section-kicker">{t('techstack.kicker')}</span>
          <h2 className={`${styles.techstackTitle} section-title--detailed`}>{t('techstack.title')}</h2>
          <p className={styles.techstackSubtitle}>{t('techstack.subtitle')}</p>
        </div>

        <div className={styles.techstackStats}>
          {stats.map((stat) => (
            <SignalCard key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>

        <div className={styles.techstackRail}>
          <span className={styles.techstackLabel}>{t('techstack.label')}</span>
          <div className={styles.techstackList}>
            {stack.map((tech) => (
              <div key={tech} className={styles.techstackItem}>
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TechStack
