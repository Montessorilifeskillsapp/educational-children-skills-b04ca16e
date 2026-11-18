import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ShopSectionCTAProps {
  category?: string;
  label?: string;
}

/**
 * CTA shown at the end of activity pages, linking to the Books shop.
 */
const ShopSectionCTA: React.FC<ShopSectionCTAProps> = ({ label }) => {
  const { t } = useTranslation();
  return (
    <section aria-label={t('chrome.shop.region')} className="mt-10">
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
        <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-3 rounded-full bg-primary/15 text-primary">
              <ShoppingBag className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {label ?? t('chrome.shop.title')}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t('chrome.shop.body')}
              </p>
            </div>
          </div>
          <Button asChild size="lg" className="shrink-0">
            <Link to="/shop">
              {t('chrome.shop.browse')}
              <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </section>
  );
};

export default ShopSectionCTA;
