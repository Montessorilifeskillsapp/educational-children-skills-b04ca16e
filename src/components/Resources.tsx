import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Video, Download, ExternalLink, FileText, Users } from 'lucide-react';
import { montessoriTheme } from './ThemeConfig';
import { useSEO, SEO_CONFIG } from '@/hooks/useSEO';
import BackButton from '@/components/ui/back-button';

interface ResourcesProps {
  onBack?: () => void;
}
const Resources: React.FC<ResourcesProps> = ({ onBack }) => {
  useSEO(SEO_CONFIG.resources);

  const handleDownload = (resource: any) => {
    // Download initiated
    
    // Create content
    const content = `${resource.title}

Description: ${resource.description}
Type: ${resource.type}
Category: ${resource.category}
Size: ${resource.size}

This is a sample Montessori educational resource.

Generated on: ${new Date().toLocaleDateString()}
`;

    // Method 1: Try data URL approach
    try {
      const dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(content);
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", `${resource.title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`);
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
      
      // Download successful
      alert('Download started! Check your downloads folder.');
      return;
    } catch (error) {
      console.error('Data URL method failed:', error);
    }

    // Method 2: Fallback to blob
    try {
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${resource.title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      // Download successful
      alert('Download started! Check your downloads folder.');

    } catch (error) {
      console.error('Both download methods failed:', error);
      alert('Download failed. Your browser may be blocking downloads. Please check your browser settings.');
    }
  };

  const handleExternalLink = (url: string) => {
    window.open(url, '_blank');
  };
  const resources = [
    {
      id: 1,
      title: "Montessori Method Guide",
      description: "Complete guide to understanding and implementing Montessori principles at home",
      type: "PDF Guide",
      category: "Educational",
      downloadUrl: "#",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
      icon: "📄",
      size: "2.5 MB"
    },
    {
      id: 2,
      title: "Practical Life Activities Checklist",
      description: "Age-appropriate practical life skills checklist for children 2-6 years",
      type: "Printable",
      category: "Practical Life",
      downloadUrl: "#",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop",
      icon: "📋",
      size: "1.2 MB"
    },
    {
      id: 3,
      title: "Montessori Materials DIY Guide",
      description: "Create authentic Montessori materials at home with step-by-step instructions",
      type: "PDF Guide",
      category: "Materials",
      downloadUrl: "#",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop",
      icon: "🔨",
      size: "4.1 MB"
    },
    {
      id: 4,
      title: "Prepared Environment Setup",
      description: "Guidelines for creating a Montessori-prepared environment in your home",
      type: "Video Tutorial",
      category: "Environment",
      downloadUrl: "#",
      image: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400&h=300&fit=crop",
      icon: "🏠",
      size: "25 min"
    },
    {
      id: 5,
      title: "Montessori Philosophy Handbook",
      description: "Deep dive into Maria Montessori's educational philosophy and methods",
      type: "eBook",
      category: "Philosophy",
      downloadUrl: "#",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
      icon: "📚",
      size: "3.8 MB"
    },
    {
      id: 6,
      title: "Grace & Courtesy Activities",
      description: "Essential grace and courtesy lessons for developing social skills",
      type: "Activity Pack",
      category: "Social Skills",
      downloadUrl: "#",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      icon: "🤝",
      size: "2.3 MB"
    },
    {
      id: 7,
      title: "Montessori Math Materials",
      description: "Complete guide to Montessori mathematics materials and presentations",
      type: "PDF Guide",
      category: "Mathematics",
      downloadUrl: "#",
      image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=300&fit=crop",
      icon: "🔢",
      size: "5.2 MB"
    },
    {
      id: 8,
      title: "Sensorial Education Guide",
      description: "Comprehensive guide to Montessori sensorial materials and activities",
      type: "Interactive Guide",
      category: "Sensorial",
      downloadUrl: "#",
      image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop",
      icon: "👁️",
      size: "3.5 MB"
    },
    {
      id: 9,
      title: "Language Development Cards",
      description: "Montessori three-part cards for vocabulary building and reading readiness",
      type: "Printable Cards",
      category: "Language",
      downloadUrl: "#",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop",
      icon: "🔤",
      size: "2.8 MB"
    },
    {
      id: 10,
      title: "Cosmic Education Timeline",
      description: "Visual timeline of the universe for elementary Montessori cosmic education",
      type: "Large Format Print",
      category: "Cosmic Education",
      downloadUrl: "#",
      image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop",
      icon: "🌌",
      size: "6.5 MB"
    },
    {
      id: 11,
      title: "Montessori Observation Forms",
      description: "Professional observation sheets for tracking child development and progress",
      type: "Forms Pack",
      category: "Assessment",
      downloadUrl: "#",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop",
      icon: "📊",
      size: "1.5 MB"
    },
    {
      id: 12,
      title: "Cultural Studies Activities",
      description: "Geography, history, and science activities for elementary students",
      type: "Activity Bundle",
      category: "Cultural Studies",
      downloadUrl: "#",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      icon: "🌍",
      size: "4.7 MB"
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      Educational: "bg-blue-100 text-blue-800",
      "Practical Life": "bg-green-100 text-green-800",
      Environment: "bg-purple-100 text-purple-800",
      Mathematics: "bg-orange-100 text-orange-800",
      Language: "bg-pink-100 text-pink-800",
      Sensorial: "bg-indigo-100 text-indigo-800",
      Materials: "bg-yellow-100 text-yellow-800",
      Philosophy: "bg-red-100 text-red-800",
      "Social Skills": "bg-teal-100 text-teal-800",
      "Cosmic Education": "bg-violet-100 text-violet-800",
      Assessment: "bg-emerald-100 text-emerald-800",
      "Cultural Studies": "bg-amber-100 text-amber-800"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-6xl mx-auto">
        {onBack && <BackButton onClick={onBack} />}
        
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Learning Resources</h1>
          <p className="text-gray-600 mt-2">Downloadable guides, activities, and educational materials</p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <Card key={resource.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={resource.image}
                  alt={resource.title}
                  className="w-full h-48 object-cover"
                />
                <Badge className={`absolute top-3 right-3 ${getCategoryColor(resource.category)}`}>
                  {resource.category}
                </Badge>
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {resource.description}
                    </CardDescription>
                  </div>
                  <span className="text-lg ml-2 flex-shrink-0">{resource.icon}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-600">{resource.type}</span>
                  <span className="text-sm text-gray-500">{resource.size}</span>
                </div>
                <Button 
                  className="w-full" 
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDownload(resource);
                  }}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Resource
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
              onClick={() => handleExternalLink('https://montessori.org')}
            >
              <ExternalLink className="w-5 h-5 text-blue-600" />
              <div>
                <h3 className="font-medium">Montessori Foundation</h3>
                <p className="text-sm text-gray-600">Official Montessori educational resources</p>
              </div>
            </div>
            <div 
              className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
              onClick={() => handleExternalLink('https://montessori-community.com')}
            >
              <ExternalLink className="w-5 h-5 text-blue-600" />
              <div>
                <h3 className="font-medium">Parent & Teacher Community</h3>
                <p className="text-sm text-gray-600">Connect with Montessori parents and educators</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;