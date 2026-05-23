export type PricingTier = {
  title: string
  priceUsd: string
  popular: boolean
  description: string
  delivery?: string
}

export const pricingTiers: PricingTier[] = [
  {
    title: 'Landing Page',
    priceUsd: '$100',
    popular: false,
    description: 'Focused single-page structures, high-conversion flow.',
    delivery: '2-4 days',
  },
  {
    title: 'Full Website',
    priceUsd: '$180',
    popular: true,
    description: 'Multi-page architectures, custom CMS, advanced SEO, full analytics setup.',
    delivery: '7-10 days',
  },
  {
    title: 'Backend Systems',
    priceUsd: '$300',
    popular: false,
    description: 'Robust database logic, secure API pipelines, advanced application layers.',
  },
  {
    title: 'Telegram Bots',
    priceUsd: '$70',
    popular: false,
    description: 'Custom automation logic, sales funnels, clean integrations.',
  },
]
