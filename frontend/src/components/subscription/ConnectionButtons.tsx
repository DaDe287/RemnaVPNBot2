import { useState } from 'react'
import { createPortal } from 'react-dom'
import { QRCodeSVG } from 'qrcode.react'
import { useTranslation } from 'react-i18next'
import { ExternalLink, QrCode, X } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'

export function ConnectionButtons({ link }: { link: string }) {
  const { t } = useTranslation()
  const [qrOpen, setQrOpen] = useState(false)
  const incyLink = `https://bot.oberegvpn.org/incy?url=${encodeURIComponent(`incy://import/${link}`)}`
  const happLink = `https://bot.oberegvpn.org/happ?url=${encodeURIComponent(`happ://add/${link}`)}`

  return (
    <>
      <div className="space-y-2">
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          <a
            href={incyLink}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: 'default', className: 'shrink-0' })}
          >
            <ExternalLink size={16} />
            {t('dashboard_connect_incy')}
          </a>
          <a
            href={happLink}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: 'outline', className: 'shrink-0' })}
          >
            <ExternalLink size={16} />
            {t('dashboard_connect_happ')}
          </a>
        </div>
        <Button variant="outline" className="shrink-0" onClick={() => setQrOpen(true)}>
          <QrCode size={16} />
          {t('dashboard_connect_qr')}
        </Button>
      </div>

      {qrOpen &&
        createPortal(
          <div className="fixed inset-0 z-[1000] flex items-center justify-center px-4">
            <div className="absolute inset-0 z-0 bg-black/50" onClick={() => setQrOpen(false)} />
            <div className="relative z-10 w-full max-w-sm rounded-2xl bg-[hsl(var(--card))] p-6 shadow-xl">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-base font-bold text-[hsl(var(--foreground))]">{t('dashboard_qr_title')}</h2>
                  <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">{t('dashboard_qr_desc')}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setQrOpen(false)}
                  className="shrink-0 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                  aria-label={t('dashboard_qr_close')}
                >
                  <X size={18} />
                </button>
              </div>
              <div className="mt-5 flex justify-center">
                <div className="rounded-xl border border-[hsl(var(--border))] bg-white p-4">
                  <QRCodeSVG value={link} size={220} level="M" />
                </div>
              </div>
              <Button variant="outline" className="mt-5 w-full" onClick={() => setQrOpen(false)}>
                {t('dashboard_qr_close')}
              </Button>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
