import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { projects, type ProjectCaseStudy } from '../../data/projects'
import { initWorkDeck } from '../../lib/initWorkDeck'
import { useReveal } from '../../hooks/useReveal'
import ProjectPreview from './ProjectPreview'
import styles from './Work.module.css'

const Work = () => {
  const { t } = useTranslation()
  const [showMore, setShowMore] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const stackStageRef = useRef<HTMLDivElement>(null)
  const moreRef = useReveal()

  useLayoutEffect(() => {
    let deckCleanup = () => {}
    let cancelled = false
    let frameId = 0

    const boot = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])
      if (cancelled) return

      gsap.registerPlugin(ScrollTrigger)

      frameId = requestAnimationFrame(() => {
        const pinRoot = pinRef.current
        const stage = stackStageRef.current
        const section = sectionRef.current
        if (!pinRoot || !stage || !section) return

        if (headerRef.current) {
          gsap.set(headerRef.current, { opacity: 1, y: 0 })
        }

        deckCleanup = initWorkDeck({
          gsap,
          ScrollTrigger,
          pinRoot,
          stage,
          section,
          readyClass: styles.workDeckReady,
          edgeShadowClass: styles.workDeckEdgeShadow,
          dimmerClass: styles.workDeckDimmer,
        })
      })
    }

    void boot()

    return () => {
      cancelled = true
      cancelAnimationFrame(frameId)
      deckCleanup()
    }
  }, [])

  useEffect(() => {
    if (!showMore) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setShowMore(false)
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [showMore])

  const openSite = (project: ProjectCaseStudy) => {
    const href = project.siteUrl?.startsWith('http') ? project.siteUrl : project.siteUrl ? `https://${project.siteUrl}` : undefined
    if (href) window.open(href, '_blank', 'noopener,noreferrer')
  }

  const scrollToContact = () => {
    setShowMore(false)
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  const moreTags = t('work.morePanel.tags', { returnObjects: true }) as string[]

  return (
    <section className={styles.work} id="work" ref={sectionRef} data-motion-section>
      <div className={styles.workInner}>
        <div className={styles.workPinZone} ref={pinRef}>
          <div className={styles.workPinContent}>
          <div className={`${styles.workHeader} frame-corners`} ref={headerRef}>
            <span className="frame-corner frame-corner--tl" aria-hidden="true" />
            <span className="frame-corner frame-corner--tr" aria-hidden="true" />
            <span className="frame-corner frame-corner--bl" aria-hidden="true" />
            <span className="frame-corner frame-corner--br" aria-hidden="true" />
            <div>
              <span className="section-kicker">{t('work.kicker')}</span>
              <h2 className="section-title section-title--detailed" style={{ textAlign: 'left' }}>
                {t('work.title')}
              </h2>
              <p className="section-subtitle" style={{ textAlign: 'left', marginTop: '12px' }}>
                {t('work.subtitle')}
              </p>
            </div>
          </div>

          <div className={styles.workStackWrap} data-work-deck>
            <div className={styles.workStackStage} ref={stackStageRef}>
              {projects.map((project, index) => (
                <article
                  key={project.id}
                  data-deck-card
                  data-deck-index={index}
                  data-deck-active={index === 0 ? 'true' : 'false'}
                  style={{ zIndex: projects.length - index }}
                  className={[
                    styles.workDeckCard,
                    styles[`workDeckCard${project.accent[0].toUpperCase()}${project.accent.slice(1)}`],
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <div className={styles.workDeckEdgeShadow} aria-hidden="true" />
                  <div className={styles.workDeckDimmer} aria-hidden="true" />

                  <ProjectPreview project={project} />

                  <div className={styles.workDeckBar}>
                    <div className={styles.workDeckMeta}>
                      <span className={styles.workDeckTag}>{project.badge}</span>
                      <h3 className={styles.workDeckTitle}>{project.title}</h3>
                      <p className={styles.workDeckDesc}>{project.description}</p>
                    </div>
                    <div className={styles.workDeckActions}>
                      <button
                        type="button"
                        className={`${styles.workDeckCta} interactive-btn`}
                        onClick={() => openSite(project)}
                      >
                        {project.siteUrl ? t('work.visit') : t('work.cta')}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
              <div className={styles.workStackBottomSoft} aria-hidden="true" />
            </div>
          </div>
          </div>
        </div>

        <div className="reveal" ref={moreRef}>
          <div className={styles.workMoreWrap}>
            <button
              type="button"
              className={`${styles.workMoreBtn} interactive-btn`}
              onClick={() => setShowMore(true)}
              aria-expanded={showMore}
            >
              {t('work.more')}
            </button>
          </div>
        </div>
      </div>

      {showMore
        ? createPortal(
            <div className={styles.workMoreOverlay} onClick={() => setShowMore(false)} role="presentation">
              <div
                className={styles.workMorePanel}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="work-more-title"
              >
                <button
                  type="button"
                  className={styles.workMoreClose}
                  onClick={() => setShowMore(false)}
                  aria-label={t('work.morePanel.close')}
                >
                  ✕
                </button>
                <span className={styles.workMoreKicker}>✦ {t('work.morePanel.kicker')}</span>
                <h3 className={styles.workMoreTitle} id="work-more-title">
                  {t('work.morePanel.title')}
                </h3>
                <p className={styles.workMoreText}>{t('work.morePanel.text')}</p>
                <div className={styles.workMoreTags}>
                  {moreTags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <button type="button" className={`${styles.workMoreCta} interactive-btn`} onClick={scrollToContact}>
                  {t('work.morePanel.cta')}
                </button>
              </div>
            </div>,
            document.body,
          )
        : null}
    </section>
  )
}

export default Work
