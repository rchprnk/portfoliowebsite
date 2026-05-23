import type { ProjectCaseStudy } from '../../data/projects'
import styles from './Work.module.css'

type ProjectPreviewProps = {
  project: ProjectCaseStudy
}

const ProjectPreview = ({ project }: ProjectPreviewProps) => {
  const href = project.siteUrl?.startsWith('http') ? project.siteUrl : project.siteUrl ? `https://${project.siteUrl}` : undefined

  return (
    <div className={styles.workPreview}>
      <div className={styles.workPreviewChrome}>
        <span className={styles.workPreviewDots} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className={styles.workPreviewUrl}>{project.url}</span>
        {href ? (
          <a className={styles.workPreviewOpen} href={href} target="_blank" rel="noopener noreferrer">
            Open site ↗
          </a>
        ) : null}
      </div>

      <div className={styles.workPreviewViewport}>
        {href ? (
          <>
            <iframe
              className={styles.workPreviewFrame}
              src={href}
              title={`${project.title} live preview`}
              loading="lazy"
              tabIndex={-1}
              scrolling="no"
            />
            <div className={styles.workPreviewShield} aria-hidden="true" />
          </>
        ) : (
          <img
            src={project.imageProps.src}
            alt={project.imageProps.alt}
            className={styles.workPreviewImage}
            loading="lazy"
            decoding="async"
          />
        )}
        <div className={styles.workPreviewFade} aria-hidden="true" />
      </div>
    </div>
  )
}

export default ProjectPreview
