import { useState } from 'react';
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
  const [from, setFrom] = useState(schoolYearStart);
  const [to, setTo] = useState(() => iso(new Date()));
  const count = portfolioRows(completions, from, to).length;

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Many states ask homeschooling families to show that their curriculum covers state standards. These documents show how the Montessori lessons line up with Common Core and other U.S. standards. Requirements vary by state.
      </p>
      <Card>
        <CardHeader><CardTitle>Curriculum alignment guide</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">Every lesson in the curriculum with the standards it covers. Useful when your district asks you to describe your curriculum.</p>
          <Button variant="outline" onClick={() => openPrint(crosswalkHtml('Prepared for homeschool curriculum review'))}><Printer className="h-4 w-4 mr-1" />Print or save as PDF</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>{childName}'s progress portfolio</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">The activities {childName} completed, grouped by the standards they cover, with lines for you and an evaluator to sign.</p>
          <div className="flex flex-wrap gap-3 items-end">
            <div><Label htmlFor="hs-from">From</Label><Input id="hs-from" type="date" value={from} max={to} onChange={(ev) => ev.target.value && setFrom(ev.target.value)} /></div>
            <div><Label htmlFor="hs-to">To</Label><Input id="hs-to" type="date" value={to} min={from} onChange={(ev) => ev.target.value && setTo(ev.target.value)} /></div>
            <Button onClick={() => openPrint(portfolioHtml(childName, completions, from, to))}><Printer className="h-4 w-4 mr-1" />Print or save as PDF</Button>
          </div>
          <p className="text-sm text-muted-foreground">{count} standard{count === 1 ? '' : 's'} with evidence in this period.</p>
        </CardContent>
      </Card>
    </div>
  );
};
