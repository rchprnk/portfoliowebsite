import { useTranslation } from 'react-i18next'
import styles from './Footer.module.css'

const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerBrand}>
          <span className={styles.footerLogo}>Nexriv</span>
          <p className={styles.footerLead}>{t('footer.copy')}</p>
        </div>

        <div className={styles.footerMetaGrid}>
          <div className={styles.footerMetaCard}>
            <span>{t('footer.meta1Label')}</span>
            <strong>{t('footer.meta1Value')}</strong>
          </div>
          <div className={styles.footerMetaCard}>
            <span>{t('footer.meta2Label')}</span>
            <strong>{t('footer.meta2Value')}</strong>
          </div>
          <div className={styles.footerMetaCard}>
            <span>{t('footer.meta3Label')}</span>
            <strong>{t('footer.meta3Value')}</strong>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
