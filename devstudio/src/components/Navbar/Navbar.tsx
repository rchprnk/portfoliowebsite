import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './Navbar.module.css'

const LANGS = [
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'ua', label: 'UA', flag: '🇺🇦' },
  { code: 'pl', label: 'PL', flag: '🇵🇱' },
]

const DARK_SECTION_IDS = ['work', 'services', 'process']

const Navbar = () => {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [visible, setVisible] = useState(true)
  const [compact, setCompact] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const rafRef = useRef(0)
  const visibleRef = useRef(true)
  const themeRef = useRef<'light' | 'dark'>('light')
  const compactRef = useRef(false)
  const layoutRef = useRef({ fullW: 1100, minW: 300, isMobile: false })
  const metricsRef = useRef({
    pricingTop: 0,
    shrinkStart: 150,
    shrinkEnd: 1,
    darkRanges: [] as Array<{ top: number; bottom: number }>,
  })
  const { i18n } = useTranslation()

  useEffect(() => {
    const timer = window.setTimeout(() => setMounted(true), 100)

    const refreshLayout = () => {
      const viewportW = window.innerWidth
      layoutRef.current = {
        fullW: Math.min(viewportW - (viewportW <= 768 ? 32 : 80), 1100),
        minW: 300,
        isMobile: viewportW <= 768,
      }
    }

    const refreshMetrics = () => {
      const scrollY = window.scrollY
      refreshLayout()
      const pricingEl = document.getElementById('pricing')
      const pricingTop = pricingEl
        ? pricingEl.getBoundingClientRect().top + scrollY
        : scrollY + window.innerHeight * 2

      metricsRef.current = {
        pricingTop,
        shrinkStart: 150,
        shrinkEnd: pricingTop - window.innerHeight * 0.4,
        darkRanges: DARK_SECTION_IDS.map((id) => {
          const el = document.getElementById(id)
          if (!el) return { top: 0, bottom: 0 }
          const top = el.offsetTop
          return { top, bottom: top + el.offsetHeight }
        }),
      }
    }

    const applyShrink = (target: number) => {
      const nav = navRef.current
      if (!nav) return

      const { fullW, minW, isMobile } = layoutRef.current
      nav.style.setProperty('--nav-shrink', target.toFixed(4))

      if (!isMobile) {
        const width = fullW - (fullW - minW) * target
        nav.style.width = `${width}px`
      } else {
        nav.style.removeProperty('width')
      }

      const isCompact = target >= 0.8
      if (compactRef.current !== isCompact) {
        compactRef.current = isCompact
        setCompact(isCompact)
      }
    }

    const updateNav = () => {
      rafRef.current = 0
      const scrollY = window.scrollY
      const { pricingTop, shrinkStart, shrinkEnd, darkRanges } = metricsRef.current

      const nextVisible = scrollY <= pricingTop - 100
      if (visibleRef.current !== nextVisible) {
        visibleRef.current = nextVisible
        setVisible(nextVisible)
      }

      let target = 0
      if (scrollY <= shrinkStart) {
        target = 0
      } else if (scrollY >= shrinkEnd) {
        target = 1
      } else {
        target = (scrollY - shrinkStart) / (shrinkEnd - shrinkStart)
      }

      applyShrink(target)

      const probeY = scrollY + 100
      let newTheme: 'light' | 'dark' = 'light'
      for (const range of darkRanges) {
        if (probeY >= range.top && probeY <= range.bottom) {
          newTheme = 'dark'
          break
        }
      }

      if (themeRef.current !== newTheme) {
        themeRef.current = newTheme
        setTheme(newTheme)
      }
    }

    const handleScroll = () => {
      if (rafRef.current) return
      rafRef.current = window.requestAnimationFrame(updateNav)
    }

    refreshMetrics()
    updateNav()

    window.addEventListener('scroll', handleScroll, { passive: true })
    const handleResize = () => {
      refreshMetrics()
      handleScroll()
    }

    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const changeLang = (code: string) => i18n.changeLanguage(code)
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const isVisible = mounted && visible
  const navClassName = [
    styles.navbar,
    theme === 'light' ? styles.navbarLight : styles.navbarDark,
    mounted ? styles.navbarReady : '',
    isVisible ? styles.navbarVisible : styles.navbarHidden,
    compact ? styles.navbarCompact : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <nav
      ref={navRef}
      className={navClassName}
      style={{ pointerEvents: isVisible ? 'all' : 'none' }}
    >
      <div className={styles.navbarInner}>
        <span
          className={styles.navbarLogo}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }}
        >
          Nexriv
        </span>

        <div className={styles.langSwitcher}>
          {LANGS.map((lang) => (
            <button
              key={lang.code}
              className={[
                styles.langBtn,
                'interactive-btn',
                i18n.language === lang.code ? styles.langBtnActive : '',
              ].join(' ')}
              onClick={() => changeLang(lang.code)}
              aria-label={`Switch language to ${lang.label}`}
            >
              <span className={styles.langBtnFlag}>{lang.flag}</span>
              <span className={styles.langBtnLabel}>{lang.label}</span>
            </button>
          ))}
        </div>

        <button
          className={`${styles.navbarCta} ${styles.navbarCtaDesktop} interactive-btn`}
          onClick={() => scrollTo('contact')}
          aria-label="Contact Nexriv"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="14" height="14" fill="currentColor">
            <path d="M224.2 89C216.3 70.1 195.7 60.1 176.1 65.4L170.6 66.9C106 84.5 50.8 147.1 66.9 223.3C104 398.3 241.7 536 416.7 573.1C493 589.3 555.5 534 573.1 469.4L574.6 463.9C580 444.2 569.9 423.6 551.1 415.8L453.8 375.3C437.3 368.4 418.2 373.2 406.8 387.1L368.2 434.3C297.9 399.4 241.3 341 208.8 269.3L253 233.3C266.9 222 271.6 202.9 264.8 186.3L224.2 89z" />
          </svg>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
