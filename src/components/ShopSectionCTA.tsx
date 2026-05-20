import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ShopSectionCTAProps {
  category: string;
  label?: string;
}

/**
 * CTA shown at the end of each activity section page,
 * linking to the Shop filtered to materials for that section.
 */
const ShopSectionCTA: React.FC<ShopSectionCTAProps> = ({ label }) => {
  return (
    <section aria-label="Shop Montessori life skills story books" className="mt-10">
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
        <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-3 rounded-full bg-primary/15 text-primary">
              <ShoppingBag className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {label ?? 'Shop Montessori Life Skills Story Books'}
              </h3>
              <p className="text-sm text-muted-foreground">
                Beautifully illustrated story books that bring Montessori life skills to life.
              </p>
            </div>
          </div>
          <Button asChild size="lg" className="shrink-0">
            <Link to="/shop">
              Browse Books
              <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </section>
  );
};

export default ShopSectionCTA;
