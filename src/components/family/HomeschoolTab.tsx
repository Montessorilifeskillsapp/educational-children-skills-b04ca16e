import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Printer } from 'lucide-react';
import { crosswalkHtml } from '@/components/school/crosswalkReport';
import { portfolioHtml, portfolioRows } from './homeschoolReport';
import type { Completion } from './api';

const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

/** Default reporting period: the current school year, starting August 1. */
const schoolYearStart = () => {
  const now = new Date();
  return iso(new Date(now.getMonth() >= 7 ? now.getFullYear() : now.getFullYear() - 1, 7, 1));
};

const openPrint = (html: string) => {
  const w = window.open('', '_blank');
  if (!w) return;
  w.document.write(html);
  w.document.close();
  w.focus(); setTimeout(() => w.print(), 250);
};

export const HomeschoolTab = ({ childName, completions }: { childName: string; completions: Completion[] }) => {
  const { t } = useTranslation();
  const [from, setFrom] = useState(schoolYearStart);
  const [to, setTo] = useState(() => iso(new Date()));
  const count = portfolioRows(completions, from, to).length;

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        {t('family.hs.intro')}
      </p>
      <Card>
        <CardHeader><CardTitle>{t('family.hs.guide')}</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">{t('family.hs.guideBody')}</p>
          <Button variant="outline" onClick={() => openPrint(crosswalkHtml('Prepared for homeschool curriculum review'))}><Printer className="h-4 w-4 mr-1" />{t('shared.printPdf')}</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>{t('family.hs.portfolio', { name: childName })}</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">{t('family.hs.portfolioBody', { name: childName })}</p>
          <div className="flex flex-wrap gap-3 items-end">
            <div><Label htmlFor="hs-from">{t('shared.from')}</Label><Input id="hs-from" type="date" value={from} max={to} onChange={(ev) => ev.target.value && setFrom(ev.target.value)} /></div>
            <div><Label htmlFor="hs-to">{t('shared.to')}</Label><Input id="hs-to" type="date" value={to} min={from} onChange={(ev) => ev.target.value && setTo(ev.target.value)} /></div>
            <Button onClick={() => openPrint(portfolioHtml(childName, completions, from, to))}><Printer className="h-4 w-4 mr-1" />{t('shared.printPdf')}</Button>
          </div>
          <p className="text-sm text-muted-foreground">{t('family.hs.count', { count })}</p>
        </CardContent>
      </Card>
    </div>
  );
};
