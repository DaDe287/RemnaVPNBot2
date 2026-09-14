import { useTranslation } from 'react-i18next'
import { ExternalLink } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'

export function ConnectionButtons({ link }: { link: string }) {
  const { t } = useTranslation()
  const incyLink = `https://bot.oberegvpn.org/incy?url=${encodeURIComponent(`incy://import/${link}`)}`
  const happLink = `https://bot.oberegvpn.org/happ?url=${encodeURIComponent(`happ://import/${link}`)}`

  return (
    <>
      <a
        href={incyLink}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonVariants({ variant: 'default' })}
      >
        <ExternalLink size={16} />
        {t('dashboard_connect_incy')}
      </a>
      <a
        href={happLink}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonVariants({ variant: 'secondary' })}
      >
        <ExternalLink size={16} />
        {t('dashboard_connect_happ')}
      </a>
    </>
  )
}
