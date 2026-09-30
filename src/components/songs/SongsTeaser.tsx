import { Link } from 'react-router-dom';
import { ArrowRight, Music } from 'lucide-react';
import { useSongsAvailable } from '@/hooks/useSongsCatalog';

// Quiet teaser for Kerry's Montessori Songs. Hidden entirely until at least
// one song has been published by the admin.
const SongsTeaser = () => {
  const { available } = useSongsAvailable();
  if (!available) return null;

  return (
    <Link to="/songs" className="block mb-6 group" aria-label="Kerry's Montessori Songs collection">
      <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-background to-accent/10 p-5 sm:p-6 flex items-center justify-between gap-4 transition-colors group-hover:border-primary/50">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-full bg-primary/15 text-primary shrink-0">
            <Music className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Kerry's Montessori Songs</h2>
            <p className="text-sm text-muted-foreground mt-1 max-w-xl">
              Ten Montessori songs written by Kerry Howard. Listen to a preview of each — the full
              collection is yours with a single purchase.
            </p>
          </div>
        </div>
        <ArrowRight className="h-6 w-6 text-primary flex-shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </div>
    </Link>
  );
};

export default SongsTeaser;
