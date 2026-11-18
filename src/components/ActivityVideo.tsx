import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, PlayCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useActivityVideo } from '@/hooks/useActivityVideo';
import i18n from '@/i18n';
import { lessonText } from '@/i18n/lessonText';

interface ActivityVideoProps {
  skillId: string;
  activityTitle?: string;
}

export const ActivityVideo: React.FC<ActivityVideoProps> = ({ skillId, activityTitle }) => {
  const { exists, locked, reason, url, thumbnailUrl, title, loading } = useActivityVideo(skillId);

  if (loading || !exists) return null;

  const heading = title ? lessonText(title) : activityTitle ? i18n.t('lesson.video.heading', { title: activityTitle }) : i18n.t('lesson.video.default');

  return (
    <section aria-label={i18n.t('lesson.video.default')} className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <PlayCircle className="w-5 h-5 text-primary" aria-hidden="true" />
        <h2 className="text-lg font-semibold">{heading}</h2>
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          {locked ? (
            <div className="relative">
              {thumbnailUrl ? (
                <img decoding="async"
                  src={thumbnailUrl}
                  alt={i18n.t('lesson.video.preview', { title: heading })}
                  className="w-full aspect-video object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full aspect-video bg-muted" aria-hidden="true" />
              )}
              <div className="absolute inset-0 bg-foreground/60 flex flex-col items-center justify-center text-center p-6 gap-3">
                <Lock className="w-7 h-7 text-background" aria-hidden="true" />
                <p className="text-background font-medium max-w-sm">
                  {reason === 'signed_out'
                    ? i18n.t('lesson.video.signIn')
                    : i18n.t('lesson.video.members')}
                </p>
                <Button asChild size="sm">
                  <Link to={reason === 'signed_out' ? '/auth' : '/plans'}>
                    {reason === 'signed_out' ? i18n.t('lesson.video.signInBtn') : i18n.t('lesson.video.plans')}
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <video
              key={url ?? skillId}
              src={url ?? undefined}
              poster={thumbnailUrl ?? undefined}
              controls
              playsInline
              preload="metadata"
              controlsList="nodownload noplaybackrate noremoteplayback"
              disablePictureInPicture
              onContextMenu={(e) => e.preventDefault()}
              className="w-full aspect-video bg-black"
            />
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default ActivityVideo;
