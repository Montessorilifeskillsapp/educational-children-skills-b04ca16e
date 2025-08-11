import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

interface VideoPlayerProps {
  videoUrl?: string;
  stepId: string;
  onVideoUpdate?: (stepId: string, url: string) => void;
  isEditable?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  videoUrl, 
  stepId, 
  onVideoUpdate, 
  isEditable = false 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newUrl, setNewUrl] = useState(videoUrl || '');

  const handleSave = () => {
    if (onVideoUpdate) {
      onVideoUpdate(stepId, newUrl);
    }
    setIsEditing(false);
  };

  const isYouTubeUrl = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  if (isEditing) {
    return (
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="space-y-3">
            <Input
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="Enter video URL (YouTube, Vimeo, or direct link)"
              className="w-full"
            />
            <div className="flex gap-2">
              <Button onClick={handleSave} size="sm">
                Save
              </Button>
              <Button 
                onClick={() => setIsEditing(false)} 
                variant="outline" 
                size="sm"
              >
                Cancel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!videoUrl) {
    return isEditable ? (
      <Card className="mb-4 border-dashed border-2 border-gray-300">
        <CardContent className="p-4 text-center">
          <Button 
            onClick={() => setIsEditing(true)} 
            variant="outline"
            size="sm"
          >
            + Add Video
          </Button>
        </CardContent>
      </Card>
    ) : null;
  }

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="relative">
          {isYouTubeUrl(videoUrl) ? (
            <iframe
              src={getEmbedUrl(videoUrl)}
              className="w-full h-48 rounded-lg"
              frameBorder="0"
              allowFullScreen
              title={`Video for step ${stepId}`}
            />
          ) : (
            <video
              src={videoUrl}
              controls
              className="w-full h-48 rounded-lg"
            />
          )}
          {isEditable && (
            <Button
              onClick={() => setIsEditing(true)}
              size="sm"
              variant="outline"
              className="absolute top-2 right-2"
            >
              Edit
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoPlayer;