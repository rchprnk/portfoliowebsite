import { useId, useLayoutEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useReveal } from '../../hooks/useReveal'
import styles from './Contact.module.css'

const StarIcon = () => (
  <StarGlyph />
)

const StarGlyph = () => {
  const id = useId().replace(/:/g, '')
  const sg1 = `sg1-${id}`
  const sg2 = `sg2-${id}`
  const sg3 = `sg3-${id}`

  return (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill="none">
    <line x1="100" y1="0" x2="100" y2="200" stroke={`url(#${sg1})`} strokeWidth="22" strokeLinecap="round" />
    <line x1="0" y1="100" x2="200" y2="100" stroke={`url(#${sg1})`} strokeWidth="22" strokeLinecap="round" />
    <line x1="20" y1="20" x2="180" y2="180" stroke={`url(#${sg2})`} strokeWidth="14" strokeLinecap="round" />
    <line x1="180" y1="20" x2="20" y2="180" stroke={`url(#${sg2})`} strokeWidth="14" strokeLinecap="round" />
    <line x1="100" y1="10" x2="145" y2="55" stroke={`url(#${sg3})`} strokeWidth="8" strokeLinecap="round" />
    <line x1="100" y1="10" x2="55" y2="55" stroke={`url(#${sg3})`} strokeWidth="8" strokeLinecap="round" />
    <line x1="190" y1="100" x2="145" y2="55" stroke={`url(#${sg3})`} strokeWidth="8" strokeLinecap="round" />
    <line x1="190" y1="100" x2="145" y2="145" stroke={`url(#${sg3})`} strokeWidth="8" strokeLinecap="round" />
    <line x1="100" y1="190" x2="145" y2="145" stroke={`url(#${sg3})`} strokeWidth="8" strokeLinecap="round" />
    <line x1="100" y1="190" x2="55" y2="145" stroke={`url(#${sg3})`} strokeWidth="8" strokeLinecap="round" />
    <line x1="10" y1="100" x2="55" y2="145" stroke={`url(#${sg3})`} strokeWidth="8" strokeLinecap="round" />
    <line x1="10" y1="100" x2="55" y2="55" stroke={`url(#${sg3})`} strokeWidth="8" strokeLinecap="round" />
    <circle cx="100" cy="100" r="12" fill={`url(#${sg1})`} />
    <defs>
      <linearGradient id={sg1} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#c8dff2" />
        <stop offset="40%" stopColor="#8ab0d0" />
        <stop offset="100%" stopColor="#2a4a6e" />
      </linearGradient>
      <linearGradient id={sg2} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#9abdd8" />
        <stop offset="100%" stopColor="#1e3a5f" />
      </linearGradient>
      <linearGradient id={sg3} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#7aa0c0" />
        <stop offset="100%" stopColor="#1a3050" />
      </linearGradient>
    </defs>
  </svg>
  )
}

const Contact = () => {
  const { t } = useTranslation()
  const revealRef = useReveal()
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const kickerRef = useRef<HTMLSpanElement>(null)
  const titleLineRef = useRef<HTMLSpanElement>(null)
  const titleItalicRef = useRef<HTMLSpanElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const pointsRef = useRef<HTMLDivElement>(null)
  const buttonRefs = useRef<HTMLAnchorElement[]>([])
  const contactActionsRef = useRef<HTMLDivElement>(null)
  const points = t('contact.points', { returnObjects: true }) as string[]

  useLayoutEffect(() => {
    const section = sectionRef.current
    const card = cardRef.current
    if (!section || !card) return
    let cleanup = () => {}
    let cancelled = false

    const init = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])
      if (cancelled) return

      gsap.registerPlugin(ScrollTrigger)
      const ctx = gsap.context(() => {
      const revealTargets = [
        kickerRef.current,
        titleLineRef.current,
        titleItalicRef.current,
        subtitleRef.current,
        ...(pointsRef.current ? Array.from(pointsRef.current.children) : []),
      ].filter(Boolean)

      gsap.set(revealTargets, { y: 36, opacity: 0 })

      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
          fastScrollEnd: true,
        },
      })
        .to(kickerRef.current, { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' })
        .to(
          [titleLineRef.current, titleItalicRef.current],
          { y: 0, opacity: 1, duration: 0.85, stagger: 0.14, ease: 'power3.out' },
          '-=0.35'
        )
        .to(subtitleRef.current, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.45')
        .to(
          pointsRef.current?.children ? Array.from(pointsRef.current.children) : [],
          { y: 0, opacity: 1, duration: 0.55, stagger: 0.08, ease: 'power3.out' },
          '-=0.4'
        )
    }, section)
      cleanup = () => ctx.revert()
    }

    void init()

    return () => {
      cancelled = true
      cleanup()
    }
  }, [])

  useLayoutEffect(() => {
    const zone = contactActionsRef.current
    const buttons = buttonRefs.current.filter(Boolean)
    if (!zone || buttons.length < 2) return
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    type MagnetValues = {
      x: number
      y: number
      sx: number
      sy: number
      ix: number
      iy: number
    }

    const zero: MagnetValues = { x: 0, y: 0, sx: 1, sy: 1, ix: 0, iy: 0 }
    const current = new Map<HTMLElement, MagnetValues>()
    const target = new Map<HTMLElement, MagnetValues>()
    const inners = new Map<HTMLElement, HTMLElement | null>()

    buttons.forEach((button) => {
      current.set(button, { ...zero })
      target.set(button, { ...zero })
      inners.set(button, button.querySelector<HTMLElement>(`.${styles.contactBtnInner}`))
    })

    let frameId = 0
    let insideZone = false
    let pendingX = 0
    let pendingY = 0
    let activeButton: HTMLElement | null = null

    const applyVars = (button: HTMLElement, values: MagnetValues) => {
      button.style.setProperty('--magnet-x', `${values.x.toFixed(2)}px`)
      button.style.setProperty('--magnet-y', `${values.y.toFixed(2)}px`)
      button.style.setProperty('--magnet-sx', values.sx.toFixed(3))
      button.style.setProperty('--magnet-sy', values.sy.toFixed(3))

      const inner = inners.get(button)
      if (inner) {
        inner.style.setProperty('--magnet-inner-x', `${values.ix.toFixed(2)}px`)
        inner.style.setProperty('--magnet-inner-y', `${values.iy.toFixed(2)}px`)
      }
    }

    const setTargetForButton = (button: HTMLElement, x: number, y: number) => {
      const rect = button.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const dx = x - centerX
      const dy = y - centerY
      const distance = Math.hypot(dx, dy)
      const reach = Math.max(rect.width, rect.height) / 2 + 48

      if (distance >= reach) {
        target.set(button, { ...zero })
        return
      }

      const strength = 1 - distance / reach
      target.set(button, {
        x: (dx / reach) * 18 * strength,
        y: (dy / reach) * 18 * strength,
        sx: 1 + strength * 0.08,
        sy: 1 - strength * 0.045,
        ix: (dx / reach) * 11 * strength,
        iy: (dy / reach) * 11 * strength,
      })
    }

    const pickButton = (x: number, y: number) => {
      for (const button of buttons) {
        const rect = button.getBoundingClientRect()
        if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
          return button
        }
      }
      return null
    }

    const updateTargets = () => {
      const hovered = pickButton(pendingX, pendingY)
      activeButton = hovered

      buttons.forEach((button) => {
        if (button === hovered) {
          setTargetForButton(button, pendingX, pendingY)
        } else {
          target.set(button, { ...zero })
        }
      })
    }

    const isSettled = () =>
      buttons.every((button) => {
        const cur = current.get(button)!
        const tar = target.get(button)!
        return (
          Math.abs(cur.x - tar.x) < 0.08 &&
          Math.abs(cur.y - tar.y) < 0.08 &&
          Math.abs(cur.sx - tar.sx) < 0.002 &&
          Math.abs(cur.sy - tar.sy) < 0.002
        )
      })

    const tick = () => {
      frameId = 0
      const lerp = activeButton ? 0.14 : 0.09

      buttons.forEach((button) => {
        const cur = current.get(button)!
        const tar = target.get(button)!
        cur.x += (tar.x - cur.x) * lerp
        cur.y += (tar.y - cur.y) * lerp
        cur.sx += (tar.sx - cur.sx) * lerp
        cur.sy += (tar.sy - cur.sy) * lerp
        cur.ix += (tar.ix - cur.ix) * lerp
        cur.iy += (tar.iy - cur.iy) * lerp
        applyVars(button, cur)
      })

      if (insideZone || !isSettled()) {
        frameId = window.requestAnimationFrame(tick)
      }
    }

    const queueTick = () => {
      if (frameId) return
      frameId = window.requestAnimationFrame(tick)
    }

    const onPointerMove = (event: PointerEvent) => {
      pendingX = event.clientX
      pendingY = event.clientY
      updateTargets()
      queueTick()
    }

    const onPointerEnter = () => {
      insideZone = true
      zone.addEventListener('pointermove', onPointerMove, { passive: true })
      updateTargets()
      queueTick()
    }

    const onPointerLeave = () => {
      insideZone = false
      zone.removeEventListener('pointermove', onPointerMove)
      activeButton = null
      buttons.forEach((button) => target.set(button, { ...zero }))
      queueTick()
    }

    zone.addEventListener('pointerenter', onPointerEnter, { passive: true })
    zone.addEventListener('pointerleave', onPointerLeave)

    return () => {
      zone.removeEventListener('pointerenter', onPointerEnter)
      zone.removeEventListener('pointerleave', onPointerLeave)
      zone.removeEventListener('pointermove', onPointerMove)
      if (frameId) window.cancelAnimationFrame(frameId)
      buttons.forEach((button) => applyVars(button, zero))
    }
  }, [])

  const setButtonRef = (el: HTMLAnchorElement | null, index: number) => {
    if (!el) return
    buttonRefs.current[index] = el
  }

  return (
    <section className={styles.contact} id="contact" ref={sectionRef} data-motion-section>
      <div className={styles.contactInner}>
        <div
          className={`${styles.contactCard} reveal`}
          ref={(el) => {
            cardRef.current = el
            revealRef.current = el
          }}
        >
          <div className={styles.contactNoise} />
          <div className={styles.contactLiquid} />
          <div className={styles.contactBlobA} />
          <div className={styles.contactBlobB} />
          <div className={styles.contactGrid} />
          <div
            className={[
              styles.contactStar,
              styles.contactStarTl,
            ].join(' ')}
          >
            <StarIcon />
          </div>
          <div
            className={[
              styles.contactStar,
              styles.contactStarTr,
            ].join(' ')}
          >
            <StarIcon />
          </div>
          <div
            className={[
              styles.contactStar,
              styles.contactStarBr,
            ].join(' ')}
          >
            <StarIcon />
          </div>

          <div
            className={[
              styles.contactCardGlow,
            ].join(' ')}
          >
            <span className={styles.contactCardGlowViolet} />
            <span className={styles.contactCardGlowBlue} />
          </div>

          <div className={styles.contactContent}>
            <div className={styles.contactLead}>
              <span className="section-kicker" ref={kickerRef}>
                {t('contact.kicker')}
              </span>
              <h2 className={styles.contactTitle}>
                <span className={styles.contactTitleLine} ref={titleLineRef}>
                  {t('contact.title_line1')}
                </span>
                <span className={`${styles.contactTitleItalic} ${styles.contactTitleLine}`} ref={titleItalicRef}>
                  {t('contact.title_line2')}
                </span>
              </h2>

              <p className={styles.contactSubtitle} ref={subtitleRef}>
                {t('contact.subtitle')}
              </p>

              <div className={styles.contactPoints} ref={pointsRef}>
                {points.map((point) => (
                  <span key={point} className={styles.contactPoint}>
                    {point}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.contactPanel}>
              <div className={styles.contactPanelHud}>
                <span>{t('contact.hudLabel')}</span>
                <strong>{t('contact.hudValue')}</strong>
                <p>{t('contact.hudText')}</p>
              </div>

              <div className={styles.contactActions} ref={contactActionsRef}>
                <a
                  href="https://t.me/nexrivspace"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.contactBtn} ${styles.contactBtnLight}`}
                  ref={(el) => setButtonRef(el, 0)}
                >
                  <span className={styles.contactBtnInner}>
                    <span>✈</span> {t('contact.telegram')}
                  </span>
                </a>

                <a
                  href="mailto:nexrivtech@gmail.com"
                  className={`${styles.contactBtn} ${styles.contactBtnDark}`}
                  ref={(el) => setButtonRef(el, 1)}
                >
                  <span className={styles.contactBtnInner}>
                    <span>📧</span> {t('contact.email')}
                  </span>
                </a>
              </div>

              <div className={styles.contactSocial}>
                <span className={styles.contactSocialLabel}>{t('contact.socialLabel')}</span>
                <div className={styles.contactSocialLinks}>
                  <a
                    href="https://www.instagram.com/nexriv_studio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.contactSocialLink}
                  >
                    {t('contact.instagram')}
                  </a>
                  <a
                    href="https://www.facebook.com/share/1LTByFCuwo/?mibextid=wwXIfr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.contactSocialLink}
                  >
                    {t('contact.facebook')}
                  </a>
                </div>
              </div>

              <div className={styles.contactMeta}>
                <div>
                  <strong>{t('contact.meta1Value')}</strong>
                  <span>{t('contact.meta1Label')}</span>
                </div>
                <div>
                  <strong>{t('contact.meta2Value')}</strong>
                  <span>{t('contact.meta2Label')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
