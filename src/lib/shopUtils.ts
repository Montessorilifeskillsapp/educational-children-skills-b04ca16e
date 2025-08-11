// Utility functions for shop filtering and sorting

export interface Product {
  id: string;
  name: string;
  price: number;
  category?: string;
  description?: string;
  rating?: number;
  inStock?: boolean;
  ageRange?: string;
  skillLevel?: string;
  amazonLink?: string;
}

export const filterProducts = (
  products: Product[],
  searchTerm: string,
  filterCategory: string,
  priceRange: string
): Product[] => {
  return products.filter((product) => {
    // Search filter
    const matchesSearch = !searchTerm || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));

    // Category filter
    const matchesCategory = filterCategory === 'all' || 
      (product.category && product.category.toLowerCase().includes(filterCategory.toLowerCase()));

    // Price range filter
    let matchesPrice = true;
    if (priceRange !== 'all') {
      const price = product.price;
      switch (priceRange) {
        case '0-25':
          matchesPrice = price <= 25;
          break;
        case '25-50':
          matchesPrice = price > 25 && price <= 50;
          break;
        case '50-100':
          matchesPrice = price > 50 && price <= 100;
          break;
        case '100+':
          matchesPrice = price > 100;
          break;
      }
    }

    return matchesSearch && matchesCategory && matchesPrice;
  });
};

export const sortProducts = (products: Product[], sortBy: string): Product[] => {
  const sorted = [...products];
  
  switch (sortBy) {
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    default:
      return sorted;
  }
};