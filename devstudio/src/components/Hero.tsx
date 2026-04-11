import { useTranslation } from 'react-i18next'
import { useReveal } from '../hooks/useReveal'

const Hero = () => {
  const { t } = useTranslation()
  const refBadge = useReveal()
  const refTitle = useReveal()
  const refSub = useReveal()
  const refBtns = useReveal()

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero">
      <div className="hero__grid" />
      <div className="hero__content">
        <div className="hero__badge reveal" ref={refBadge}>
          <span className="hero__badge-icon">✦</span>
          {t('hero.badge')}
        </div>
        <h1 className="hero__title reveal reveal-delay-1" ref={refTitle}>
          {t('hero.title1')}
          <span className="hero__title--gradient"> {t('hero.title2')}</span>
        </h1>
        <p className="hero__subtitle reveal reveal-delay-2" ref={refSub}>
          {t('hero.subtitle')}
        </p>
        <div className="hero__actions reveal reveal-delay-3" ref={refBtns}>
          <button className="btn btn--primary btn--large" onClick={() => scrollTo('contact')}>
            {t('hero.cta1')}
          </button>
          <button className="btn btn--outline btn--large" onClick={() => scrollTo('pricing')}>
            {t('hero.cta2')}
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero