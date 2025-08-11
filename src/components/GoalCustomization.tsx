import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Target, Plus, Edit, Trash2, Calendar, Star } from 'lucide-react';
import { montessoriTheme } from './ThemeConfig';

interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  targetDate: string;
  progress: number;
  priority: 'low' | 'medium' | 'high';
}

const GoalCustomization: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Master Pouring Activities',
      description: 'Complete all water pouring exercises with confidence',
      category: 'practical-life',
      targetDate: '2024-02-15',
      progress: 75,
      priority: 'high'
    },
    {
      id: '2',
      title: 'Color Recognition Mastery',
      description: 'Identify and name all primary and secondary colors',
      category: 'sensorial',
      targetDate: '2024-02-28',
      progress: 60,
      priority: 'medium'
    }
  ]);

  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: '',
    targetDate: '',
    priority: 'medium' as 'low' | 'medium' | 'high'
  });

  const [showAddForm, setShowAddForm] = useState(false);

  const categories = [
    { value: 'practical-life', label: 'Practical Life Skills' },
    { value: 'sensorial', label: 'Sensorial Activities' },
    { value: 'language', label: 'Language Development' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'cultural', label: 'Cultural Studies' }
  ];

  const priorityColors = {
    low: 'text-green-600 bg-green-100',
    medium: 'text-blue-600 bg-blue-100',
    high: 'text-red-600 bg-red-100'
  };

  const handleAddGoal = () => {
    if (newGoal.title && newGoal.category && newGoal.targetDate) {
      const goal: Goal = {
        id: Date.now().toString(),
        ...newGoal,
        progress: 0
      };
      setGoals([...goals, goal]);
      setNewGoal({
        title: '',
        description: '',
        category: '',
        targetDate: '',
        priority: 'medium'
      });
      setShowAddForm(false);
    }
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const updateGoalProgress = (id: string, progress: number) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, progress } : goal
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className={`${montessoriTheme.card.base} ${montessoriTheme.card.primary}`}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${montessoriTheme.text.primary}`}>
            <Target className="h-5 w-5" />
            Learning Goals Customization
          </CardTitle>
          <p className={`text-sm ${montessoriTheme.text.muted}`}>
            Set and track personalized learning objectives for your child
          </p>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={() => setShowAddForm(!showAddForm)}
            className={`${montessoriTheme.button.primary} flex items-center gap-2`}
          >
            <Plus className="h-4 w-4" />
            Add New Goal
          </Button>
        </CardContent>
      </Card>

      {/* Add Goal Form */}
      {showAddForm && (
        <Card className={`${montessoriTheme.card.base} ${montessoriTheme.card.secondary}`}>
          <CardHeader>
            <CardTitle className={`${montessoriTheme.text.secondary}`}>Create New Learning Goal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className={montessoriTheme.text.primary}>Goal Title</Label>
              <Input
                value={newGoal.title}
                onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                placeholder="Enter goal title"
                className="mt-2"
              />
            </div>

            <div>
              <Label className={montessoriTheme.text.primary}>Description</Label>
              <Textarea
                value={newGoal.description}
                onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                placeholder="Describe the learning objective"
                className="mt-2"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className={montessoriTheme.text.primary}>Category</Label>
                <Select value={newGoal.category} onValueChange={(value) => setNewGoal({...newGoal, category: value})}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className={montessoriTheme.text.primary}>Target Date</Label>
                <Input
                  type="date"
                  value={newGoal.targetDate}
                  onChange={(e) => setNewGoal({...newGoal, targetDate: e.target.value})}
                  className="mt-2"
                />
              </div>

              <div>
                <Label className={montessoriTheme.text.primary}>Priority</Label>
                <Select value={newGoal.priority} onValueChange={(value: 'low' | 'medium' | 'high') => setNewGoal({...newGoal, priority: value})}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleAddGoal} className={montessoriTheme.button.primary}>
                Create Goal
              </Button>
              <Button onClick={() => setShowAddForm(false)} variant="outline">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Goals List */}
      <div className="space-y-4">
        {goals.map((goal) => (
          <Card key={goal.id} className={`${montessoriTheme.card.base} ${montessoriTheme.card.accent}`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className={`font-semibold ${montessoriTheme.text.primary}`}>{goal.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[goal.priority]}`}>
                      {goal.priority} priority
                    </span>
                  </div>
                  <p className={`text-sm ${montessoriTheme.text.muted} mb-2`}>{goal.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className={`flex items-center gap-1 ${montessoriTheme.text.muted}`}>
                      <Calendar className="h-4 w-4" />
                      Target: {new Date(goal.targetDate).toLocaleDateString()}
                    </span>
                    <span className={montessoriTheme.text.secondary}>
                      {categories.find(c => c.value === goal.category)?.label}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDeleteGoal(goal.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className={montessoriTheme.text.muted}>Progress</span>
                  <span className={montessoriTheme.text.primary}>{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
                <div className="flex gap-2 mt-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => updateGoalProgress(goal.id, Math.min(100, goal.progress + 10))}
                  >
                    +10%
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => updateGoalProgress(goal.id, Math.max(0, goal.progress - 10))}
                  >
                    -10%
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GoalCustomization;