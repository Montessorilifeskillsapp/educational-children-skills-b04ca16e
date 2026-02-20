import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { printableStepsMap } from '@/data/printableSteps';
import { stepImages } from '@/assets/printables/steps';

interface PrintableDetailProps {
  printableId: string;
  title: string;
  icon: string;
  onBack: () => void;
}

const PrintableDetail: React.FC<PrintableDetailProps> = ({ printableId, title, icon, onBack }) => {
  const steps = printableStepsMap[printableId] || [];
  const images = stepImages[printableId] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/30 to-accent/20 p-4">
      <div className="max-w-3xl mx-auto">
        <Button variant="ghost" onClick={onBack} className="mb-4 gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Printables
        </Button>

        <header className="mb-8">
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <span className="text-3xl">{icon}</span>
            {title}
          </h1>
          <p className="text-muted-foreground mt-1">Step-by-step instructions</p>
        </header>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={step.step} className="bg-background rounded-xl overflow-hidden shadow-sm border border-border/50">
              {images[index] && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={images[index]}
                    alt={step.title}
                    className="w-full h-full object-cover"
                    loading={index < 2 ? 'eager' : 'lazy'}
                  />
                </div>
              )}
              <div className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
                    {step.step}
                  </span>
                  <h2 className="text-lg font-semibold text-foreground">{step.title}</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed ml-11">{step.instruction}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrintableDetail;
