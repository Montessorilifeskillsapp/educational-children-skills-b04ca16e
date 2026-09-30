import { Link } from 'react-router-dom';
import { ArrowRight, Music } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSongsAvailable } from '@/hooks/useSongsCatalog';

// Shop entry for Kerry's Montessori Songs. Hidden until at least one song is
// published from the admin.
const SongsShopCard = () => {
  const { available, purchased } = useSongsAvailable();
  if (!available) return null;

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
      <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-full bg-primary/15 text-primary shrink-0">
            <Music className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Kerry's Montessori Songs</h3>
            <p className="text-sm text-muted-foreground">
              {purchased
                ? 'You own the collection — listen to every song in full.'
                : 'Ten Montessori songs by Kerry Howard. Play a preview of each, or own the full collection.'}
            </p>
          </div>
        </div>
        <Button asChild variant="outline" className="shrink-0">
          <Link to="/songs">
            {purchased ? 'Listen now' : 'Listen to previews'}
            <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default SongsShopCard;
