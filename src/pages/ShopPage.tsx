import React, { useMemo, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ExternalLink, Search, Star } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { LazyImage } from '@/components/LazyImage';
import { storyBooks } from '@/data/storyBooks';
const allShopItems: any[] = [...storyBooks];
import { useSEO } from '@/hooks/useSEO';
import SEOOptimizer from '@/components/SEOOptimizer';

const CATEGORIES = ['All', 'Story Books'];

const ShopPage: React.FC = () => {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const initialCategory = params.get('category') ?? 'All';
  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState('');

  useSEO({
    title: 'Shop Montessori Materials - Authentic Learning Tools',
    description:
      'Shop recommended authentic Montessori materials for Practical Life, Sensorial, Language, Math, Geography, Botany, Art, and Cultural activities.',
    canonical: '/shop',
  });

  const filtered = useMemo(() => {
    return allShopItems.filter((p) => {
      const matchesCat =
        category === 'All' || (p.category && p.category.toLowerCase() === category.toLowerCase());
      const matchesSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(search.toLowerCase()));
      return matchesCat && matchesSearch;
    });
  }, [category, search]);

  const handleCategory = (cat: string) => {
    setCategory(cat);
    if (cat === 'All') {
      params.delete('category');
    } else {
      params.set('category', cat);
    }
    setParams(params, { replace: true });
  };

  return (
    <SEOOptimizer>
      <PageLayout title="Shop Materials" onBack={() => navigate('/')}>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search materials..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
              aria-label="Search materials"
            />
          </div>

          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Categories">
            {CATEGORIES.map((cat) => (
              <Button
                key={cat}
                variant={category === cat ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleCategory(cat)}
                role="tab"
                aria-selected={category === cat}
              >
                {cat}
              </Button>
            ))}
          </div>

          <p className="text-sm text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? 'material' : 'materials'}
            {category !== 'All' && ` in ${category}`}
          </p>
        </div>

        {filtered.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              No materials found. Try a different category or search term.
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <article key={product.id}>
                <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                  <LazyImage
                    src={product.image || '/placeholder.svg'}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="flex-1 flex flex-col p-4">
                    <Badge variant="outline" className="w-fit text-xs mb-2">
                      {product.category}
                    </Badge>
                    <h2 className="text-base font-semibold text-foreground mb-1">
                      {product.name}
                    </h2>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3 flex-1">
                      {product.description}
                    </p>
                    {product.rating && (
                      <div
                        className="flex items-center gap-1 mb-2"
                        aria-label={`${product.rating} out of 5 stars`}
                      >
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < Math.floor(product.rating)
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-muted'
                            }`}
                            aria-hidden="true"
                          />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">
                          {product.rating}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-muted-foreground">{product.ageRange}</span>
                      <span className="text-lg font-bold text-primary">
                        ${product.price?.toFixed(2)}
                      </span>
                    </div>
                    {product.amazonLink ? (
                      <Button
                        asChild
                        variant="outline"
                        className="w-full"
                        aria-label={`View ${product.name} on Amazon`}
                      >
                        <a
                          href={product.amazonLink}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" aria-hidden="true" />
                          View on Amazon
                        </a>
                      </Button>
                    ) : (
                      <Button
                        asChild
                        variant="outline"
                        className="w-full"
                        aria-label={`Search ${product.name} on Amazon`}
                      >
                        <a
                          href={`https://www.amazon.com/s?k=${encodeURIComponent(
                            'montessori ' + product.name
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" aria-hidden="true" />
                          Find on Amazon
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </article>
            ))}
          </div>
        )}

        <p className="text-xs text-muted-foreground text-center mt-8">
          Some links may be affiliate links.{' '}
          <Link to="/about" className="underline">
            Learn more
          </Link>
          .
        </p>
      </PageLayout>
    </SEOOptimizer>
  );
};

export default ShopPage;
