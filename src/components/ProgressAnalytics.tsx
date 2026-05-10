import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, Calendar, Target, Award, Clock } from 'lucide-react';
import { montessoriTheme } from './ThemeConfig';

const ProgressAnalytics: React.FC = () => {
  const weeklyData = [
    { day: 'Mon', activities: 3, time: 25 },
    { day: 'Tue', activities: 4, time: 32 },
    { day: 'Wed', activities: 2, time: 18 },
    { day: 'Thu', activities: 5, time: 40 },
    { day: 'Fri', activities: 3, time: 28 },
    { day: 'Sat', activities: 4, time: 35 },
    { day: 'Sun', activities: 2, time: 15 }
  ];

  const skillProgress = [
    { skill: 'Practical Life', progress: 85, level: 'Advanced' },
    { skill: 'Sensorial', progress: 72, level: 'Intermediate' },
    { skill: 'Language', progress: 68, level: 'Intermediate' },
    { skill: 'Mathematics', progress: 45, level: 'Beginner' },
    { skill: 'Cultural', progress: 38, level: 'Beginner' }
  ];

  const maxActivities = Math.max(...weeklyData.map(d => d.activities));

  return (
    <div className="space-y-6">
      {/* Weekly Activity Chart */}
      <Card className={`${montessoriTheme.card.base} ${montessoriTheme.card.primary}`}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${montessoriTheme.text.primary}`}>
            <BarChart3 className="h-5 w-5" />
            Weekly Learning Activity Pattern
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weeklyData.map((day, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-12 text-sm font-medium">{day.day}</div>
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span>{day.activities} activities</span>
                    <span>{day.time} min</span>
                  </div>
                  <Progress 
                    value={(day.activities / maxActivities) * 100} 
                    className="h-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Skill Area Progress */}
      <Card className={`${montessoriTheme.card.base} ${montessoriTheme.card.secondary}`}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${montessoriTheme.text.secondary}`}>
            <Target className="h-5 w-5" />
            Montessori Skill Area Development
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {skillProgress.map((skill, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{skill.skill}</span>
                <Badge variant={skill.level === 'Advanced' ? 'default' : 'secondary'}>
                  {skill.level}
                </Badge>
              </div>
              <Progress value={skill.progress} className="h-2" />
              <div className="text-xs text-gray-600">{skill.progress}% mastered</div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Learning Goals */}
      <Card className={`${montessoriTheme.card.base} ${montessoriTheme.card.accent}`}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${montessoriTheme.text.accent}`}>
            <Award className="h-5 w-5" />
            Monthly Learning Goals
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
            <span>Complete 20 Practical Life activities</span>
            <Badge variant="default">18/20</Badge>
          </div>
          <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
            <span>Master 5 new sensorial skills</span>
            <Badge variant="secondary">3/5</Badge>
          </div>
          <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg">
            <span>Read 10 story books together</span>
            <Badge variant="default">12/10</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressAnalytics;