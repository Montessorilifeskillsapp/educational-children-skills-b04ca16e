import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Mail, RefreshCw, XCircle, CheckCircle } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';

const GuaranteePage: React.FC = () => {
  useSEO({
    title: '30-Day Money-Back Guarantee | Montessori Life Skills',
    description: 'Try Montessori Life Skills risk-free for 30 days. Full refund if it isn\'t the right fit for your family. No questions asked.',
    canonical: 'https://montessorilifeskillsapp.com/guarantee',
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Link to="/" className="text-sm text-muted-foreground hover:text-primary">← Back to home</Link>

        <div className="mt-6 inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-semibold text-emerald-700">
          <ShieldCheck className="w-4 h-4" /> Risk-free promise
        </div>

        <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-4">
          The 30-day, no-questions-asked guarantee.
        </h1>
        <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
          We built this app because we believe every child deserves authentic Montessori at home.
          If it isn't the right fit for your family, you shouldn't pay a cent.
        </p>

        <section className="space-y-5 mb-12">
          {[
            { icon: CheckCircle, title: 'Full refund within 30 days', body: 'Email us within 30 days of any paid purchase and we will refund 100% — no follow-up survey, no retention call.' },
            { icon: RefreshCw, title: 'Cancel anytime, no lock-in', body: 'Cancel from your account in two clicks. Your access continues until the end of your billing period.' },
            { icon: XCircle, title: 'No credit card for the free tier', body: 'The free Explorer tier — one starter activity per learning area + the Week 1 path — never asks for a card.' },
            { icon: Mail, title: 'A real person reads every email', body: 'Refund requests go directly to the founder, an AMI-trained 3–6 Primary Guide. Most replies within 24 hours.' },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex gap-4 p-5 rounded-2xl border border-border bg-card">
              <div className="shrink-0 w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                <Icon className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground mb-1">{title}</h2>
                <p className="text-foreground/80 leading-relaxed text-sm">{body}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="rounded-2xl bg-muted/40 border border-border p-6">
          <h2 className="font-semibold text-foreground mb-2">How to request a refund</h2>
          <p className="text-foreground/80 text-sm leading-relaxed">
            Email <a href="mailto:hello@montessorilifeskillsapp.com" className="text-primary underline">hello@montessorilifeskillsapp.com</a> with
            the email address on your account and the word "refund" in the subject line. We process requests within two business days.
          </p>
        </section>
      </div>
    </div>
  );
};

export default GuaranteePage;
