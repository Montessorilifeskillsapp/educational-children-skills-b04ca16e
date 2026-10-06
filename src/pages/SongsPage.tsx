import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ExternalLink, Loader2, Lock, Music, Pause, Play, School } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/components/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { useSongsCatalog, type SongTrack } from '@/hooks/useSongsCatalog';
import { isNativePurchaseAvailable } from '@/lib/revenuecat';
import { supabase } from '@/integrations/supabase/client';
import { useSEO } from '@/hooks/useSEO';
import SEOOptimizer from '@/components/SEOOptimizer';

const SONGS_PRICE_LABEL = '$99.99 · one-time, lifetime access';

const formatDuration = (seconds: number | null) => {
  if (!seconds || seconds <= 0) return null;
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
};

const SongsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { toast } = useToast();
  const { loading, error, purchased, songs } = useSongsCatalog();
  const isNative = isNativePurchaseAvailable();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useSEO({
    title: "Kerry's Montessori Songs — Montessori Life Skills",
    description:
      "Ten Montessori songs written by Kerry Howard. Play a free preview of each song; purchase the collection once for full lifetime access for your family.",
    canonical: '/songs',
  });

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const togglePlay = (song: SongTrack) => {
    const url = purchased && song.fullUrl ? song.fullUrl : song.previewUrl;
    if (!url) return;
    const audio = audioRef.current;
    if (!audio) return;

    if (playingId === song.id && !audio.paused) {
      audio.pause();
      setPlayingId(null);
      return;
    }
    if (audio.src !== url) {
      audio.src = url;
    }
    audio.currentTime = 0;
    void audio.play().then(() => setPlayingId(song.id)).catch(() => {
      toast({ title: 'Playback failed', description: 'Please try again in a moment.', variant: 'destructive' });
    });
  };

  const handleBuy = async () => {
    if (songs.length === 0) return;
    if (!user) {
      navigate('/auth?redirect=/songs');
      return;
    }
    setBusy(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { planId: 'songs-bundle' },
      });
      if (error) throw new Error(error.message);
      const url = (data as { url?: string }).url;
      if (!url) throw new Error('Checkout could not be started.');
      window.location.href = url;
    } catch (err) {
      toast({
        title: 'Could not start checkout',
        description: err instanceof Error ? err.message : 'Please try again.',
        variant: 'destructive',
      });
      setBusy(false);
    }
  };

  const openWebsite = () => {
    window.open('https://montessorilifeskillsapp.com/songs', '_system');
  };

  return (
    <SEOOptimizer>
      <PageLayout title="Kerry's Montessori Songs" onBack={() => navigate('/')}>
        <audio ref={audioRef} onEnded={() => setPlayingId(null)} preload="none" />

        <div className="space-y-6">
          {/* Collection intro + purchase */}
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2.5 rounded-full bg-primary/15 text-primary shrink-0">
                  <Music className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Songs for the Montessori home and classroom</h2>
                  <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
                    Ten original songs written by Kerry Howard, following authentic Montessori
                    principles. Every song has a free preview; the full collection is a single
                    purchase with lifetime access for your whole family.
                  </p>
                </div>
              </div>

              {purchased ? (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/10 border border-primary/25">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-primary">
                     You have full access to the collection — every song plays in full below.
                  </p>
                </div>
              ) : loading || songs.length === 0 ? (
                <p className="text-sm text-muted-foreground">The collection will be available to purchase once the songs are released.</p>
              ) : isNative ? (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Purchases of the song collection happen on our website. Your access carries over
                    to this app automatically with the same account.
                  </p>
                  <Button onClick={openWebsite} variant="outline">
                    <ExternalLink className="w-4 h-4 mr-2" aria-hidden="true" />
                    Buy on our website
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div>
                    <p className="text-lg font-bold text-primary">{SONGS_PRICE_LABEL}</p>
                    <p className="text-xs text-muted-foreground">Not included with Premium plans.</p>
                  </div>
                  <Button onClick={handleBuy} disabled={busy} className="sm:ml-auto">
                    {busy ? <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" /> : <Music className="w-4 h-4 mr-2" aria-hidden="true" />}
                    {user ? 'Get the full collection' : 'Sign in to buy the collection'}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Song list */}
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" aria-hidden="true" />
            </div>
          ) : error ? (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                The songs could not be loaded. Please try again in a moment.
              </CardContent>
            </Card>
          ) : songs.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                The song collection is coming soon.
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {songs.map((song, index) => {
                const isPlaying = playingId === song.id;
                const fullAvailable = purchased && !!song.fullUrl;
                return (
                  <Card key={song.id} className="overflow-hidden flex flex-col">
                    <div className="relative bg-muted">
                      {song.coverUrl ? (
                        <img
                          src={song.coverUrl}
                          alt={`${song.title} cover`}
                          className="w-full h-40 object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-40 flex items-center justify-center bg-primary/5">
                          <Music className="w-10 h-10 text-primary/40" aria-hidden="true" />
                        </div>
                      )}
                      <button
                        onClick={() => togglePlay(song)}
                        className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-background/90 backdrop-blur px-4 py-2 text-sm font-medium shadow hover:bg-background transition-colors"
                        aria-label={isPlaying ? `Pause ${song.title}` : `Play preview of ${song.title}`}
                      >
                        {isPlaying ? (
                          <Pause className="w-4 h-4" aria-hidden="true" />
                        ) : (
                          <Play className="w-4 h-4" aria-hidden="true" />
                        )}
                        {isPlaying ? 'Pause' : fullAvailable ? 'Play' : 'Preview'}
                      </button>
                      <span className="absolute top-3 right-3 text-xs rounded-full bg-background/90 px-2 py-0.5 text-muted-foreground">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <CardContent className="p-4 flex-1 flex flex-col">
                      <h3 className="font-semibold text-foreground">{song.title}</h3>
                      {song.description && (
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2 flex-1">{song.description}</p>
                      )}
                      <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                        <span>
                          {formatDuration(song.duration_seconds) ? `${formatDuration(song.duration_seconds)} full song` : 'Full song'}
                        </span>
                        {fullAvailable ? (
                          <span className="inline-flex items-center gap-1 text-primary font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                             Full access
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1">
                            <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                            Full song with collection
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Schools licensing */}
          <Card>
            <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-full bg-primary/15 text-primary shrink-0">
                  <School className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Schools: license the collection</h3>
                  <p className="text-sm text-muted-foreground">
                    Annual classroom licences are arranged directly with Kerry.
                  </p>
                </div>
              </div>
              <Button asChild variant="outline" className="shrink-0">
                <a
                  href="mailto:montessorilifeskills@gmail.com?subject=Schools%3A%20license%20the%20Montessori%20Songs%20collection"
                >
                  Contact Kerry about licensing
                </a>
              </Button>
            </CardContent>
          </Card>

           <p className="text-xs text-muted-foreground text-center">
             © Kerry Howard. All rights reserved. Songs stream inside the app; family access does not transfer copyright.
             {' '}<a href="/terms-of-service" className="underline hover:text-foreground">Copyright and use terms</a>
          </p>
        </div>
      </PageLayout>
    </SEOOptimizer>
  );
};

export default SongsPage;
