import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const stepIcons = ['💡', '🎨', '⚙️', '🚀'];

const Process = () => {
  const { t } = useTranslation();
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  const steps = t('process.steps', { returnObjects: true }) as Array<{
    title: string;
    desc: string;
  }>;

  useEffect(() => {
    if (!Array.isArray(steps)) return;

    const observers: IntersectionObserver[] = [];

    stepsRef.current.forEach((el, index) => {
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            // Затримка для кожного кроку — зліва направо
            setTimeout(() => {
              el.classList.add('process__step--visible')

              // Іконка вилітає і зникає через 1.2s
              const icon = el.querySelector('.process__icon-pop') as HTMLElement
              if (icon) {
                icon.classList.add('process__icon--fly')
                setTimeout(() => {
                  icon.classList.remove('process__icon--fly')
                }, 2000)
              }
            }, index * 150)

            observer.disconnect()
          }
        },
        { threshold: 0.3 }
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [steps])

  if (!Array.isArray(steps)) return null;

  return (
    <section className="process" id="process">
      <div className="process__inner">
        <div className="section-header">
          <h2 className="section-title">{t('process.title')}</h2>
          <p className="section-subtitle">{t('process.subtitle')}</p>
        </div>

        <div className="process__steps">
          {steps.map((step, index) => (
            <div
              key={index}
              className="process__step"
              ref={(el) => { stepsRef.current[index] = el }}
            >
              {index < steps.length - 1 && <div className="process__connector" />}

              <div className="process__box-wrap">
                <div className="process__icon-pop">
                  {stepIcons[index]}
                </div>
                <div className="process__box">
                  <span className="process__number">0{index + 1}</span>
                </div>
              </div>

              <h3 className="process__title">{step.title}</h3>
              <p className="process__desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;