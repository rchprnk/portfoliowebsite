import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

const LANGS = [
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'ua', label: 'UA', flag: '🇺🇦' },
  { code: 'pl', label: 'PL', flag: '🇵🇱' },
]

const Navbar = () => {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  // shrink: 0 = повний розмір, 1 = повністю стиснутий
  const [shrink, setShrink] = useState(0)
  const [visible, setVisible] = useState(true)
  const shrinkRef = useRef(0)
  const rafRef = useRef<number>(0)
  const lastScrollY = useRef(0)
  const { i18n } = useTranslation()

  useEffect(() => {
    setTimeout(() => setMounted(true), 100)
    lastScrollY.current = window.scrollY

const handleScroll = () => {
  const scrollY = window.scrollY
  lastScrollY.current = scrollY

  const pricingEl = document.getElementById('pricing')
  if (!pricingEl) return

  // Точка, де навбар має зникнути назавжди (верхня межа блоку прайс)
  const pricingTop = pricingEl.getBoundingClientRect().top + scrollY
  
  // ЛОГІКА ВИДИМОСТІ:
  // Якщо ми проскролили нижче, ніж початок прайсу (з невеликим запасом -100px)
  if (scrollY > pricingTop - 100) {
    setVisible(false) // Жорстко ховаємо: ні вгору, ні вниз не показуємо
  } else {
    // До прайсу залишаємо вашу логіку (наприклад, завжди видимий)
    setVisible(true) 
  }

  // ПРОГРЕС СТИСКАННЯ (працює тільки до прайсу)
  const startShrink = 150
  const endShrink = pricingTop - window.innerHeight * 0.4
  
  let target = 0
  if (scrollY <= startShrink) {
    target = 0
  } else if (scrollY >= endShrink) {
    target = 1
  } else {
    target = (scrollY - startShrink) / (endShrink - startShrink)
  }

      // Плавна анімація
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      const animate = () => {
        const curr = shrinkRef.current
        const diff = target - curr
        if (Math.abs(diff) < 0.002) {
          shrinkRef.current = target
          setShrink(target)
          return
        }
        shrinkRef.current = curr + diff * 0.1
        setShrink(shrinkRef.current)
        rafRef.current = requestAnimationFrame(animate)
      }
      rafRef.current = requestAnimationFrame(animate)

      // Теми
      const darkSections = ['work', 'services', 'process']
      let newTheme: 'light' | 'dark' = 'light'
      for (const id of darkSections) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            newTheme = 'dark'
            break
          }
        }
      }
      setTheme(newTheme)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const changeLang = (code: string) => i18n.changeLanguage(code)
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768
  const s = isMobile ? 0 : shrink // на мобілці не стискаємо

  const vw = typeof window !== 'undefined' ? window.innerWidth : 1200
  const fullW = Math.min(vw - (isMobile ? 32 : 80), 1100)
  const minW = 300
  const width = fullW - (fullW - minW) * s

  const opacity = {
    logo: Math.max(0, 1 - s * 0.8),      // зникає повільніше
    elements: Math.max(0, 1 - s * 0.8),  // зникає повільніше
  }

  const showLabels = s < 0.8
  const gap = Math.max(4, 12 - 8 * s)
  const px = Math.max(8, 14 - 6 * s)
  const py = Math.max(6, 10 - 4 * s)

  const isVisible = mounted && visible && (s < 0.99 || !visible)

  return (
    <nav
      className={['navbar', `navbar--${theme}`].join(' ')}
      style={{
        width: isMobile ? '' : `${width}px`,
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'all' : 'none',
        transform: `translateX(-50%) translateY(${isVisible ? 0 : -20}px)`,
        transition: 'opacity 0.5s ease, transform 0.5s ease, background 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease',
      }}
    >
      <div
        className="navbar__inner"
        style={{ padding: `${py}px ${px}px`, gap: `${gap}px` }}
      >
        {/* Лого */}
        <span
          className="navbar__logo"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            opacity: opacity.logo,
            fontSize: `${1.1 - 0.15 * s}rem`,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            maxWidth: opacity.logo < 0.05 ? '0' : '140px',
            transition: 'max-width 0.3s ease',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          {s < 0.8 ? 'DevStudio' : 'DS'}
        </span>

        {/* Lang switcher */}
        <div
          className="lang-switcher"
          style={{ opacity: opacity.elements }}
        >
          {LANGS.map((lang) => (
            <button
              key={lang.code}
              className={`lang-btn ${i18n.language === lang.code ? 'lang-btn--active' : ''}`}
              onClick={() => changeLang(lang.code)}
            >
              <span className="lang-btn__flag">{lang.flag}</span>
              {showLabels && (
                <span className="lang-btn__label">{lang.label}</span>
              )}
            </button>
          ))}
        </div>

        {/* CTA — тільки десктоп */}
        <button
          className="navbar__cta navbar__cta--desktop"
          onClick={() => scrollTo('contact')}
          style={{ opacity: opacity.elements }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="14" height="14" fill="currentColor">
            <path d="M224.2 89C216.3 70.1 195.7 60.1 176.1 65.4L170.6 66.9C106 84.5 50.8 147.1 66.9 223.3C104 398.3 241.7 536 416.7 573.1C493 589.3 555.5 534 573.1 469.4L574.6 463.9C580 444.2 569.9 423.6 551.1 415.8L453.8 375.3C437.3 368.4 418.2 373.2 406.8 387.1L368.2 434.3C297.9 399.4 241.3 341 208.8 269.3L253 233.3C266.9 222 271.6 202.9 264.8 186.3L224.2 89z"/>
          </svg>
        </button>
      </div>
    </nav>
  )
}

export default Navbar