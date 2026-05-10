import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { User, Crown, Users, BookOpen, Star, Eye, Shield, Baby, Target, Flame, Award, Trophy, Sparkles, Medal } from 'lucide-react';
import { montessoriTheme } from './ThemeConfig';
import { useSEO } from '@/hooks/useSEO';
import BackButton from '@/components/ui/back-button';
import { useAuthContext } from '@/components/AuthProvider';
import { useProfile } from '@/contexts/ProfileContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from 'react-router-dom';
import { sensorialSkills } from '@/data/sensorialSkills';
import { languageSkillsData } from '@/data/languageSkills';
import { mathSkillsData } from '@/data/mathSkills';
import { geographySkillsData } from '@/data/geographySkills';
import { botanySkillsData } from '@/data/botanySkills';
import { artSkillsData } from '@/data/artSkills';
import { culturalSkillsData } from '@/data/culturalSkills';
import { graceAndCourtesySkills } from '@/data/graceAndCourtesySkills';

const PRACTICAL_LIFE_IDS = [
  'brushing-teeth','washing-hands','getting-dressed','making-bed','setting-table',
  'tying-shoes','pouring','spooning','flower-arranging','polishing','sweeping',
  'folding-clothes','watering-plants','cutting-with-scissors','preparing-snack'
];

const FOCUS_AREA_META: Record<string, { label: string; emoji: string; border: string; text: string; pct: string; ids: () => string[]; onView?: string }> = {
  'practical-life':  { label: 'Practical Life',     emoji: '🧺', border: 'border-amber-200',  text: 'text-amber-800',  pct: 'text-amber-700',  ids: () => PRACTICAL_LIFE_IDS,                onView: 'onPracticalLifeView' },
  'sensorial':       { label: 'Sensorial',          emoji: '🎨', border: 'border-accent/25',   text: 'text-accent',   pct: 'text-accent',   ids: () => Object.keys(sensorialSkills),      onView: 'onSensorialView' },
  'language':        { label: 'Language',           emoji: '📚', border: 'border-yellow-200', text: 'text-yellow-800', pct: 'text-yellow-700', ids: () => Object.keys(languageSkillsData),   onView: 'onLanguageView' },
  'math':            { label: 'Math',               emoji: '🔢', border: 'border-red-200',    text: 'text-red-800',    pct: 'text-red-700',    ids: () => Object.keys(mathSkillsData),       onView: 'onMathView' },
  'geography':       { label: 'Geography',          emoji: '🌍', border: 'border-blue-200',   text: 'text-blue-800',   pct: 'text-blue-700',   ids: () => Object.keys(geographySkillsData),  onView: 'onGeographyView' },
  'botany':          { label: 'Botany',             emoji: '🌱', border: 'border-green-200',  text: 'text-green-800',  pct: 'text-green-700',  ids: () => Object.keys(botanySkillsData),     onView: 'onBotanyView' },
  'art':             { label: 'Art',                emoji: '🎭', border: 'border-orange-200', text: 'text-orange-800', pct: 'text-orange-700', ids: () => Object.keys(artSkillsData),        onView: 'onArtView' },
  'grace-courtesy':  { label: 'Grace & Courtesy',   emoji: '🤝', border: 'border-primary/25', text: 'text-primary', pct: 'text-primary', ids: () => Object.keys(graceAndCourtesySkills) },
};

interface DashboardProps {
  onSkillSelect: (skillId: string) => void;
  onPracticalLifeView?: () => void;
  onSensorialView?: () => void;
  onLanguageView?: () => void;
  onMathView?: () => void;
  onGeographyView?: () => void;
  onBotanyView?: () => void;
  onArtView?: () => void;
  onCulturalView?: () => void;
  onSubscriptionView: () => void;
  onParentView: () => void;
  onProfilesView?: () => void;
  onBack?: () => void;
  completedSkills: string[];
  streak?: number;
  isPremium: boolean;
  activeProfile?: any;
}


const Dashboard: React.FC<DashboardProps> = ({
  onSkillSelect,
  onPracticalLifeView,
  onSensorialView,
  onLanguageView,
  onMathView,
  onGeographyView,
  onBotanyView,
  onArtView,
  onCulturalView,
  onSubscriptionView,
  onParentView,
  onProfilesView,
  onBack,
  completedSkills,
  streak = 0,
  isPremium,
  activeProfile
}) => {
  const { user, signOut } = useAuthContext();
  const { profiles, activeProfile: ctxActiveProfile, setActiveProfile } = useProfile();
  const currentProfile = ctxActiveProfile || activeProfile;
  
  // SEO optimization for dashboard
  useSEO({
    title: 'Child Progress Dashboard - Track Learning Milestones',
    description: 'Track your child\'s learning progress with detailed analytics and skill development milestones in our Montessori-based learning app.',
    keywords: 'child progress, learning analytics, montessori tracking, skill development, educational dashboard',
    canonical: 'https://montessori-skills.com/dashboard'
  });


  return (
    <div className={`min-h-screen ${montessoriTheme.backgrounds.dashboard} p-4`}>
      <div className="max-w-6xl mx-auto">
        {onBack && <BackButton onClick={onBack} label="Back to Home" />}
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center gap-4">
            {/* Logo with Blue Background */}
            <div className="relative">
              <div className="absolute inset-0 bg-blue-200 rounded-xl blur-md opacity-40"></div>
              <div className="relative z-10 bg-blue-200 rounded-xl p-3 shadow-lg">
                <img 
                  src="https://d64gsuwffb70l.cloudfront.net/688778d3289f1c9b05c2ffb1_1753917128245_83f1e130.jpeg" 
                  alt="Montessori Life Skills Logo" 
                  className="w-16 h-10 rounded-lg object-cover shadow-md"
                />
              </div>
            </div>
            <div>
              <h1 className={`text-3xl font-bold ${montessoriTheme.text.secondary} flex items-center gap-2`}>
                <Star className="h-6 w-6 text-green-600" />
                Montessori Life Skills
              </h1>
              {activeProfile && (
                <p className={`${montessoriTheme.text.muted} flex items-center gap-2 mt-1`}>
                  <span className="text-xl">{activeProfile.avatar}</span>
                  Welcome back, {activeProfile.name}!
                </p>
              )}
              {user && (
                <p className="text-sm text-gray-600 mt-1">
                  Logged in as: {user.email}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 items-center">
            {profiles.length > 0 && (
              <Select
                value={currentProfile?.id ?? ''}
                onValueChange={(id) => {
                  const next = profiles.find(p => p.id === id);
                  if (next) setActiveProfile(next);
                }}
              >
                <SelectTrigger className="w-[200px]" aria-label="Select child profile">
                  <SelectValue placeholder="Select child" />
                </SelectTrigger>
                <SelectContent>
                  {profiles.map(p => (
                    <SelectItem key={p.id} value={p.id}>
                      <span className="mr-2">{p.avatar}</span>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {onProfilesView && (
              <Button variant="outline" size="sm" onClick={onProfilesView}>
                <Users className="mr-2 h-4 w-4" />
                Manage
              </Button>
            )}
            {!user ? (
              <Link to="/auth">
                <Button variant="outline">
                  <User className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
              </Link>
            ) : (
              <Button variant="outline" onClick={() => signOut()}>
                Sign Out
              </Button>
            )}
          </div>
        </div>

        {/* Skill Categories Navigation */}
        {/* Streak + Badges */}
        {activeProfile && (() => {
          const totalDone = completedSkills.length;
          const focusAreas: string[] = activeProfile.interests || [];
          const masteredAreas = focusAreas.filter(areaId => {
            const meta = FOCUS_AREA_META[areaId];
            if (!meta) return false;
            const ids = meta.ids();
            return ids.length > 0 && ids.every(id => completedSkills.includes(id));
          });
          const badges = [
            { id: 'first-step',   label: 'First Step',     desc: 'Complete 1 activity',     icon: Sparkles, earned: totalDone >= 1,  color: 'from-yellow-400 to-amber-500' },
            { id: 'five-strong',  label: 'Five Strong',    desc: 'Complete 5 activities',   icon: Star,     earned: totalDone >= 5,  color: 'from-blue-400 to-primary/200' },
            { id: 'ten-explorer', label: 'Ten Explorer',   desc: 'Complete 10 activities',  icon: Medal,    earned: totalDone >= 10, color: 'from-primary to-accent/200' },
            { id: 'streak-3',     label: '3-Day Streak',   desc: 'Practice 3 days in a row', icon: Flame,   earned: streak >= 3,     color: 'from-orange-400 to-red-500' },
            { id: 'streak-7',     label: 'Week Streak',    desc: 'Practice 7 days in a row', icon: Flame,   earned: streak >= 7,     color: 'from-red-500 to-accent' },
            { id: 'area-master',  label: 'Focus Master',   desc: 'Complete a full focus area', icon: Trophy, earned: masteredAreas.length >= 1, color: 'from-emerald-400 to-green-600' },
          ];
          const earnedCount = badges.filter(b => b.earned).length;

          return (
            <section className="mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Streak card */}
                <Card className="lg:col-span-1 border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50">
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-3 shadow-lg">
                      <Flame className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-orange-700 leading-none">
                        {streak} <span className="text-base font-medium text-orange-600">day{streak === 1 ? '' : 's'}</span>
                      </div>
                      <div className="text-xs text-orange-700/80 mt-1">
                        {streak === 0 ? 'Start a streak today!' : 'Current learning streak'}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Badges card */}
                <Card className="lg:col-span-2 border-primary/25 bg-gradient-to-br from-primary/20 to-accent/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center justify-between text-base">
                      <span className="flex items-center gap-2 text-primary">
                        <Award className="h-5 w-5" />
                        Achievements
                      </span>
                      <span className="text-xs font-mono text-primary">
                        {earnedCount} / {badges.length}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                      {badges.map(b => {
                        const Icon = b.icon;
                        return (
                          <div
                            key={b.id}
                            title={`${b.label} — ${b.desc}`}
                            className={`flex flex-col items-center text-center p-2 rounded-xl transition ${
                              b.earned
                                ? 'bg-white shadow-md'
                                : 'bg-white/40 opacity-50 grayscale'
                            }`}
                          >
                            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${b.color} flex items-center justify-center mb-1 shadow`}>
                              <Icon className="h-5 w-5 text-white" />
                            </div>
                            <div className="text-[10px] font-semibold text-gray-700 leading-tight">
                              {b.label}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          );
        })()}

        {/* Focus Plan Progress */}
        {activeProfile?.interests && activeProfile.interests.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-5 w-5 text-primary" />
              <h2 className={`text-xl font-semibold ${montessoriTheme.text.secondary}`}>
                {activeProfile.name}'s Focus Plan
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeProfile.interests.map((areaId: string) => {
                const meta = FOCUS_AREA_META[areaId];
                if (!meta) return null;
                const allIds = meta.ids();
                const total = allIds.length || 1;
                const done = allIds.filter(id => completedSkills.includes(id)).length;
                const pct = Math.round((done / total) * 100);
                const handlers: Record<string, (() => void) | undefined> = {
                  onPracticalLifeView, onSensorialView, onLanguageView, onMathView,
                  onGeographyView, onBotanyView, onArtView, onCulturalView,
                };
                const onClick = meta.onView ? handlers[meta.onView] : undefined;
                return (
                  <Card
                    key={areaId}
                    onClick={onClick}
                    className={`${montessoriTheme.card.base} ${onClick ? 'cursor-pointer hover:shadow-lg' : ''} transition-all ${meta.border}`}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center justify-between text-base">
                        <span className="flex items-center gap-2">
                          <span className="text-2xl">{meta.emoji}</span>
                          <span className={meta.text}>{meta.label}</span>
                        </span>
                        <span className={`text-sm font-mono ${meta.pct}`}>{pct}%</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <Progress value={pct} className="h-2 mb-2" />
                      <p className="text-xs text-gray-600">
                        {done} of {total} activities completed
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        )}

        {/* All Areas Progress Strip */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-5 w-5 text-blue-600" />
            <h2 className={`text-xl font-semibold ${montessoriTheme.text.secondary}`}>
              Progress Across All Areas
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(FOCUS_AREA_META).map(([areaId, meta]) => {
              const allIds = meta.ids();
              const total = allIds.length || 1;
              const done = allIds.filter(id => completedSkills.includes(id)).length;
              const pct = Math.round((done / total) * 100);
              const handlers: Record<string, (() => void) | undefined> = {
                onPracticalLifeView, onSensorialView, onLanguageView, onMathView,
                onGeographyView, onBotanyView, onArtView, onCulturalView,
              };
              const onClick = meta.onView ? handlers[meta.onView] : undefined;
              return (
                <Card
                  key={areaId}
                  onClick={onClick}
                  className={`${montessoriTheme.card.base} ${onClick ? 'cursor-pointer hover:shadow-md' : ''} transition-all ${meta.border}`}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="flex items-center gap-1.5 min-w-0">
                        <span className="text-lg leading-none">{meta.emoji}</span>
                        <span className={`text-xs font-semibold truncate ${meta.text}`}>{meta.label}</span>
                      </span>
                      <span className={`text-xs font-mono ${meta.pct}`}>{pct}%</span>
                    </div>
                    <Progress value={pct} className="h-1.5 mb-1" />
                    <p className="text-[10px] text-gray-600">
                      {done} / {total}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Skill Categories Navigation */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-300 mb-4 text-center">
            Explore Skill Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {onPracticalLifeView && (
              <Card 
                className={`${montessoriTheme.card.base} ${montessoriTheme.backgrounds.practical} cursor-pointer hover:shadow-lg transition-all border-amber-200`}
                onClick={onPracticalLifeView}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-2xl">🏠</span>
                    <div>
                      <h3 className="text-amber-800 font-semibold">Practical Life Skills</h3>
                      <p className="text-sm text-gray-700">Daily living activities</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="bg-amber-100/50 rounded-lg p-3 border border-amber-200">
                    <p className="text-xs font-semibold text-amber-900 mb-1">Montessori Principle:</p>
                    <p className="text-xs text-amber-800 leading-relaxed">
                      <strong>Why:</strong> Practical Life is the foundation of Montessori education. These activities develop concentration, coordination, independence, and order—the four pillars of learning. Children gain confidence through meaningful work that mirrors real adult tasks, satisfying their innate desire to contribute to family and community life.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {onSensorialView && (
              <Card 
                className={`${montessoriTheme.card.base} ${montessoriTheme.backgrounds.sensorial} cursor-pointer hover:shadow-lg transition-all border-accent/25`}
                onClick={onSensorialView}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-2xl">👁️</span>
                    <div>
                      <h3 className="text-accent">Sensorial Skills</h3>
                      <p className="text-sm text-gray-700">Refine the senses</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="bg-accent/15/50 rounded-lg p-3 border border-accent/25">
                    <p className="text-xs font-semibold text-accent mb-1">Montessori Principle:</p>
                    <p className="text-xs text-accent leading-relaxed">
                      <strong>Why:</strong> Dr. Montessori believed the senses are the gateway to intelligence. Sensorial materials isolate specific qualities (size, color, texture, sound, weight) to sharpen perception and develop powers of observation. This refined sensory awareness forms the foundation for mathematical thinking, scientific exploration, and artistic expression.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {onLanguageView && (
              <Card 
                className={`${montessoriTheme.card.base} cursor-pointer hover:shadow-lg transition-all border-yellow-200 bg-yellow-50`}
                onClick={onLanguageView}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-2xl">📚</span>
                    <div>
                      <h3 className="text-yellow-700">Language Skills</h3>
                      <p className="text-sm text-gray-600">Reading and writing</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="bg-yellow-100/50 rounded-lg p-3 border border-yellow-200">
                    <p className="text-xs font-semibold text-yellow-900 mb-1">Montessori Principle:</p>
                    <p className="text-xs text-yellow-800 leading-relaxed">
                      <strong>Why:</strong> Language development follows the child's sensitive period for oral and written communication. Montessori's phonetic approach with tactile sandpaper letters engages multiple senses, making abstract symbols concrete. Children naturally progress from spoken language to writing (encoding) before reading (decoding), respecting natural developmental stages.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {onMathView && (
              <Card 
                className={`${montessoriTheme.card.base} ${montessoriTheme.backgrounds.math} cursor-pointer hover:shadow-lg transition-all border-red-200`}
                onClick={onMathView}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-2xl">🔢</span>
                    <div>
                      <h3 className="text-red-700">Mathematics Skills</h3>
                      <p className="text-sm text-gray-700">Numbers and counting</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="bg-red-100/50 rounded-lg p-3 border border-red-200">
                    <p className="text-xs font-semibold text-red-900 mb-1">Montessori Principle:</p>
                    <p className="text-xs text-red-800 leading-relaxed">
                      <strong>Why:</strong> Mathematics is presented as concrete experiences before abstract concepts. The child manipulates physical materials (Golden Beads, Number Rods) to internalize quantity, sequence, and operations. This hands-on approach builds the "mathematical mind"—understanding relationships, patterns, and logic that extend far beyond arithmetic.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {onGeographyView && (
              <Card 
                className={`${montessoriTheme.card.base} ${montessoriTheme.backgrounds.geography} cursor-pointer hover:shadow-lg transition-all border-blue-200`}
                onClick={onGeographyView}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-2xl">🌍</span>
                    <div>
                      <h3 className="text-blue-700">Geography Skills</h3>
                      <p className="text-sm text-gray-700">Explore our world</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="bg-blue-100/50 rounded-lg p-3 border border-blue-200">
                    <p className="text-xs font-semibold text-blue-900 mb-1">Montessori Principle:</p>
                    <p className="text-xs text-blue-800 leading-relaxed">
                      <strong>Why:</strong> Geography cultivates cosmic education—the child's place within the larger world. Through tactile puzzle maps and cultural studies, children develop spatial awareness, respect for diversity, and interconnectedness. This fosters global citizenship and environmental stewardship from an early age.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {onBotanyView && (
              <Card 
                className={`${montessoriTheme.card.base} ${montessoriTheme.backgrounds.botany} cursor-pointer hover:shadow-lg transition-all border-green-200`}
                onClick={onBotanyView}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-2xl">🌱</span>
                    <div>
                      <h3 className="text-green-700">Botany Skills</h3>
                      <p className="text-sm text-gray-700">Learn about plants</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="bg-green-100/50 rounded-lg p-3 border border-green-200">
                    <p className="text-xs font-semibold text-green-900 mb-1">Montessori Principle:</p>
                    <p className="text-xs text-green-800 leading-relaxed">
                      <strong>Why:</strong> Botany connects children to the natural world through direct observation and care. Understanding plant life cycles, structure, and needs teaches responsibility, patience, and scientific inquiry. Children develop reverence for life and ecological awareness while practicing categorization and nomenclature skills.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
            {onArtView && (
              <Card 
                className={`${montessoriTheme.card.base} ${montessoriTheme.backgrounds.art} cursor-pointer hover:shadow-lg transition-all border-orange-200`}
                onClick={onArtView}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-2xl">🎨</span>
                    <div>
                      <h3 className="text-orange-800">Art Skills</h3>
                      <p className="text-sm text-gray-700">Creative expression</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="bg-orange-100/50 rounded-lg p-3 border border-orange-200">
                    <p className="text-xs font-semibold text-orange-900 mb-1">Montessori Principle:</p>
                    <p className="text-xs text-orange-800 leading-relaxed">
                      <strong>Why:</strong> Art in Montessori is process-oriented, not product-focused. Children explore materials freely to express inner creativity, refine fine motor control, and develop aesthetic sensibility. Open-ended art experiences build confidence in self-expression while respecting each child's unique creative voice and developmental readiness.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
            {onCulturalView && (
              <Card 
                className={`${montessoriTheme.card.base} ${montessoriTheme.backgrounds.cultural} cursor-pointer hover:shadow-lg transition-all border-primary/25`}
                onClick={onCulturalView}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-2xl">🏛️</span>
                    <div>
                      <h3 className="text-primary">Cultural Studies</h3>
                      <p className="text-sm text-gray-700">History, music, science & world cultures</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="bg-primary/15/50 rounded-lg p-3 border border-primary/25">
                    <p className="text-xs font-semibold text-primary mb-1">Montessori Principle:</p>
                    <p className="text-xs text-primary leading-relaxed">
                      <strong>Why:</strong> Cultural studies unite all areas of knowledge into Montessori's vision of cosmic education. Through history, music, science, and world cultures, children discover their place in the universe and develop respect for human achievement and diversity across time and place.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        {/* Additional Pages Navigation */}
        <section className="mb-8">
          <h2 className={`text-xl font-semibold ${montessoriTheme.text.secondary} mb-4`}>
            Additional Pages & Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card 
              className="cursor-pointer hover:shadow-xl transition-all border-2 border-primary/40 bg-gradient-to-br from-primary/20 to-accent/20 transform hover:scale-105"
              onClick={onSubscriptionView}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-primary/200 to-accent/200 rounded-full">
                    <Crown className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-primary font-bold">Premium Plans</h3>
                    <p className="text-sm text-primary">Unlock all features & content</p>
                  </div>
                </CardTitle>
              </CardHeader>
            </Card>

            <Card 
              className={`${montessoriTheme.card.base} cursor-pointer hover:shadow-lg transition-all border-teal-200 bg-teal-50`}
              onClick={onParentView}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3">
                  <User className="h-6 w-6 text-teal-600" />
                  <div>
                    <h3 className="text-teal-700">Family Dashboard</h3>
                    <p className="text-sm text-gray-600">Track progress</p>
                  </div>
                </CardTitle>
              </CardHeader>
            </Card>

            {onProfilesView && (
              <Card 
                className={`${montessoriTheme.card.base} cursor-pointer hover:shadow-lg transition-all border-primary/25 bg-primary/10`}
                onClick={onProfilesView}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="text-primary">Child Profiles</h3>
                      <p className="text-sm text-gray-600">Manage profiles</p>
                    </div>
                  </CardTitle>
                </CardHeader>
              </Card>
            )}

            <Card 
              className={`${montessoriTheme.card.base} cursor-pointer hover:shadow-lg transition-all border-cyan-200 bg-cyan-50`}
              onClick={onParentView}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3">
                  <User className="h-6 w-6 text-cyan-600" />
                  <div>
                    <h3 className="text-cyan-700">Child Page</h3>
                    <p className="text-sm text-gray-600">Child activities & progress</p>
                  </div>
                </CardTitle>
              </CardHeader>
            </Card>



          </div>
        </section>

      </div>
    </div>
  );
};

export default Dashboard;