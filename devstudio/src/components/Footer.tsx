import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation()
  return (
    <footer className="footer">
      <div className="footer__inner">
        <span className="footer__logo">DevStudio</span>
        <span className="footer__copy">{t('footer.copy')}</span>
      </div>
    </footer>
  )
}

export default Footer