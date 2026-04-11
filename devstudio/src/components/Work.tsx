import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { projects } from './projects'

const Work = () => {
  const { t, i18n } = useTranslation()
  const [showModal, setShowModal] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const btnRef = useRef<HTMLDivElement>(null)

  const lang = i18n.language as 'en' | 'ua' | 'pl'

  useEffect(() => {
    const els = [
      { el: headerRef.current, delay: 0 },
      ...cardRefs.current.map((el, i) => ({ el, delay: 150 + i * 150 })),
      { el: btnRef.current, delay: 150 + projects.length * 150 },
    ]

    const observers: IntersectionObserver[] = []

    els.forEach(({ el, delay }) => {
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => el.classList.add('revealed'), delay)
            obs.disconnect()
          }
        },
        { threshold: 0.1 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <section className="work" id="work">
      <div className="work__inner">

        <div className="work__header reveal" ref={headerRef}>
          <div>
            <h2 className="section-title" style={{ textAlign: 'left' }}>
              {t('work.title')}
            </h2>
            <p className="section-subtitle" style={{ textAlign: 'left', marginTop: '8px' }}>
              {t('work.subtitle')}
            </p>
          </div>
        </div>

        <div className="work__grid">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="work-card reveal"
              ref={(el) => { cardRefs.current[index] = el }}
            >
              <div className="work-card__browser">
                <div className="work-card__browser-bar">
                  <div className="work-card__dots">
                    <span className="dot dot--red" />
                    <span className="dot dot--yellow" />
                    <span className="dot dot--green" />
                  </div>
                  <div className="work-card__url">{project.url}</div>
                </div>
                <div
                  className="work-card__preview"
                  style={{ background: project.previewBg }}
                >
                  <span className="work-card__preview-emoji">
                    {project.previewContent}
                  </span>
                </div>
              </div>

              <div className="work-card__info">
                <span className="work-card__tag">{project.tag}</span>
                <h3 className="work-card__title">{project.title}</h3>
                <p className="work-card__desc">
                  {project.description[lang] || project.description['en']}
                </p>
                <div className="work-card__techs">
                  {project.techs.map((tech) => (
                    <span key={tech} className="work-card__tech">{tech}</span>
                  ))}
                </div>
                <a href="#" className="work-card__link">
                  {t('work.cta')}
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="work__more-wrap reveal" ref={btnRef}>
          <button className="work__more-btn" onClick={() => setShowModal(true)}>
            {t('work.more')}
          </button>
        </div>
      </div>

      {showModal && (
        <div className="work-modal" onClick={() => setShowModal(false)}>
          <div className="work-modal__card" onClick={(e) => e.stopPropagation()}>
            <button className="work-modal__close" onClick={() => setShowModal(false)}>✕</button>
            <div className="work-modal__emoji">🚀</div>
            <h3 className="work-modal__title">{t('work.modal.title')}</h3>
            <p className="work-modal__text">{t('work.modal.text')}</p>
            <div className="work-modal__tags">
              {(t('work.modal.tags', { returnObjects: true }) as string[]).map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            
              <a href="https://t.me/rchprnk"
              target="_blank"
              rel="noopener noreferrer"
              className="work-modal__cta"
            >
              {t('work.modal.cta')}
            </a>
          </div>
        </div>
      )}
    </section>
  )
}

export default Work