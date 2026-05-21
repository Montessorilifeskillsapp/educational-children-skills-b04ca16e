import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { BarChart, Users, Settings, Calendar, FileText, Bell, User } from 'lucide-react';
import { montessoriTheme } from './ThemeConfig';
import { useSEO, SEO_CONFIG } from '@/hooks/useSEO';
import BackButton from '@/components/ui/back-button';
import ProgressAnalytics from './ProgressAnalytics';
import { ChildProfileManager } from './ChildProfileManager';
import NotificationSettings from './NotificationSettings';
import GoalCustomization from './GoalCustomization';
import EducatorCommunication from './EducatorCommunication';
import { CalendarScheduling } from './CalendarScheduling';
import { ReportGeneration } from './ReportGeneration';

interface ParentDashboardProps {
  onBack: () => void;
}

const ParentDashboard: React.FC<ParentDashboardProps> = ({ onBack }) => {
  useSEO(SEO_CONFIG.parentDashboard);

  const [activeTab, setActiveTab] = useState<'overview' | 'progress' | 'goals' | 'communication' | 'notifications' | 'calendar' | 'reports' | 'profiles'>('overview');

  const childProgress = {
    name: "Emma",
    age: 4,
    totalActivities: 24,
    completedActivities: 18,
    currentStreak: 7,
    favoriteSkill: "Practical Life Skills",
    weeklyTime: 120,
    achievements: [
      { name: "First Steps in Learning", icon: "🏆", earned: true },
      { name: "Week Learning Warrior", icon: "⭐", earned: true },
      { name: "Montessori Skill Master", icon: "📚", earned: false }
    ]
  };

  const recentActivities = [
    { skill: "Pouring Water Activity", date: "Today", duration: "15 min", completed: true },
    { skill: "Color Matching Exercise", date: "Yesterday", duration: "12 min", completed: true },
    { skill: "Flower Arranging Practice", date: "2 days ago", duration: "20 min", completed: true }
  ];

  const progressPercentage = (childProgress.completedActivities / childProgress.totalActivities) * 100;

  const weeklyGoalMinutes = 150;
  const weeklyPct = Math.min(100, Math.round((childProgress.weeklyTime / weeklyGoalMinutes) * 100));
  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());
  const weekLabel = `${weekStart.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} – ${today.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}`;

  const renderOverview = () => (
    <section aria-label="Child learning overview" className="space-y-6">
      {/* This Week summary */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 via-card to-accent/5">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">This Week · {weekLabel}</p>
              <CardTitle className="text-2xl text-foreground">
                {childProgress.name} did <span className="text-primary">{childProgress.weeklyTime} minutes</span> of focused work
              </CardTitle>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/15 border border-secondary/30 text-sm font-semibold text-secondary">
              🔥 {childProgress.currentStreak}-day streak
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
              <span>Weekly goal · {weeklyGoalMinutes} min</span>
              <span className="font-semibold">{weeklyPct}%</span>
            </div>
            <Progress value={weeklyPct} className="h-2" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 rounded-lg bg-background/60 border border-border/60">
              <div className="text-xl font-bold text-foreground">{recentActivities.length}</div>
              <div className="text-xs text-muted-foreground mt-0.5">Activities</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-background/60 border border-border/60">
              <div className="text-xl font-bold text-foreground">{childProgress.favoriteSkill.split(' ')[0]}</div>
              <div className="text-xs text-muted-foreground mt-0.5">Top area</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-background/60 border border-border/60">
              <div className="text-xl font-bold text-foreground">{childProgress.completedActivities}</div>
              <div className="text-xs text-muted-foreground mt-0.5">Total mastered</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className={`${montessoriTheme.card.base} ${montessoriTheme.card.primary}`}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${montessoriTheme.text.primary}`}>
            <User className="h-5 w-5" aria-hidden="true" />
            {childProgress.name}'s Learning Journey Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4" role="region" aria-label="Learning statistics">
            <div className="text-center">
              <div className={`text-2xl font-bold ${montessoriTheme.text.accent}`} aria-label="Child's age">{childProgress.age}</div>
              <div className={`text-sm ${montessoriTheme.text.muted}`}>Years Old</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${montessoriTheme.text.secondary}`} aria-label="Skills mastered">{childProgress.completedActivities}</div>
              <div className={`text-sm ${montessoriTheme.text.muted}`}>Skills Mastered</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${montessoriTheme.text.secondary}`} aria-label="Learning streak">{childProgress.currentStreak}</div>
              <div className={`text-sm ${montessoriTheme.text.muted}`}>Day Learning Streak</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${montessoriTheme.text.accent}`} aria-label="Weekly learning time">{childProgress.weeklyTime}</div>
              <div className={`text-sm ${montessoriTheme.text.muted}`}>Minutes This Week</div>
            </div>
          </div>
          <div className="mt-4">
            <div className={`flex justify-between text-sm mb-2 ${montessoriTheme.text.muted}`}>
              <span>Overall Progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" aria-label={`Learning progress: ${Math.round(progressPercentage)}% complete`} />
          </div>
        </CardContent>
      </Card>
    </section>
  );

  return (
    <div className={`min-h-screen ${montessoriTheme.backgrounds.parent} p-4`}>
      <div className="max-w-6xl mx-auto">
        <BackButton onClick={onBack} />
        
        <header className="mb-6">
          <h1 className={`text-3xl font-bold ${montessoriTheme.text.primary}`}>
            Family Dashboard
          </h1>
          <p className={montessoriTheme.text.muted}>
            Track and manage children's Montessori learning journey
          </p>
        </header>

        <nav className="flex gap-2 mb-6 flex-wrap" role="navigation" aria-label="Dashboard sections">
          {[
            { key: 'overview', label: 'Overview', icon: '🏠' },
            { key: 'progress', label: 'Analytics', icon: '📊' },
            { key: 'goals', label: 'Goals', icon: '🎯' },
            { key: 'communication', label: 'Educator', icon: '💬' },
            { key: 'calendar', label: 'Calendar', icon: '📅' },
            { key: 'reports', label: 'Reports', icon: '📄' },
            { key: 'profiles', label: 'Profiles', icon: '👤' },
            { key: 'notifications', label: 'Settings', icon: '⚙️' }
          ].map(({ key, label, icon }) => (
            <Button
              key={key}
              onClick={() => setActiveTab(key as any)}
              variant={activeTab === key ? 'default' : 'outline'}
              className="flex items-center gap-2"
              aria-pressed={activeTab === key}
              aria-label={`View ${label} section`}
            >
              <span className="text-sm" aria-hidden="true">{icon}</span>
              {label}
            </Button>
          ))}
        </nav>

        <main role="main">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'progress' && <ProgressAnalytics />}
          {activeTab === 'goals' && <GoalCustomization />}
          {activeTab === 'communication' && <EducatorCommunication />}
          {activeTab === 'calendar' && <CalendarScheduling />}
          {activeTab === 'reports' && <ReportGeneration />}
          {activeTab === 'profiles' && <ChildProfileManager onBack={onBack} />}
          {activeTab === 'notifications' && <NotificationSettings />}
        </main>
      </div>
    </div>
  );
};

export default ParentDashboard;