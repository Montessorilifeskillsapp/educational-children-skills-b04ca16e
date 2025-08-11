import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, ArrowUpDown } from 'lucide-react';

interface ShopFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  filterCategory: string;
  onFilterChange: (value: string) => void;
  priceRange: string;
  onPriceRangeChange: (value: string) => void;
}

const ShopFilters: React.FC<ShopFiltersProps> = ({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  filterCategory,
  onFilterChange,
  priceRange,
  onPriceRangeChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6 space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Sort */}
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-full md:w-48">
            <ArrowUpDown className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name-asc">Name A-Z</SelectItem>
            <SelectItem value="name-desc">Name Z-A</SelectItem>
            <SelectItem value="price-asc">Price Low-High</SelectItem>
            <SelectItem value="price-desc">Price High-Low</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Category Filter */}
        <Select value={filterCategory} onValueChange={onFilterChange}>
          <SelectTrigger className="w-full md:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="practical-life">Practical Life</SelectItem>
            <SelectItem value="sensorial">Sensorial</SelectItem>
            <SelectItem value="mathematics">Mathematics</SelectItem>
            <SelectItem value="language">Language</SelectItem>
            <SelectItem value="cultural">Cultural</SelectItem>
          </SelectContent>
        </Select>

        {/* Price Range Filter */}
        <Select value={priceRange} onValueChange={onPriceRangeChange}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="All Prices" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="0-25">$0 - $25</SelectItem>
            <SelectItem value="25-50">$25 - $50</SelectItem>
            <SelectItem value="50-100">$50 - $100</SelectItem>
            <SelectItem value="100+">$100+</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ShopFilters;