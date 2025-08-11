import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { FileText, Download, Mail, Calendar, TrendingUp, Award, Clock } from 'lucide-react';
import { Badge } from './ui/badge';

export const ReportGeneration = () => {
  const [reportType, setReportType] = useState('');
  const [timeRange, setTimeRange] = useState('');
  const [selectedSections, setSelectedSections] = useState<string[]>([]);

  const reportTypes = [
    { value: 'progress', label: 'Progress Report', icon: '📈' },
    { value: 'skills', label: 'Skills Assessment', icon: '🏆' },
    { value: 'activity', label: 'Activity Summary', icon: '⏰' },
    { value: 'comprehensive', label: 'Comprehensive Report', icon: '📄' }
  ];

  const reportSections = [
    { id: 'overview', label: 'Learning Overview' },
    { id: 'skills', label: 'Skill Development' },
    { id: 'activities', label: 'Completed Activities' },
    { id: 'goals', label: 'Goal Progress' },
    { id: 'recommendations', label: 'Educator Recommendations' },
    { id: 'milestones', label: 'Achieved Milestones' }
  ];

  const recentReports = [
    { id: 1, name: 'November Progress Report', date: '2024-12-01', type: 'Progress', status: 'Ready' },
    { id: 2, name: 'Skills Assessment Q4', date: '2024-11-28', type: 'Skills', status: 'Ready' },
    { id: 3, name: 'Monthly Activity Summary', date: '2024-11-25', type: 'Activity', status: 'Generating' }
  ];

  const handleSectionToggle = (sectionId: string) => {
    setSelectedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-amber-800">Report Generation</h2>
        <Badge variant="secondary" className="bg-amber-100 text-amber-800">
          <FileText className="w-4 h-4 mr-1" />
          {recentReports.length} Reports Available
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-amber-200">
          <CardHeader>
            <CardTitle className="text-amber-800">Generate New Report</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Report Type</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                   {reportTypes.map((type) => (
                     <SelectItem key={type.value} value={type.value}>
                       <div className="flex items-center gap-2">
                         <span className="text-sm">{type.icon}</span>
                         {type.label}
                       </div>
                     </SelectItem>
                   ))}

                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Time Range</Label>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Last Week</SelectItem>
                  <SelectItem value="month">Last Month</SelectItem>
                  <SelectItem value="quarter">Last Quarter</SelectItem>
                  <SelectItem value="year">Last Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-base font-medium">Include Sections</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {reportSections.map((section) => (
                  <div key={section.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={section.id}
                      checked={selectedSections.includes(section.id)}
                      onCheckedChange={() => handleSectionToggle(section.id)}
                    />
                    <Label htmlFor={section.id} className="text-sm">{section.label}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button className="bg-amber-600 hover:bg-amber-700 flex-1">
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
              <Button variant="outline">
                <Mail className="w-4 h-4 mr-2" />
                Email Report
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-200">
          <CardHeader>
            <CardTitle className="text-amber-800">Recent Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                  <div>
                    <p className="font-medium text-amber-900">{report.name}</p>
                    <p className="text-sm text-amber-700">{report.type} • {report.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={report.status === 'Ready' ? 'default' : 'secondary'}>
                      {report.status}
                    </Badge>
                    {report.status === 'Ready' && (
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-amber-200">
        <CardHeader>
          <CardTitle className="text-amber-800">Report Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <TrendingUp className="w-8 h-8 text-amber-600" />
              <span className="font-medium">Weekly Progress</span>
              <span className="text-sm text-gray-600">Quick overview of weekly activities</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Award className="w-8 h-8 text-amber-600" />
              <span className="font-medium">Milestone Report</span>
              <span className="text-sm text-gray-600">Achievements and milestones</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Calendar className="w-8 h-8 text-amber-600" />
              <span className="font-medium">Monthly Summary</span>
              <span className="text-sm text-gray-600">Comprehensive monthly review</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};