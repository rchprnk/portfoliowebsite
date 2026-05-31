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
  const stack = (t('techstack.stack', { returnObjects: true }) as string[]).slice(0, 5)
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

          <div className={styles.heroAssurance}>
            <span>{t('hero.frameLive')}</span>
            <strong>{t('hero.frameCardTitle')}</strong>
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
              <span className={styles.heroFrameUrl}>NEXRIV DASHBOARD · SYSTEM HEALTH & METRICS</span>
              <span className={styles.heroFrameLive}>
                <em aria-hidden="true" />
                {t('hero.frameLive')}
              </span>
            </div>

            <div className={styles.heroFrameBody}>
              <div className={styles.heroSystemTop}>
                <div className={styles.heroCoreModule}>
                  <div className={styles.heroCoreOrb} aria-hidden="true">
                    <span />
                    <i />
                    <b>⚡</b>
                  </div>
                  <div>
                    <span>{t('hero.frameLive')}</span>
                    <strong>{t('hero.frameCardTitle')}</strong>
                    <p>{t('hero.frameCardText')}</p>
                  </div>
                </div>

                <div className={styles.heroStatusGrid}>
                  <div>
                    <span>{t('hero.frameSidebar1')}</span>
                    <strong>Confirmed</strong>
                  </div>
                  <div>
                    <span>{t('hero.frameSidebar2')}</span>
                    <strong>Up-to-date</strong>
                  </div>
                  <div>
                    <span>{t('hero.frameSidebar3')}</span>
                    <strong>Armed</strong>
                  </div>
                </div>
              </div>

              <div className={styles.heroSystemMetrics}>
                <div className={styles.heroPerformancePanel}>
                  <div className={styles.heroPanelLabel}>
                    <span>{t('hero.frameChartLabel')}</span>
                    <strong>{frameMetrics[0]?.value}</strong>
                  </div>
                  <div className={styles.heroBarDeck} aria-hidden="true">
                    {[34, 42, 38, 48, 58, 70, 82, 94].map((height, index) => (
                      <i key={height} style={{ height: `${height}%`, animationDelay: `${index * 0.08}s` }} />
                    ))}
                  </div>
                  <div className={styles.heroTrendLine} aria-hidden="true" />
                </div>

                <div className={styles.heroTrustGauge}>
                  <div className={styles.heroPanelLabel}>
                    <span>{frameMetrics[1]?.label}</span>
                    <strong>{frameMetrics[1]?.value}/100</strong>
                  </div>
                  <div className={styles.heroGaugeArc} aria-hidden="true">
                    <span />
                    <i />
                  </div>
                  <div className={styles.heroGaugeLegend}>
                    <span>Credibility</span>
                    <span>Security</span>
                    <span>Scale</span>
                  </div>
                </div>

                <div className={styles.heroClarityPill}>
                  <span>{frameMetrics[2]?.label}</span>
                  <strong>{frameMetrics[2]?.value}</strong>
                </div>
              </div>

              <div className={styles.heroPathway}>
                <span>{t('hero.frameTimeline')}</span>
                <div className={styles.heroPathwayTrack} aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </div>
                <div className={styles.heroPathwayNodes}>
                  {frameSteps.map((step, index) => (
                    <div key={step} className={index === 0 ? styles.heroPathwayActive : ''}>
                      <strong>{step}</strong>
                      <span>{stack[index] ?? stack[0]}</span>
                    </div>
                  ))}
                  <div>
                    <strong>Launch execution</strong>
                    <span>{stack[3] ?? 'Motion'}</span>
                  </div>
                </div>
              </div>

              <div className={styles.heroSystemFooter}>
                <div>
                  <span>{panels[1]?.eyebrow}</span>
                  <strong>{panels[1]?.title}</strong>
                  <p>{panels[1]?.note}</p>
                </div>
                <div className={styles.heroFooterGlass} aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
