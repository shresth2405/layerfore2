'use client';

import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { products } from '@/data/products';

export default function ProductsPage() {
  const [filters, setFilters] = useState({
    category: 'all',
    material: 'all',
    priceRange: 'all'
  });

  const filteredProducts = products.filter(product => {
    if (filters.category !== 'all' && product.category !== filters.category) return false;
    if (filters.material !== 'all' && !product.materials.includes(filters.material)) return false;
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (product.price < min || product.price > max) return false;
    }
    return true;
  });

  const allMaterials = [...new Set(products.flatMap(p => p.materials))];
  const allCategories = [...new Set(products.map(p => p.category))];
  const priceRanges = ['0-200', '200-400', '400-1000'];

  return (
    <div className="min-h-screen py-16 px-4 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Our Products</h1>
        
        {/* Filters */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <select 
            className="bg-gray-800 text-white rounded-lg p-2"
            value={filters.category}
            onChange={(e) => setFilters({...filters, category: e.target.value})}
          >
            <option value="all">All Categories</option>
            {allCategories.map(cat => (
              <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
            ))}
          </select>

          <select 
            className="bg-gray-800 text-white rounded-lg p-2"
            value={filters.material}
            onChange={(e) => setFilters({...filters, material: e.target.value})}
          >
            <option value="all">All Materials</option>
            {allMaterials.map(mat => (
              <option key={mat} value={mat}>{mat}</option>
            ))}
          </select>

          <select 
            className="bg-gray-800 text-white rounded-lg p-2"
            value={filters.priceRange}
            onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
          >
            <option value="all">All Prices</option>
            {priceRanges.map(range => (
              <option key={range} value={range}>${range}</option>
            ))}
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id}>
              <ProductCard
                product={product}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
