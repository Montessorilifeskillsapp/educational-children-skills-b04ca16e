import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Settings } from 'lucide-react';
import { montessoriTheme } from './ThemeConfig';
import ProductCard from './ProductCard';
import ShopFilters from './ShopFilters';
import { skillBasedProducts } from '@/data/skillBasedProducts';
import { montessoriMaterials } from '@/data/montessoriMaterials';
import { montessoriPictures } from '@/data/montessoriPictures';
import { storyBooks } from '@/data/storyBooks';
import { activityBundles } from '@/data/activityBundles';
import { activityMaterials } from '@/data/activityMaterials';
import { useSEO, SEO_CONFIG } from '@/hooks/useSEO';
import { useCart } from './CartContext';
import CartModal from './CartModal';
import { filterProducts, sortProducts, Product } from '@/lib/shopUtils';
import { useToast } from '@/components/ui/use-toast';
import BackButton from '@/components/ui/back-button';
interface ShopProps {
  onBack?: () => void;
}

const Shop: React.FC<ShopProps> = ({ onBack }) => {
  useSEO(SEO_CONFIG.shop);
  const { addToCart, totalItems } = useCart();
  const { toast } = useToast();
  const [editMode, setEditMode] = useState(false);
  const [customImages, setCustomImages] = useState<{[key: string]: string}>({});
  
  // Filter and search state
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name-asc');
  const [filterCategory, setFilterCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  // Enhanced add to cart with toast notification
  const handleAddToCart = (product: any) => {
    addToCart(product);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
      duration: 2000,
    });
  };
  useEffect(() => {
    try {
      const saved = localStorage.getItem('shop-custom-images');
      if (saved) {
        setCustomImages(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error parsing saved images:', error);
      localStorage.removeItem('shop-custom-images');
    }
  }, []);

  const handleImageChange = (productId: string, imageUrl: string) => {
    const updated = { ...customImages, [productId]: imageUrl };
    setCustomImages(updated);
    localStorage.setItem('shop-custom-images', JSON.stringify(updated));
  };

  const openAmazonLink = (link: string) => {
    window.open(link, '_blank');
  };

  // Convert activity materials to products
  const materialProducts = Object.entries(activityMaterials).map(([activityId, materials]) => ({
    id: `materials-${activityId}`,
    name: `${activityId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Materials`,
    price: materials.length * 2.99,
    category: 'Individual Materials',
    description: `Essential materials for ${activityId.replace(/-/g, ' ')} activity`,
    materials: materials.map(m => m.name),
    inStock: true,
    rating: 4.5,
    ageRange: '2-6 years',
    skillLevel: 'Beginner'
  }));
  // Group Montessori materials by category
  const categorizedMaterials = montessoriMaterials.reduce((acc, material) => {
    if (!acc[material.category]) {
      acc[material.category] = [];
    }
    acc[material.category].push(material);
    return acc;
  }, {} as Record<string, typeof montessoriMaterials>);

  // Memoized filtered and sorted products
  const filteredSkillProducts = useMemo(() => {
    const allSkillProducts = Object.values(skillBasedProducts).flat();
    const filtered = filterProducts(allSkillProducts, searchTerm, filterCategory, priceRange);
    return sortProducts(filtered, sortBy);
  }, [searchTerm, filterCategory, priceRange, sortBy]);

  const filteredMontessoriMaterials = useMemo(() => {
    const filtered = filterProducts(montessoriMaterials, searchTerm, filterCategory, priceRange);
    return sortProducts(filtered, sortBy);
  }, [searchTerm, filterCategory, priceRange, sortBy]);

  const filteredStoryBooks = useMemo(() => {
    console.log('Processing story books:', storyBooks);
    try {
      const filtered = filterProducts(storyBooks as Product[], searchTerm, filterCategory, priceRange);
      return sortProducts(filtered, sortBy);
    } catch (error) {
      console.error('Error filtering story books:', error);
      return [];
    }
  }, [searchTerm, filterCategory, priceRange, sortBy]);

  const filteredActivityBundles = useMemo(() => {
    const filtered = filterProducts(activityBundles, searchTerm, filterCategory, priceRange);
    return sortProducts(filtered, sortBy);
  }, [searchTerm, filterCategory, priceRange, sortBy]);

  const filteredMaterialProducts = useMemo(() => {
    const filtered = filterProducts(materialProducts, searchTerm, filterCategory, priceRange);
    return sortProducts(filtered, sortBy);
  }, [searchTerm, filterCategory, priceRange, sortBy, materialProducts]);

  const filteredMontessoriPictures = useMemo(() => {
    const filtered = filterProducts(montessoriPictures, searchTerm, filterCategory, priceRange);
    return sortProducts(filtered, sortBy);
  }, [searchTerm, filterCategory, priceRange, sortBy]);

  return (
    <div className={`min-h-screen ${montessoriTheme.backgrounds.shop} p-6`}>
      <div className="max-w-6xl mx-auto">
        {onBack && <BackButton onClick={onBack} />}
        
        <header className="mb-8">
          <h1 className={`text-4xl font-bold text-center ${montessoriTheme.text.accent} mb-4`}>
            Montessori Materials Shop
          </h1>
          <p className={`text-lg text-center ${montessoriTheme.text.muted}`}>
            Discover authentic Montessori materials and resources for your child's learning journey
          </p>
        </header>

        <div className="flex justify-between items-center mb-6">
          {/* Enhanced cart button with better visibility - moved to top right */}
          <div className="flex-1"></div>
          <div className="flex items-center gap-4">
            <Button 
              onClick={() => setIsOpen(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white border-2 border-purple-400 shadow-lg relative px-6 py-3"
              size="lg"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Cart ({totalItems})
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-bounce">
                  {totalItems}
                </span>
              )}
            </Button>
            
            <Button 
              onClick={() => setEditMode(!editMode)}
              variant="outline"
              size="lg"
            >
              <Settings className="w-4 h-4 mr-2" />
              {editMode ? 'Done Editing' : 'Edit Images'}
            </Button>
          </div>
        </div>
        <ShopFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortBy={sortBy}
          onSortChange={setSortBy}
          filterCategory={filterCategory}
          onFilterChange={setFilterCategory}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
        />

        <Tabs defaultValue="skills" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-6 bg-white/90 border border-gray-200 rounded-lg shadow-sm p-1">
            <TabsTrigger value="skills" className="text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm">Skills</TabsTrigger>
            <TabsTrigger value="montessori" className="text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm">Materials</TabsTrigger>
            <TabsTrigger value="pictures" className="text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm">Pictures</TabsTrigger>
            <TabsTrigger value="books" className="text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm">Books</TabsTrigger>
            <TabsTrigger value="bundles" className="text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm">Bundles</TabsTrigger>
            <TabsTrigger value="materials" className="text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm">Individual</TabsTrigger>
          </TabsList>
          <TabsContent value="skills">
            {/* Organize by skill categories starting with Practical Life */}
            <div className="space-y-8">
              {/* Practical Life Skills */}
              <div>
                <h2 className="text-2xl font-bold text-purple-800 mb-4 border-b-2 border-purple-200 pb-2">
                  Practical Life Skills
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredSkillProducts
                    .filter(product => product.category === 'Practical Life')
                    .map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        editMode={editMode}
                        customImages={customImages}
                        onImageChange={handleImageChange}
                        onAddToCart={handleAddToCart}
                        onOpenLink={product.amazonLink ? () => openAmazonLink(product.amazonLink!) : undefined}
                      />
                    ))}
                </div>
              </div>

              {/* Sensorial Skills */}
              <div>
                <h2 className="text-2xl font-bold text-purple-800 mb-4 border-b-2 border-purple-200 pb-2">
                  Sensorial Skills
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredSkillProducts
                    .filter(product => product.category === 'Sensorial')
                    .map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        editMode={editMode}
                        customImages={customImages}
                        onImageChange={handleImageChange}
                        onAddToCart={handleAddToCart}
                        onOpenLink={product.amazonLink ? () => openAmazonLink(product.amazonLink!) : undefined}
                      />
                    ))}
                </div>
              </div>

              {/* Mathematics Skills */}
              <div>
                <h2 className="text-2xl font-bold text-purple-800 mb-4 border-b-2 border-purple-200 pb-2">
                  Mathematics Skills
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredSkillProducts
                    .filter(product => product.category === 'Mathematics')
                    .map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        editMode={editMode}
                        customImages={customImages}
                        onImageChange={handleImageChange}
                        onAddToCart={handleAddToCart}
                        onOpenLink={product.amazonLink ? () => openAmazonLink(product.amazonLink!) : undefined}
                      />
                    ))}
                </div>
              </div>

              {/* Language Skills */}
              <div>
                <h2 className="text-2xl font-bold text-purple-800 mb-4 border-b-2 border-purple-200 pb-2">
                  Language Skills
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredSkillProducts
                    .filter(product => product.category === 'Language')
                    .map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        editMode={editMode}
                        customImages={customImages}
                        onImageChange={handleImageChange}
                        onAddToCart={handleAddToCart}
                        onOpenLink={product.amazonLink ? () => openAmazonLink(product.amazonLink!) : undefined}
                      />
                    ))}
                </div>
              </div>

              {/* Cultural Studies (Geography) */}
              <div>
                <h2 className="text-2xl font-bold text-purple-800 mb-4 border-b-2 border-purple-200 pb-2">
                  Cultural Studies & Geography
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredSkillProducts
                    .filter(product => product.category === 'Cultural Studies')
                    .map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        editMode={editMode}
                        customImages={customImages}
                        onImageChange={handleImageChange}
                        onAddToCart={handleAddToCart}
                        onOpenLink={product.amazonLink ? () => openAmazonLink(product.amazonLink!) : undefined}
                      />
                    ))}
                </div>
              </div>

              {/* Art Skills */}
              <div>
                <h2 className="text-2xl font-bold text-purple-800 mb-4 border-b-2 border-purple-200 pb-2">
                  Art Skills
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredSkillProducts
                    .filter(product => product.category === 'Art')
                    .map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        editMode={editMode}
                        customImages={customImages}
                        onImageChange={handleImageChange}
                        onAddToCart={handleAddToCart}
                        onOpenLink={product.amazonLink ? () => openAmazonLink(product.amazonLink!) : undefined}
                      />
                    ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="montessori">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMontessoriMaterials.map((material) => (
                <ProductCard
                  key={material.id}
                  product={material}
                  editMode={editMode}
                  customImages={customImages}
                  onImageChange={handleImageChange}
                  onAddToCart={handleAddToCart}
                  onOpenLink={material.amazonLink ? () => openAmazonLink(material.amazonLink!) : undefined}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pictures">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMontessoriPictures.map((picture) => (
                <ProductCard
                  key={picture.id}
                  product={picture}
                  editMode={editMode}
                  customImages={customImages}
                  onImageChange={handleImageChange}
                  onAddToCart={handleAddToCart}
                  onOpenLink={picture.amazonLink ? () => openAmazonLink(picture.amazonLink!) : undefined}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="books">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStoryBooks.map((book) => (
                <ProductCard
                  key={book.id}
                  product={book}
                  editMode={editMode}
                  customImages={customImages}
                  onImageChange={handleImageChange}
                  onAddToCart={handleAddToCart}
                  onOpenLink={book.amazonLink ? () => openAmazonLink(book.amazonLink!) : undefined}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bundles">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredActivityBundles.map((bundle) => (
                <ProductCard
                  key={bundle.id}
                  product={bundle}
                  editMode={editMode}
                  customImages={customImages}
                  onImageChange={handleImageChange}
                  onAddToCart={handleAddToCart}
                  onOpenLink={bundle.amazonLink ? () => openAmazonLink(bundle.amazonLink!) : undefined}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="materials">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMaterialProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  editMode={editMode}
                  customImages={customImages}
                  onImageChange={handleImageChange}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <CartModal />
      </div>
    </div>
  );
};

export default Shop;