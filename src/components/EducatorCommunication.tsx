import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageCircle, Send, Phone, Video, Calendar, User, Clock, Star } from 'lucide-react';
import { montessoriTheme } from './ThemeConfig';

interface Message {
  id: string;
  sender: 'parent' | 'educator';
  content: string;
  timestamp: string;
  read: boolean;
}

interface Educator {
  id: string;
  name: string;
  title: string;
  avatar: string;
  rating: number;
  specialties: string[];
  availability: string;
}

const EducatorCommunication: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'educator',
      content: 'Emma showed great progress in her pouring activities today! She\'s developing excellent hand-eye coordination.',
      timestamp: '2024-01-15 10:30',
      read: true
    },
    {
      id: '2',
      sender: 'parent',
      content: 'That\'s wonderful to hear! Should we continue with similar activities at home?',
      timestamp: '2024-01-15 14:20',
      read: true
    },
    {
      id: '3',
      sender: 'educator',
      content: 'Absolutely! I\'d recommend the flower arranging activity next. It builds on the same skills while introducing new concepts.',
      timestamp: '2024-01-15 16:45',
      read: false
    }
  ]);

  const [newMessage, setNewMessage] = useState('');

  const educator: Educator = {
    id: '1',
    name: 'Maria Rodriguez',
    title: 'Certified Montessori Guide',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    rating: 4.9,
    specialties: ['Practical Life', 'Sensorial', 'Early Childhood'],
    availability: 'Available Mon-Fri 9AM-5PM'
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        sender: 'parent',
        content: newMessage,
        timestamp: new Date().toISOString(),
        read: true
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="space-y-6">
      {/* Educator Profile */}
      <Card className={`${montessoriTheme.card.base} ${montessoriTheme.card.primary}`}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${montessoriTheme.text.primary}`}>
            <User className="h-5 w-5" />
            Your Child's Educator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={educator.avatar} alt={educator.name} />
              <AvatarFallback>{educator.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className={`font-semibold ${montessoriTheme.text.primary}`}>{educator.name}</h3>
              <p className={`text-sm ${montessoriTheme.text.muted}`}>{educator.title}</p>
              <div className="flex items-center gap-1 mt-1">
                <Star className="h-4 w-4 text-blue-500 fill-current" />
                <span className={`text-sm ${montessoriTheme.text.primary}`}>{educator.rating}</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {educator.specialties.map((specialty, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {specialty}
                  </Badge>
                ))}
              </div>
              <p className={`text-xs ${montessoriTheme.text.muted} mt-2 flex items-center gap-1`}>
                <Clock className="h-3 w-3" />
                {educator.availability}
              </p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                Call
              </Button>
              <Button size="sm" variant="outline" className="flex items-center gap-1">
                <Video className="h-4 w-4" />
                Video
              </Button>
              <Button size="sm" variant="outline" className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Schedule
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Message Thread */}
      <Card className={`${montessoriTheme.card.base} ${montessoriTheme.card.secondary}`}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${montessoriTheme.text.secondary}`}>
            <MessageCircle className="h-5 w-5" />
            Messages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'parent' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === 'parent'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'parent' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="flex gap-2">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message to the educator..."
              className="flex-1 min-h-[60px]"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button 
              onClick={handleSendMessage}
              className={`${montessoriTheme.button.primary} flex items-center gap-2`}
              disabled={!newMessage.trim()}
            >
              <Send className="h-4 w-4" />
              Send
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className={`${montessoriTheme.card.base} ${montessoriTheme.card.accent}`}>
        <CardHeader>
          <CardTitle className={`${montessoriTheme.text.accent}`}>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="flex flex-col items-center gap-2 h-20">
              <Calendar className="h-6 w-6" />
              <span className="text-sm">Schedule Meeting</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center gap-2 h-20">
              <MessageCircle className="h-6 w-6" />
              <span className="text-sm">Ask Question</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center gap-2 h-20">
              <Star className="h-6 w-6" />
              <span className="text-sm">Share Feedback</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Communication Tips */}
      <Card className={`${montessoriTheme.card.base} ${montessoriTheme.card.info}`}>
        <CardHeader>
          <CardTitle className={`${montessoriTheme.text.primary}`}>Communication Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className={`space-y-2 text-sm ${montessoriTheme.text.muted}`}>
            <li>• Share specific observations about your child's activities at home</li>
            <li>• Ask about extending classroom activities to home practice</li>
            <li>• Discuss any concerns or questions about your child's development</li>
            <li>• Request suggestions for age-appropriate activities and materials</li>
            <li>• Schedule regular check-ins to track progress and goals</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default EducatorCommunication;