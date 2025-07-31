'use client';

import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

export default function ProductsPage() {
  const products = [
    {
      id: 1,
      title: '3D Printed Prototype Model',
      description: 'High-quality 3D printed prototype with precise details and professional finish',
      price: 299.99,
      images: ['/window.svg']
    },
    {
      id: 2,
      title: 'Custom Manufacturing Part',
      description: 'Custom manufactured part with industrial-grade materials',
      price: 199.99,
      images: ['/globe.svg']
    },
    {
      id: 3,
      title: 'Design Consultation Package',
      description: 'Professional design consultation and optimization service',
      price: 499.99,
      images: ['/file.svg']
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">All Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
}
