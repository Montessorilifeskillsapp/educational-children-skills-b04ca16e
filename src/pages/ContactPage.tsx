import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import SEOOptimizer from '@/components/SEOOptimizer';
import { useSEO } from '@/hooks/useSEO';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // SEO optimization
  useSEO({
    title: "Contact Us - Montessori Learning App",
    description: "Get in touch with our team. We're here to help with questions about our Montessori learning app and support your child's development.",
    keywords: "contact us, support, montessori help, customer service, questions",
    canonical: "/contact"
  });

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Opens the visitor's email app with the message addressed to the support inbox.
    const subject = formData.subject || t('pages.contact.defaultSubject');
    const body = `${formData.message}\n\n— ${formData.name} (${formData.email})`;
    const url = `mailto:montessorilifeskills@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    try { (window.top ?? window).location.href = url; } catch { window.location.href = url; }
    toast({
      title: t('pages.contact.toastTitle'),
      description: t('pages.contact.toastBody', { email: 'montessorilifeskills@gmail.com' }),
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <SEOOptimizer>
      <PageLayout title={t('pages.contact.title')} onBack={handleBack}>
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />{t('pages.contact.getInTouch')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">{t('pages.contact.intro')}</p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">{t('pages.contact.email')}</p>
                    <p className="text-sm text-muted-foreground">montessorilifeskills@gmail.com</p>
                  </div>
                </div>
                
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-700">
                  <strong>{t('pages.contact.responseLabel')}</strong> {t('pages.contact.response')}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>{t('pages.contact.sendTitle')}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">{t('pages.contact.name')}</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">{t('pages.contact.email')}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="subject">{t('pages.contact.subject')}</Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="message">{t('pages.contact.message')}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full">{t('pages.contact.send')}</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    </SEOOptimizer>
  );
};

export default ContactPage;