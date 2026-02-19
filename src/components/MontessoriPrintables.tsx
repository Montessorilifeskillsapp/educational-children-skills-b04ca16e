import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Printer, Lock } from 'lucide-react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import BackButton from '@/components/ui/back-button';

interface Printable {
  id: string;
  title: string;
  description: string;
  category: string;
  ageRange: string;
  pages: number;
  isPremium: boolean;
  icon: string;
}

const printables: Printable[] = [
  {
    id: 'pouring-practice',
    title: 'Pouring Practice Lines',
    description: 'Tracing lines to build hand control before real pouring activities',
    category: 'Practical Life',
    ageRange: '2–4',
    pages: 3,
    isPremium: false,
    icon: '🫗',
  },
  {
    id: 'cutting-strips',
    title: 'Cutting Strips',
    description: 'Progressively thicker lines for scissor practice — straight, zigzag, and curves',
    category: 'Practical Life',
    ageRange: '2.5–5',
    pages: 4,
    isPremium: false,
    icon: '✂️',
  },
  {
    id: 'spooning-sorting',
    title: 'Spooning & Sorting Mat',
    description: 'Printable sorting mat with labeled bowls for dry-transfer spooning work',
    category: 'Practical Life',
    ageRange: '2–4',
    pages: 2,
    isPremium: false,
    icon: '🥄',
  },
  {
    id: 'sandpaper-letters',
    title: 'Sandpaper Letter Templates',
    description: 'Lowercase letter outlines for tracing on sandpaper or textured paper',
    category: 'Language',
    ageRange: '3–5',
    pages: 26,
    isPremium: true,
    icon: '🔤',
  },
  {
    id: 'number-rods',
    title: 'Number Rods Worksheet',
    description: 'Color-coded rod matching and counting exercises (1–10)',
    category: 'Math',
    ageRange: '3–5',
    pages: 4,
    isPremium: true,
    icon: '🔢',
  },
  {
    id: 'pink-tower-patterns',
    title: 'Pink Tower Pattern Cards',
    description: 'Pattern cards showing different ways to stack and arrange the pink tower',
    category: 'Sensorial',
    ageRange: '2.5–5',
    pages: 6,
    isPremium: true,
    icon: '🏗️',
  },
  {
    id: 'continent-coloring',
    title: 'Continent Coloring Maps',
    description: 'Montessori-colored continent maps for coloring and labeling',
    category: 'Geography',
    ageRange: '3–6',
    pages: 7,
    isPremium: true,
    icon: '🌍',
  },
  {
    id: 'grace-courtesy-cards',
    title: 'Grace & Courtesy Scenario Cards',
    description: 'Illustrated cards showing polite greetings, table manners, and turn-taking',
    category: 'Grace & Courtesy',
    ageRange: '2.5–6',
    pages: 12,
    isPremium: true,
    icon: '🤝',
  },
  {
    id: 'leaf-shapes',
    title: 'Botany Leaf Shape Cards',
    description: 'Three-part cards for common leaf shapes — identify, match, and label',
    category: 'Botany',
    ageRange: '3–6',
    pages: 8,
    isPremium: true,
    icon: '🍃',
  },
];

interface MontessoriPrintablesProps {
  onBack?: () => void;
}

const MontessoriPrintables: React.FC<MontessoriPrintablesProps> = ({ onBack }) => {
  const { isPremium } = useSubscription();

  const categoryColors: Record<string, string> = {
    'Practical Life': 'bg-green-100 text-green-800',
    Language: 'bg-pink-100 text-pink-800',
    Math: 'bg-orange-100 text-orange-800',
    Sensorial: 'bg-indigo-100 text-indigo-800',
    Geography: 'bg-blue-100 text-blue-800',
    'Grace & Courtesy': 'bg-purple-100 text-purple-800',
    Botany: 'bg-emerald-100 text-emerald-800',
  };

  const handleDownload = (printable: Printable) => {
    const content = `${printable.title}\n\nDescription: ${printable.description}\nCategory: ${printable.category}\nAge Range: ${printable.ageRange}\nPages: ${printable.pages}\n\nThis is a sample Montessori printable activity sheet.\nPrint this page and follow the instructions for the activity.\n\nGenerated on: ${new Date().toLocaleDateString()}`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${printable.title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const freePrintables = printables.filter((p) => !p.isPremium);
  const premiumPrintables = printables.filter((p) => p.isPremium);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-4">
      <div className="max-w-5xl mx-auto">
        {onBack && <BackButton onClick={onBack} />}

        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Printer className="h-8 w-8 text-amber-600" />
            Montessori Printables
          </h1>
          <p className="text-muted-foreground mt-2">
            Print-at-home activity sheets aligned to the AMI curriculum
          </p>
        </header>

        {/* Free printables */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-4">Free Printables</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {freePrintables.map((p) => (
              <PrintableCard
                key={p.id}
                printable={p}
                locked={false}
                categoryColor={categoryColors[p.category]}
                onDownload={() => handleDownload(p)}
              />
            ))}
          </div>
        </section>

        {/* Premium printables */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Premium Printables</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {premiumPrintables.map((p) => (
              <PrintableCard
                key={p.id}
                printable={p}
                locked={!isPremium}
                categoryColor={categoryColors[p.category]}
                onDownload={() => handleDownload(p)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

interface PrintableCardProps {
  printable: Printable;
  locked: boolean;
  categoryColor?: string;
  onDownload: () => void;
}

const PrintableCard: React.FC<PrintableCardProps> = ({ printable, locked, categoryColor, onDownload }) => (
  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
    <CardHeader className="pb-2">
      <div className="flex items-start justify-between">
        <span className="text-2xl">{printable.icon}</span>
        <Badge className={categoryColor || 'bg-gray-100 text-gray-800'}>{printable.category}</Badge>
      </div>
      <CardTitle className="text-lg mt-2">{printable.title}</CardTitle>
      <CardDescription>{printable.description}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
        <span>Ages {printable.ageRange}</span>
        <span>{printable.pages} pages</span>
      </div>
      <Button
        className="w-full"
        size="sm"
        variant={locked ? 'outline' : 'default'}
        disabled={locked}
        onClick={(e) => {
          e.preventDefault();
          onDownload();
        }}
      >
        {locked ? (
          <>
            <Lock className="w-4 h-4 mr-2" /> Premium Only
          </>
        ) : (
          <>
            <Download className="w-4 h-4 mr-2" /> Download PDF
          </>
        )}
      </Button>
    </CardContent>
  </Card>
);

export default MontessoriPrintables;
