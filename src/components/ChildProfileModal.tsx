import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, Camera } from 'lucide-react';

interface ChildProfile {
  id: string;
  name: string;
  age: number;
  avatar: string;
  interests: string[];
  learningStyle: string;
}

interface ChildProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (profile: ChildProfile) => void;
  profile?: ChildProfile;
  /** When set, saving first pays for an extra child. Resolve true to continue saving. */
  purchase?: { label: string; run: (draft: ChildProfile) => Promise<boolean> };
}

const ChildProfileModal: React.FC<ChildProfileModalProps> = ({
  isOpen,
  onClose,
  onSave,
  profile,
  purchase
}) => {
  const { t } = useTranslation();
  const [paying, setPaying] = useState(false);
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    age: profile?.age || 3,
    avatar: profile?.avatar || '👶',
    interests: profile?.interests || [],
    learningStyle: profile?.learningStyle || 'visual'
  });

  const avatarOptions = ['👶', '👧', '👦', '🧒', '👨', '👩', '🌟', '🎨', '📚', '🌈'];
  const interestOptions = ['Art', 'Music', 'Nature', 'Building', 'Reading', 'Movement', 'Cooking', 'Animals'];

  const handleSave = async () => {
    const newProfile: ChildProfile = {
      id: profile?.id || Date.now().toString(),
      name: formData.name,
      age: formData.age,
      avatar: formData.avatar,
      interests: formData.interests,
      learningStyle: formData.learningStyle
    };
    if (purchase && !profile) {
      setPaying(true);
      try {
        // Keeps the form open (and what was typed) if payment is cancelled or fails.
        if (!(await purchase.run(newProfile))) return;
      } finally {
        setPaying(false);
      }
    }
    onSave(newProfile);
    onClose();
  };

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {profile ? t('family.prof.edit') : t('family.prof.create')}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Avatar Selection */}
          <div className="text-center">
            <Label>{t('family.prof.avatar')}</Label>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {avatarOptions.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => setFormData(prev => ({ ...prev, avatar: emoji }))}
                  className={`p-2 rounded-full text-2xl hover:bg-gray-100 ${
                    formData.avatar === emoji ? 'bg-blue-100 ring-2 ring-blue-500' : ''
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div>
            <Label htmlFor="name">{t('family.prof.childName')}</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder={t('family.prof.namePh')}
            />
          </div>

          {/* Age */}
          <div>
            <Label htmlFor="age">{t('family.prof.age')}</Label>
            <Select
              value={formData.age.toString()}
              onValueChange={(value) => setFormData(prev => ({ ...prev, age: parseInt(value) }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[2, 3, 4, 5, 6, 7, 8].map(age => (
                  <SelectItem key={age} value={age.toString()}>{t('family.prof.yearsOld', { age })}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Interests */}
          <div>
            <Label>{t('family.prof.interests')}</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {interestOptions.map(interest => (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    formData.interests.includes(interest)
                      ? 'bg-primary/15 text-primary border border-primary/40'
                      : 'bg-muted text-foreground hover:bg-muted/70'
                  }`}
                >
                  {t(`family.prof.int.${interest}`, { defaultValue: interest })}
                </button>
              ))}
            </div>
          </div>

          {/* Learning Style */}
          <div>
            <Label>{t('family.prof.style')}</Label>
            <Select
              value={formData.learningStyle}
              onValueChange={(value) => setFormData(prev => ({ ...prev, learningStyle: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="visual">{t('family.prof.visual')}</SelectItem>
                <SelectItem value="auditory">{t('family.prof.auditory')}</SelectItem>
                <SelectItem value="kinesthetic">{t('family.prof.kinesthetic')}</SelectItem>
                <SelectItem value="mixed">{t('family.prof.mixed')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              {t('shared.cancel')}
            </Button>
            <Button 
              onClick={handleSave} 
              className="flex-1"
              disabled={!formData.name.trim() || paying}
            >
              {paying
                ? t('family.prof.waiting')
                : profile
                  ? t('family.prof.update')
                  : purchase
                    ? `${t('family.prof.addNamed', { name: formData.name.trim() || t('family.prof.child') })}${purchase.label ? ` — ${purchase.label}` : ''}`
                    : t('family.prof.createBtn')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChildProfileModal;