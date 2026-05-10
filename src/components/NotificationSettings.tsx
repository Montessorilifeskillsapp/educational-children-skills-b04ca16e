import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, Mail, Smartphone, Clock, Trophy, BookOpen, AlertCircle } from 'lucide-react';
import { montessoriTheme } from './ThemeConfig';

const NotificationSettings: React.FC = () => {
  const [notifications, setNotifications] = useState({
    dailyReminders: true,
    progressUpdates: true,
    achievements: true,
    weeklyReports: true,
    activitySuggestions: false,
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false
  });

  const [reminderTime, setReminderTime] = useState('09:00');
  const [reportDay, setReportDay] = useState('sunday');

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Notification Preferences */}
      <Card className={`${montessoriTheme.card.base} ${montessoriTheme.card.primary}`}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${montessoriTheme.text.primary}`}>
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-blue-500" />
              <div>
                <Label className={montessoriTheme.text.primary}>Daily Learning Reminders</Label>
                <p className={`text-sm ${montessoriTheme.text.muted}`}>Get reminded about daily activities</p>
              </div>
            </div>
            <Switch
              checked={notifications.dailyReminders}
              onCheckedChange={(value) => handleNotificationChange('dailyReminders', value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-green-500" />
              <div>
                <Label className={montessoriTheme.text.primary}>Progress Updates</Label>
                <p className={`text-sm ${montessoriTheme.text.muted}`}>Weekly progress summaries</p>
              </div>
            </div>
            <Switch
              checked={notifications.progressUpdates}
              onCheckedChange={(value) => handleNotificationChange('progressUpdates', value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trophy className="h-5 w-5 text-blue-500" />
              <div>
                <Label className={montessoriTheme.text.primary}>Achievement Alerts</Label>
                <p className={`text-sm ${montessoriTheme.text.muted}`}>Celebrate milestones instantly</p>
              </div>
            </div>
            <Switch
              checked={notifications.achievements}
              onCheckedChange={(value) => handleNotificationChange('achievements', value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-primary0" />
              <div>
                <Label className={montessoriTheme.text.primary}>Activity Suggestions</Label>
                <p className={`text-sm ${montessoriTheme.text.muted}`}>Personalized activity recommendations</p>
              </div>
            </div>
            <Switch
              checked={notifications.activitySuggestions}
              onCheckedChange={(value) => handleNotificationChange('activitySuggestions', value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Delivery Methods */}
      <Card className={`${montessoriTheme.card.base} ${montessoriTheme.card.secondary}`}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${montessoriTheme.text.secondary}`}>
            <Mail className="h-5 w-5" />
            Delivery Methods
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-blue-500" />
              <Label className={montessoriTheme.text.primary}>Email Notifications</Label>
            </div>
            <Switch
              checked={notifications.emailNotifications}
              onCheckedChange={(value) => handleNotificationChange('emailNotifications', value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone className="h-5 w-5 text-green-500" />
              <Label className={montessoriTheme.text.primary}>Push Notifications</Label>
            </div>
            <Switch
              checked={notifications.pushNotifications}
              onCheckedChange={(value) => handleNotificationChange('pushNotifications', value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Timing Settings */}
      <Card className={`${montessoriTheme.card.base} ${montessoriTheme.card.accent}`}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${montessoriTheme.text.accent}`}>
            <Clock className="h-5 w-5" />
            Timing Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className={montessoriTheme.text.primary}>Daily Reminder Time</Label>
            <Select value={reminderTime} onValueChange={setReminderTime}>
              <SelectTrigger className="w-full mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="07:00">7:00 AM</SelectItem>
                <SelectItem value="08:00">8:00 AM</SelectItem>
                <SelectItem value="09:00">9:00 AM</SelectItem>
                <SelectItem value="10:00">10:00 AM</SelectItem>
                <SelectItem value="18:00">6:00 PM</SelectItem>
                <SelectItem value="19:00">7:00 PM</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className={montessoriTheme.text.primary}>Weekly Report Day</Label>
            <Select value={reportDay} onValueChange={setReportDay}>
              <SelectTrigger className="w-full mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sunday">Sunday</SelectItem>
                <SelectItem value="monday">Monday</SelectItem>
                <SelectItem value="friday">Friday</SelectItem>
                <SelectItem value="saturday">Saturday</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Button className={montessoriTheme.button.primary}>
        Save Notification Settings
      </Button>
    </div>
  );
};

export default NotificationSettings;