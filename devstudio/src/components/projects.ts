export type Project = {
  title: string
  tag: string
  description: string
  techs: string[]
  url: string
  previewBg: string
  previewContent: string
}

export const projects: Project[] = [
  {
    title: "Children's NGO Website",
    tag: 'Full Website',
    description: "Bilingual website for a Ukrainian children's charitable foundation.",
    techs: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL'],
    url: 'yadro.org',
    previewBg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    previewContent: '🌍',
  },
  {
    title: 'E-commerce Store',
    tag: 'Full Website',
    description: 'Modern online shop with cart and Stripe payment integration.',
    techs: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    url: 'shopname.com',
    previewBg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    previewContent: '🛍️',
  },
  {
    title: 'Telegram Sales Bot',
    tag: 'Telegram Bot',
    description: 'Automated sales bot with order processing and LiqPay payments.',
    techs: ['Node.js', 'Telegraf', 'PostgreSQL'],
    url: 't.me/salesbot',
    previewBg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    previewContent: '🤖',
  },

]

// Готові градієнти для нових проектів:
// 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'  зелений
// 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'  помаранчевий
// 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)'  лавандовий
// 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)'  жовтий
// 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'  темний