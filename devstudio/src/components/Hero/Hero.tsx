import { useLayoutEffect, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useReveal } from '../../hooks/useReveal'
import styles from './Hero.module.css'

const Hero = () => {
  const { t } = useTranslation()
  const refBadge = useReveal()
  const lineRefs = useRef<HTMLSpanElement[]>([])
  const heroRef = useRef<HTMLElement>(null)
  const heroCounterRef = useRef<HTMLSpanElement>(null)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const trustItems = t('hero.trust', { returnObjects: true }) as string[]
  const proofItems = t('hero.proof', { returnObjects: true }) as Array<{
    label: string
    value: string
  }>
  const panels = t('hero.panels', { returnObjects: true }) as Array<{
    eyebrow: string
    title: string
    note: string
  }>
  const frameMetrics = t('hero.frameMetrics', { returnObjects: true }) as Array<{
    label: string
    value: string
  }>
  const frameSteps = t('hero.frameSteps', { returnObjects: true }) as string[]
  const titleLines = useMemo(() => [t('hero.title1'), t('hero.title2'), t('hero.title3')], [t])

  useLayoutEffect(() => {
    const lines = lineRefs.current.filter(Boolean)
    const counterEl = heroCounterRef.current
    let cleanup = () => {}
    let cancelled = false

    const init = async () => {
      const { gsap } = await import('gsap')
      if (cancelled) return

      const ctx = gsap.context(() => {
      gsap.set(lines, { opacity: 1, y: 0 })

      const mm = gsap.matchMedia()

      mm.add('(min-width: 969px)', () => {
        gsap.fromTo(lines, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power2.out' })

        if (counterEl) {
          const counterState = { value: 18 }
          gsap.to(counterState, {
            value: 128,
            duration: 2.2,
            ease: 'power2.out',
            onUpdate: () => {
              counterEl.textContent = String(Math.round(counterState.value)).padStart(3, '0')
            },
          })
        }
      })
    }, heroRef)
      cleanup = () => ctx.revert()
    }

    void init()

    return () => {
      cancelled = true
      cleanup()
    }
  }, [])

  const setLineRef = (el: HTMLSpanElement | null, index: number) => {
    if (!el) return
    lineRefs.current[index] = el
  }

  return (
    <section className={styles.hero} id="top" ref={heroRef} data-motion-section>
      <div className={styles.heroGrid} aria-hidden="true" />
      <div className={styles.heroBloom} aria-hidden="true" />

      <div className={`${styles.heroContainer} frame-corners`}>
        <span className="frame-corner frame-corner--tl" aria-hidden="true" />
        <span className="frame-corner frame-corner--tr" aria-hidden="true" />
        <span className="frame-corner frame-corner--bl" aria-hidden="true" />
        <span className="frame-corner frame-corner--br" aria-hidden="true" />

        <div className={styles.heroCopy}>
          <div className={`${styles.heroBadge} reveal`} ref={refBadge}>
            <span className={styles.heroBadgeIcon}>✦</span>
            {t('hero.badge')}
          </div>

          <h1 className={styles.heroTitle}>
            {titleLines.map((line, lineIndex) => (
              <span
                key={line}
                ref={(el) => setLineRef(el, lineIndex)}
                className={`${styles.heroLine} ${lineIndex === 2 ? styles.heroTitleMuted : ''}`}
              >
                {line}
              </span>
            ))}
          </h1>

          <p className={styles.heroSubtitle}>{t('hero.subtitle')}</p>

          <div className={styles.heroActions}>
            <button className="btn btn--primary btn--large" onClick={() => scrollTo('contact')}>
              {t('hero.cta1')}
            </button>
            <button className="btn btn--outline btn--large" onClick={() => scrollTo('work')}>
              {t('hero.cta2')}
            </button>
          </div>

          <div className={styles.heroTrust}>
            {trustItems.map((item) => (
              <span key={item} className={styles.heroTrustItem}>
                {item}
              </span>
            ))}
          </div>

          <div className={styles.heroProof}>
            {proofItems.map((item) => (
              <div key={item.label} className={styles.heroProofCard}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <div className={styles.heroScrollDock}>
            <div className={styles.heroScrollTicker}>
              <span>{t('hero.scrollLabel')}</span>
              <strong ref={heroCounterRef}>018</strong>
            </div>
            <div className={styles.heroScrollLine}>
              <i />
            </div>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.heroSceneGlow} aria-hidden="true" />
          <div className={styles.heroSceneRing} aria-hidden="true" />

          <aside className={styles.heroFloatCard} data-float="top">
            <span className={styles.heroFloatIcon} aria-hidden="true" />
            <span>{panels[0]?.eyebrow}</span>
            <strong>{panels[0]?.title}</strong>
          </aside>

          <aside className={`${styles.heroFloatCard} ${styles.heroFloatCardAlt}`} data-float="bottom">
            <span>{panels[1]?.eyebrow}</span>
            <strong>{panels[1]?.title}</strong>
            <p>{panels[1]?.note}</p>
          </aside>

          <div className={styles.heroFrame}>
            <div className={styles.heroFrameGrid} aria-hidden="true" />
            <div className={styles.heroFrameChrome}>
              <div className={styles.heroTraffic} aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
              <span className={styles.heroFrameUrl}>nexriv.studio/launch</span>
              <span className={styles.heroFrameLive}>
                <em aria-hidden="true" />
                {t('hero.frameLive')}
              </span>
            </div>

            <div className={styles.heroFrameBody}>
              <nav className={styles.heroFrameNav} aria-hidden="true">
                <span className={styles.heroNavActive}>{t('hero.frameSidebar1')}</span>
                <span>{t('hero.frameSidebar2')}</span>
                <span>{t('hero.frameSidebar3')}</span>
              </nav>

              <div className={styles.heroFrameMain}>
                <div className={styles.heroLeadCard}>
                  <div className={styles.heroLeadGlow} aria-hidden="true" />
                  <span>{t('hero.frameCardEyebrow')}</span>
                  <strong>{t('hero.frameCardTitle')}</strong>
                  <p>{t('hero.frameCardText')}</p>
                </div>

                <div className={styles.heroMetricRow}>
                  {frameMetrics.map((metric, index) => (
                    <div key={metric.label} className={styles.heroMetric} style={{ animationDelay: `${0.12 + index * 0.1}s` }}>
                      <span>{metric.label}</span>
                      <strong>{metric.value}</strong>
                    </div>
                  ))}
                </div>

                <div className={styles.heroChartPanel}>
                  <div className={styles.heroChartMeta}>
                    <span>{t('hero.frameChartLabel')}</span>
                    <strong>{t('hero.frameChartValue')}</strong>
                  </div>
                  <div className={styles.heroChartPlot} aria-hidden="true">
                    <span style={{ height: '38%' }} />
                    <span style={{ height: '72%' }} />
                    <span style={{ height: '54%' }} />
                    <span style={{ height: '88%' }} />
                    <span style={{ height: '64%' }} />
                  </div>
                  <div className={styles.heroChartLine} aria-hidden="true" />
                </div>

                <div className={styles.heroTimeline}>
                  <span>{t('hero.frameTimeline')}</span>
                  <div className={styles.heroTimelineSteps}>
                    {frameSteps.map((step, index) => (
                      <span key={step} className={index === 0 ? styles.heroStepActive : ''}>
                        {step}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.heroCodePanel}>
                  <span>{t('hero.frameCodeLabel')}</span>
                  <code>trust.system({'{'} clarity: 1, motion: 'cinematic' {'}'})</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
