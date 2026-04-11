const techs = [
  'React',
  'Node.js',
  'PostgreSQL',
  'TypeScript',
  'Docker',
  'Next.js',
  'Prisma',
  'AWS',
]

const TechStack = () => {
  return (
    <section className="techstack">
      <div className="techstack__inner">
        <span className="techstack__label">TECH STACK</span>
        <div className="techstack__list">
          {techs.map((tech) => (
            <div key={tech} className="techstack__item">
              {tech}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechStack