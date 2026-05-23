import heroImage from '../assets/hero.png'

export type ProjectImageProps = {
  src: string
  alt: string
}

export type ProjectCardAccent = 'violet' | 'ink' | 'gold'

export type ProjectCaseStudy = {
  id: string
  title: string
  badge: string
  /** Short line on the card */
  description: string
  /** Live site — shown in the card iframe when set */
  siteUrl?: string
  /** Fallback when iframe is blocked or no URL */
  imageProps: ProjectImageProps
  url: string
  accent: ProjectCardAccent
  techStack: string[]
  /** Optional detail for the modal */
  problem?: string
  solution?: string
  outcome?: string
}

export const projects: ProjectCaseStudy[] = [
  {
    id: 'ngo-platform',
    title: "Children's NGO Website",
    badge: 'Featured Launch',
    description: 'Trust-first NGO presence with a calm donation path and bilingual editorial flow.',
    siteUrl: 'https://yadroznan.com.ua',
    imageProps: {
      src: heroImage,
      alt: "Children's NGO Website preview",
    },
    techStack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL'],
    url: 'yadroznan.com.ua',
    accent: 'violet',
    problem: 'The brand had heart, but no polished online credibility.',
    solution:
      'We turned the story into a bilingual editorial experience with a clearer donation path and stronger hierarchy.',
    outcome: 'A more credible first impression for donors, volunteers, and partners.',
  },
{
    id: 'commerce-rebuild',
    title: 'Leather Restoration Platform',
    badge: 'Premium Service System',
    description: 'A high-end digital experience for a professional leather repair service, focusing on visual excellence, trust, and seamless photo-based quote requests.',
    siteUrl: 'https://primeleatherrepair.com/',
    imageProps: {
      src: heroImage,
      alt: 'Prime Leather Repair desktop preview',
    },
    techStack: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    url: 'primeleatherrepair.com',
    accent: 'ink',
    problem: 'The original brand lacked a premium feel, failing to convey the meticulous detail and high value of luxury leather restoration, which led to low conversion rates from cold traffic.',
    solution: 'We built a minimalist, sophisticated interface featuring rich visual storytelling, structured product/service hierarchy, and an intuitive "Send Photo for Free Quote" conversion funnel.',
    outcome: 'A sharp, high-converting brand presentation that positions the business as an elite service, drastically lowering friction for users looking to restore premium bags and wallets.',
  },
  {
    id: 'sales-bot',
    title: 'Telegram Sales Bot',
    badge: 'Automation Layer',
    description: 'Structured Telegram flows with faster first response and cleaner lead routing.',
    imageProps: {
      src: heroImage,
      alt: 'Telegram Sales Bot preview',
    },
    techStack: ['Node.js', 'Telegraf', 'PostgreSQL'],
    url: 't.me/salesbot',
    accent: 'gold',
    problem: 'Too many manual touchpoints in the first conversation.',
    solution: 'We built automation with payment hooks and operational handoff logic.',
    outcome: 'Faster response and a more reliable sales flow from day one.',
  },
]
