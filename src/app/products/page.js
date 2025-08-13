'use client';
import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
// import { products } from '@/data/products';


const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  const [filters, setFilters] = useState({
    category: 'all',
    material: 'all',
    priceRange: 'all'
  });

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/product/getAll`, {
          credentials: "include", // optional, if your API needs auth cookies
          cache: "no-store" // or use next: { revalidate: 60 } in server components
        });
        // console.log(res)
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        // console.log("Data:",data.data)
        setProducts(data.data || []); // make sure your backend returns { products: [...] }
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };

    getProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    if (filters.category !== 'all' && product.category !== filters.category) return false;
    // if (filters.material !== 'all' && !product.materials.includes(filters.material)) return false;
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (product.price < min || product.price > max) return false;
    }
    return true;
  });
  console.log("Filtered Products:", filteredProducts);
  // const allMaterials = [...new Set(products.flatMap(p => p.materials))];
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
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          >
            <option value="all">All Categories</option>
            {allCategories.map(cat => (
              <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
            ))}
          </select>
          {/* 
          <select
            className="bg-gray-800 text-white rounded-lg p-2"
            value={filters.material}
            onChange={(e) => setFilters({ ...filters, material: e.target.value })}
          >
            <option value="all">All Materials</option>
            {allMaterials.map(mat => (
              <option key={mat} value={mat}>{mat}</option>
            ))}
          </select> */}

          <select
            className="bg-gray-800 text-white rounded-lg p-2"
            value={filters.priceRange}
            onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
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
            <Link key={product._id} href={`/products/${product._id}`} passHref>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
