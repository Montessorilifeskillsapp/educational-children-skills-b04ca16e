import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Download, ExternalLink, Loader2, Lock, Music, Pause, Play, School } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/components/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { useSongsCatalog, type SongTrack } from '@/hooks/useSongsCatalog';
import { isNativePurchaseAvailable } from '@/lib/revenuecat';
import { previewWindow } from '@/lib/songPreview';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
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
  const previewEndRef = useRef<number | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [signOpen, setSignOpen] = useState(false);
  const [signName, setSignName] = useState('');
  const [agreed, setAgreed] = useState(false);

  useSEO({
    title: "Kerry's Montessori Songs — Montessori Life Skills",
    description:
      "Ten Montessori songs written by Kerry Howard. Play a free preview of each song; purchase the collection once for full lifetime access for your family.",
    canonical: '/songs',
  });

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      audio?.pause();
    };
  }, []);

  const togglePlay = (song: SongTrack) => {
    const isFull = purchased && !!song.fullUrl;
    const url = isFull ? song.fullUrl : song.previewUrl;
    if (!url) return;
    const audio = audioRef.current;
    if (!audio) return;

    if (playingId === song.id && !audio.paused) {
      audio.pause();
      setPlayingId(null);
      return;
    }
    previewEndRef.current = null;
    const start = () => {
      if (!isFull) {
        const win = previewWindow(audio.duration);
        audio.currentTime = win.start;
        previewEndRef.current = win.end;
      } else {
        audio.currentTime = 0;
      }
      void audio.play().then(() => setPlayingId(song.id)).catch(() => {
        toast({ title: 'Playback failed', description: 'Please try again in a moment.', variant: 'destructive' });
      });
    };
    if (audio.src !== url) {
      audio.src = url;
      audio.addEventListener('loadedmetadata', start, { once: true });
      audio.load();
    } else if (audio.readyState >= 1) {
      start();
    } else {
      audio.addEventListener('loadedmetadata', start, { once: true });
      audio.load();
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    const end = previewEndRef.current;
    if (audio && end !== null && audio.currentTime >= end) {
      audio.pause();
      previewEndRef.current = null;
      setPlayingId(null);
    }
  };

  const handleBuy = () => {
    if (songs.length === 0) return;
    if (!user) {
      navigate('/auth?redirect=/songs');
      return;
    }
    setSignOpen(true);
  };

  const startCheckout = async () => {
    setBusy(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { planId: 'songs-bundle', licenceSignature: { name: signName.trim(), agreed } },
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
  const canSign = agreed && signName.trim().length >= 2;

  const openWebsite = () => {
    window.open('https://montessorilifeskillsapp.com/songs', '_system');
  };

  return (
    <SEOOptimizer>
      <PageLayout title="Kerry's Montessori Songs" onBack={() => navigate('/')}>
        <audio ref={audioRef} onEnded={() => setPlayingId(null)} onTimeUpdate={handleTimeUpdate} preload="none" />

        <Dialog open={signOpen} onOpenChange={(o) => !busy && setSignOpen(o)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Sign the Household License Agreement</DialogTitle>
              <DialogDescription>
                Before purchasing, please read and sign the license for Kerry's Montessori Songs.
                You may download the songs for private use within your own household only. They may not be used in any school, classroom, daycare, co-op, camp or other group setting.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <a href="/songs-licence" target="_blank" rel="noopener" className="text-sm text-primary underline inline-flex items-center gap-1">
                Read the full license agreement <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
              <div className="flex items-start gap-3">
                <Checkbox id="licence-agree" checked={agreed} onCheckedChange={(v) => setAgreed(v === true)} />
                <Label htmlFor="licence-agree" className="text-sm leading-snug font-normal">
                  I have read and agree to the Household License Agreement, and confirm this purchase is for my household only, not for any school, childcare or group use.
                </Label>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="licence-name">Signature — type your full name</Label>
                <Input id="licence-name" value={signName} onChange={(e) => setSignName(e.target.value)} placeholder="Full name" maxLength={120} autoComplete="name" />
                <p className="text-xs text-muted-foreground">
                  Signed as {user?.email} on {new Date().toLocaleDateString()}.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSignOpen(false)} disabled={busy}>Cancel</Button>
              <Button onClick={startCheckout} disabled={!canSign || busy}>
                {busy && <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />}
                Sign and continue to payment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

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
                    principles. Every song has a free 15-second sample; the full collection is a single
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
                    <p className="text-xs text-muted-foreground">A separate purchase — not included with Premium or Family subscriptions.</p>
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
                      {fullAvailable && song.downloadUrl && (
                        <Button asChild variant="outline" size="sm" className="mt-3 w-full">
                          <a href={song.downloadUrl} aria-label={`Download ${song.title}`}>
                            <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                            Download
                          </a>
                        </Button>
                      )}
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
                  <h3 className="font-semibold text-foreground">Schools: one license for everything</h3>
                  <p className="text-sm text-muted-foreground">
                    For schools, the songs are part of a single school license that also covers the
                    curriculum app and the School Portal. Arranged directly with Kerry.{' '}
                    <a href="/songs-licence" className="underline">Read the license agreement</a>
                  </p>
                </div>
              </div>
              <Button asChild variant="outline" className="shrink-0">
                <a
                  href="mailto:montessorilifeskills@gmail.com?subject=School%20license%3A%20app%2C%20School%20Portal%20and%20songs"
                >
                  Ask Kerry about a school license
                </a>
              </Button>
            </CardContent>
          </Card>

           <p className="text-xs text-muted-foreground text-center">
             © Kerry Howard. All rights reserved. Household downloads are for private use within the purchasing household only; no school, classroom or group use. Purchase does not transfer copyright.
             {' '}<a href="/terms-of-service" className="underline hover:text-foreground">Copyright and use terms</a>
          </p>
        </div>
      </PageLayout>
    </SEOOptimizer>
  );
};

export default SongsPage;
