import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { User, Edit, Save, Plus, Calendar, Award, Target, Star, Trophy, Heart } from 'lucide-react';
import BackButton from './ui/back-button';
interface ChildProfileManagerProps {
  onBack?: () => void;
}

export const ChildProfileManager: React.FC<ChildProfileManagerProps> = ({ onBack }) => {
  const [editMode, setEditMode] = useState(false);
  const [selectedChild, setSelectedChild] = useState('emma');
  const [hoveredGoal, setHoveredGoal] = useState<number | null>(null);

  const children = [
    {
      id: 'emma',
      name: 'Emma Johnson',
      age: 4,
      avatar: '/placeholder.svg',
      interests: ['Art', 'Music', 'Nature'],
      learningStyle: 'Visual',
      goals: [
        { name: 'Letter Recognition', progress: 75, completed: false },
        { name: 'Counting to 20', progress: 60, completed: false },
        { name: 'Fine Motor Skills', progress: 90, completed: true }
      ],
      achievements: 12,
      joinDate: '2024-01-15',
      totalActivities: 45,
      streak: 7
    }
  ];

  const currentChild = children.find(child => child.id === selectedChild) || children[0];

  return (
    <div className="space-y-6">
      {onBack && (
        <BackButton 
          onClick={onBack} 
          label="Back to Dashboard"
        />

      )}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-amber-800 animate-pulse">Child Profile Management</h2>
        <div className="flex gap-2">
          <Select value={selectedChild} onValueChange={setSelectedChild}>
            <SelectTrigger className="w-48 hover:border-amber-400 transition-colors">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {children.map((child) => (
                <SelectItem key={child.id} value={child.id}>
                  {child.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" className="hover:scale-105 transition-transform">
            <Plus className="w-4 h-4 mr-2" />
            Add Child
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-amber-200 hover:shadow-lg hover:scale-105 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-amber-800 flex items-center justify-between">
              Profile Information
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditMode(!editMode)}
                className="hover:bg-amber-100 transition-colors"
              >
                {editMode ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center gap-4">
              <div className="relative group">
                <Avatar className="w-20 h-20 hover:scale-110 transition-transform cursor-pointer">
                  <AvatarImage src={currentChild.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-amber-100 to-amber-200 text-amber-800">
                    {currentChild.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -top-2 -right-2 bg-green-500 w-6 h-6 rounded-full flex items-center justify-center animate-bounce">
                  <Heart className="w-3 h-3 text-white" />
                </div>
              </div>
              {editMode && (
                <Button variant="outline" size="sm" className="hover:bg-amber-50">Change Photo</Button>
              )}
            </div>

            <div className="space-y-3">
              <div className="hover:bg-amber-50 p-2 rounded transition-colors">
                <Label>Full Name</Label>
                {editMode ? (
                  <Input value={currentChild.name} className="focus:border-amber-400" />
                ) : (
                  <p className="text-amber-900 font-medium">{currentChild.name}</p>
                )}
              </div>

              <div className="hover:bg-amber-50 p-2 rounded transition-colors">
                <Label>Age</Label>
                {editMode ? (
                  <Input type="number" value={currentChild.age} className="focus:border-amber-400" />
                ) : (
                  <p className="text-amber-900">{currentChild.age} years old</p>
                )}
              </div>

              <div className="hover:bg-amber-50 p-2 rounded transition-colors">
                <Label>Learning Style</Label>
                <Badge variant="secondary" className="bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 hover:scale-105 transition-transform cursor-pointer">
                  {currentChild.learningStyle}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-200 hover:shadow-lg hover:scale-105 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-amber-800">Stats & Achievements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-gradient-to-br from-green-100 to-green-200 rounded-lg hover:scale-105 transition-transform cursor-pointer">
                <Trophy className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-800">{currentChild.achievements}</p>
                <p className="text-sm text-green-700">Achievements</p>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg hover:scale-105 transition-transform cursor-pointer">
                <Star className="w-8 h-8 text-blue-300 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-400">{currentChild.totalActivities}</p>
                <p className="text-sm text-blue-400">Activities</p>
              </div>
            </div>

            <div className="p-3 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg hover:scale-105 transition-transform">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center animate-pulse">
                  🔥
                </div>
                <span className="font-medium text-primary">Learning Streak</span>
              </div>
              <p className="text-2xl font-bold text-primary">{currentChild.streak} days</p>
            </div>

            <div className="space-y-2">
              <Label>Interests</Label>
              <div className="flex flex-wrap gap-2">
                {currentChild.interests.map((interest, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                     className="bg-gradient-to-r from-blue-50 to-primary/20 text-blue-400 hover:scale-110 transition-transform cursor-pointer animate-pulse"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-200 hover:shadow-lg hover:scale-105 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-amber-800">Learning Goals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {currentChild.goals.map((goal, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-lg transition-all duration-300 cursor-pointer ${
                    hoveredGoal === index ? 'bg-amber-100 scale-105' : 'bg-amber-50'
                  }`}
                  onMouseEnter={() => setHoveredGoal(index)}
                  onMouseLeave={() => setHoveredGoal(null)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Target className={`w-4 h-4 ${goal.completed ? 'text-green-600' : 'text-amber-600'}`} />
                      <span className="text-amber-900 text-sm font-medium">{goal.name}</span>
                    </div>
                    {goal.completed && (
                      <Trophy className="w-4 h-4 text-green-600 animate-bounce" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <Progress 
                      value={goal.progress} 
                      className="h-2"
                    />
                    <p className="text-xs text-amber-700 text-right">{goal.progress}% complete</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-amber-200">
              <Button className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 transform hover:scale-105 transition-all">
                <Target className="w-4 h-4 mr-2" />
                View Detailed Progress
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChildProfileManager;