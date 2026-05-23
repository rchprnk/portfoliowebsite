import type { gsap as GsapType } from 'gsap'
import type { ScrollTrigger as STType } from 'gsap/ScrollTrigger'

type InitWorkDeckOptions = {
  gsap: typeof GsapType
  ScrollTrigger: typeof STType
  pinRoot: HTMLElement
  stage: HTMLElement
  section: HTMLElement
  readyClass: string
  edgeShadowClass: string
  dimmerClass: string
}

export const initWorkDeck = ({
  gsap,
  ScrollTrigger,
  pinRoot,
  stage,
  section,
  readyClass,
  dimmerClass,
}: InitWorkDeckOptions) => {
  const cards = Array.from(stage.querySelectorAll<HTMLElement>('[data-deck-card]'))
  if (cards.length < 2) return () => {}

  stage.classList.add(readyClass)

  const dimmers = cards
    .map((card) => card.querySelector<HTMLElement>(`.${dimmerClass}`))
    .filter((el): el is HTMLElement => Boolean(el))

  const deckCount = cards.length
  const isMobile = window.matchMedia('(max-width: 767px)').matches
  // більше скролу на картку = більше часу для плавної анімації
  const scrollPerStep = window.innerHeight * (isMobile ? 0.85 : 1.0)

  const getPinStartOffset = () => {
    const nav = isMobile ? 64 : 80
    const pinHeight = pinRoot.offsetHeight
    if (!pinHeight) return nav
    const centered = (window.innerHeight - pinHeight) / 2
    return Math.round(Math.max(nav, centered * 0.42))
  }

  const setDeckZ = (activeIndex: number) => {
    cards.forEach((card, cardIndex) => {
      const isActive = cardIndex === activeIndex
      card.style.zIndex = String(isActive ? deckCount + 2 : deckCount - cardIndex)
      card.dataset.deckActive = isActive ? 'true' : 'false'
    })
  }

  const ctx = gsap.context(() => {
    // початковий стан
    gsap.set(cards, { transformOrigin: '50% 50%', force3D: true })
    gsap.set(cards[0], { yPercent: 0, scale: 1, opacity: 1 })
    gsap.set(cards.slice(1), { yPercent: 100, scale: 1, opacity: 1 })
    gsap.set(dimmers, { opacity: 0 })
    setDeckZ(0)

    const deckTimeline = gsap.timeline({
      defaults: { ease: 'power2.inOut', force3D: true },
      scrollTrigger: {
        trigger: pinRoot,
        start: () => `top top+=${getPinStartOffset()}`,
        // кожна картка отримує свій scrollPerStep
        end: () => `+=${(deckCount - 1) * scrollPerStep}`,
        pin: pinRoot,
        scrub: 2.2,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const progress = self.progress
          if (progress <= 0.001) {
            setDeckZ(0)
            return
          }
          const segment = 1 / (deckCount - 1)
          const active = Math.min(
            deckCount - 1,
            Math.max(0, Math.ceil(progress / segment - 0.0001))
          )
          setDeckZ(active)
        },
      },
    })

    // анімація для кожного переходу між картками
    // працює динамічно — не треба нічого міняти при додаванні нових проектів
    cards.slice(1).forEach((card, index) => {
      const previousCard = cards[index]
      const previousDimmer = previousCard.querySelector<HTMLElement>(`.${dimmerClass}`)

      // стара картка: зникає і стискається — стартує одразу
      deckTimeline.to(
        previousCard,
        {
          scale: 0.91,
          opacity: 0,
          duration: 0.55,
          ease: 'power2.in',
        },
        index
      )

      // dimmer на стару картку поки вона іде
      if (previousDimmer) {
        deckTimeline.to(
          previousDimmer,
          { opacity: 1, duration: 0.4, ease: 'power1.in' },
          index
        )
      }

      // нова картка: виїжджає знизу з невеликою затримкою після того як стара почала зникати
      deckTimeline.to(
        card,
        {
          yPercent: 0,
          scale: 1,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
        },
        index + 0.28
      )
    })

    requestAnimationFrame(() => ScrollTrigger.refresh())
  }, section)

  return () => {
    stage.classList.remove(readyClass)
    ctx.revert()
  }
}