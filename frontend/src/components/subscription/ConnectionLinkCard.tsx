import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { ConnectionButtons } from '@/components/subscription/ConnectionButtons'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getConnection } from '@/api/subscription'

export function ConnectionLinkCard() {
  const { t } = useTranslation()

  const { data: connection, isLoading, refetch } = useQuery({
    queryKey: ['connection'],
    queryFn: getConnection,
  })

  const link = connection?.link ?? ''

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <CardTitle className="text-base">{t('dashboard_connect_title')}</CardTitle>
            <CardDescription>{t('dashboard_connect_desc')}</CardDescription>
          </div>
          <Badge variant="info" className="shrink-0">VLESS · TLS</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {isLoading ? (
          <div className="h-12 animate-pulse rounded-[var(--radius)] bg-[hsl(var(--muted))]" />
        ) : link ? (
          <ConnectionButtons link={link} />
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-[hsl(var(--muted-foreground))]">{t('dashboard_connect_empty')}</p>
            <Button variant="outline" onClick={() => refetch()}>
              {t('dashboard_connect_get')}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
