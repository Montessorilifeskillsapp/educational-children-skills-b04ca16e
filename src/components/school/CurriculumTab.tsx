import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronRight, Printer } from 'lucide-react';
import { crosswalkHtml } from './crosswalkReport';
import { Input } from '@/components/ui/input';
import { areas, orderedSkills, skillLink } from './curriculum';
import { allowSchoolNavigation } from './navigation';

/** Browse every curriculum activity from inside the portal; opening one keeps the "Return to School Portal" bar. */
export default function CurriculumTab({ schoolName = '' }: { schoolName?: string }) {
  const navigate = useNavigate();
  const all = orderedSkills();
  const list = areas();
  const [area, setArea] = useState(list[0]?.key ?? '');
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const visible = useMemo(
    () => (q ? all.filter((s) => s.title.toLowerCase().includes(q)) : all.filter((s) => s.areaKey === area)),
    [all, area, q],
  );

  const printCrosswalk = () => {
    const w = window.open('', '_blank');
    if (!w) return;
    w.document.write(crosswalkHtml(schoolName));
    w.document.close();
    w.focus(); setTimeout(() => w.print(), 250);
  };

  return (
    <section className="space-y-5">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl text-foreground">Curriculum</h2>
          <p className="text-muted-foreground">Every presentation, in order from first to most advanced.</p>
          <button type="button" onClick={printCrosswalk} className="mt-1 inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
            <Printer className="h-4 w-4" /> Common Core standards crosswalk
          </button>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input aria-label="Search all activities" className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search all activities" />
        </div>
      </header>

      {!q && (
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Curriculum areas">
          {list.map((a) => (
            <button key={a.key} type="button" role="tab" aria-selected={area === a.key} onClick={() => setArea(a.key)}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${area === a.key ? 'bg-primary text-primary-foreground font-medium' : 'bg-card text-muted-foreground hover:text-foreground'}`}>
              {a.title}
            </button>
          ))}
        </div>
      )}

      <ul className="school-card divide-y divide-border">
        {visible.length === 0 && <li className="p-6 text-muted-foreground">No activities match “{query}”.</li>}
        {visible.map((sk, i) => (
          <li key={`${sk.areaKey}:${sk.id}`}>
            <button type="button" onClick={() => { if (allowSchoolNavigation()) navigate(skillLink(sk)); }}
              className="flex w-full items-center gap-4 px-5 py-4 text-left hover:bg-accent/50">
              <span className="w-8 shrink-0 text-sm text-muted-foreground">{q ? '' : i + 1}</span>
              <span className="min-w-0 flex-1">
                <span className="block font-medium text-foreground">{sk.title}</span>
                {q && <span className="block text-sm text-muted-foreground">{sk.areaTitle}</span>}
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
