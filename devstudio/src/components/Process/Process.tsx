import { useEffect, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './Process.module.css'

const Process = () => {
  const { t } = useTranslation()
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])

  const steps = useMemo(
    () =>
      t('process.steps', { returnObjects: true }) as Array<{
        title: string
        desc: string
      }>,
    [t]
  )

  useEffect(() => {
    if (!Array.isArray(steps)) return

    const observers: IntersectionObserver[] = []
    const timers: number[] = []

    stepsRef.current.forEach((el, index) => {
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const timer = window.setTimeout(() => {
              el.classList.add(styles.processStepVisible)
            }, index * 150)
            timers.push(timer)

            observer.disconnect()
          }
        },
        { threshold: 0.3 }
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => {
      observers.forEach((o) => o.disconnect())
      timers.forEach((timer) => window.clearTimeout(timer))
    }
  }, [steps])

  if (!Array.isArray(steps)) return null

  return (
    <section className={styles.process} id="process" data-motion-section>
      <div className={styles.processInner}>
        <div className="section-header">
          <span className="section-kicker">{t('process.kicker')}</span>
          <h2 className="section-title">{t('process.title')}</h2>
          <p className="section-subtitle">{t('process.subtitle')}</p>
        </div>

        <div className={styles.processSteps}>
          {steps.map((step, index) => (
            <div
              key={index}
              className={styles.processStep}
              ref={(el) => {
                stepsRef.current[index] = el
              }}
            >
              {index < steps.length - 1 && <div className={styles.processConnector} />}

              <div className={styles.processBoxWrap}>
                <div className={styles.processBox}>
                  <span className={styles.processNumber}>0{index + 1}</span>
                </div>
              </div>

              <h3 className={styles.processTitle}>{step.title}</h3>
              <p className={styles.processDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Process
