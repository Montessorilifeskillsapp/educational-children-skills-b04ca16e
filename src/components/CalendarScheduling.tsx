import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar, Clock, Plus, Video, MessageCircle, BookOpen } from 'lucide-react';
import { Badge } from './ui/badge';

export const CalendarScheduling = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showAddEvent, setShowAddEvent] = useState(false);

  const upcomingEvents = [
    { id: 1, title: 'Math Session with Ms. Sarah', date: '2024-01-15', time: '10:00 AM', type: 'lesson', educator: 'Ms. Sarah' },
    { id: 2, title: 'Progress Review Meeting', date: '2024-01-16', time: '2:00 PM', type: 'meeting', educator: 'Ms. Emily' },
    { id: 3, title: 'Art Activity Session', date: '2024-01-18', time: '11:00 AM', type: 'activity', educator: 'Ms. Lisa' }
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'lesson': return '📚';
      case 'meeting': return '📹';
      case 'activity': return '💬';
      default: return '📅';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-amber-800">Calendar & Scheduling</h2>
        <Button onClick={() => setShowAddEvent(!showAddEvent)} className="bg-amber-600 hover:bg-amber-700">
          <Plus className="w-4 h-4 mr-2" />
          Schedule Event
        </Button>
      </div>

      {showAddEvent && (
        <Card className="border-amber-200">
          <CardHeader>
            <CardTitle className="text-amber-800">Schedule New Event</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Event Title</Label>
                <Input placeholder="Enter event title" />
              </div>
              <div>
                <Label>Event Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lesson">Lesson</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="activity">Activity</SelectItem>
                    <SelectItem value="assessment">Assessment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Date</Label>
                <Input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
              </div>
              <div>
                <Label>Time</Label>
                <Input type="time" />
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="bg-amber-600 hover:bg-amber-700">Schedule Event</Button>
              <Button variant="outline" onClick={() => setShowAddEvent(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-amber-200">
          <CardHeader>
            <CardTitle className="text-amber-800 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {getEventIcon(event.type)}
                    <div>
                      <p className="font-medium text-amber-900">{event.title}</p>
                      <p className="text-sm text-amber-700">with {event.educator}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-amber-800">{event.date}</p>
                    <p className="text-sm text-amber-600">{event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-200">
          <CardHeader>
            <CardTitle className="text-amber-800 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-amber-100 text-amber-800 hover:bg-amber-200">
              <Video className="w-4 h-4 mr-2" />
              Schedule Parent-Teacher Conference
            </Button>
            <Button className="w-full justify-start bg-amber-100 text-amber-800 hover:bg-amber-200">
              <BookOpen className="w-4 h-4 mr-2" />
              Book Assessment Session
            </Button>
            <Button className="w-full justify-start bg-amber-100 text-amber-800 hover:bg-amber-200">
              <MessageCircle className="w-4 h-4 mr-2" />
              Request Educator Meeting
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};