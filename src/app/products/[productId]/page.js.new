"use client";

import MagicBento from '../../../components/MagicBento';
import { products } from '@/data/products';
import { useRouter } from 'next/navigation';

export default function ProductPage() {
  const router = useRouter();
  const productId = typeof window !== 'undefined' ? window.location.pathname.split('/').pop() : null;
  const product = products.find(p => p.id === parseInt(productId));

  if (!product) {
    return <div>Product not found</div>;
  }

  const cardData = [
    {
      title: "Specifications",
      description: Object.entries(product.specs)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n'),
      label: "Technical Details"
    },
    {
      title: "Materials",
      description: product.materials.join(', '),
      label: "Available Materials"
    },
    {
      title: "Features",
      description: product.features.join('\n'),
      label: "Key Features"
    }
  ];

  return (
    <div className="min-h-screen py-16 px-4 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => router.back()}
          className="mb-8 text-blue-400 hover:text-blue-300 flex items-center gap-2"
        >
          ← Back to Products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div className="aspect-square bg-gray-800 rounded-2xl overflow-hidden flex items-center justify-center">
            <img 
              src={product.images[0]} 
              alt={product.title}
              className="w-1/2 h-1/2 object-contain"
            />
          </div>

          <div>
            <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
            <p className="text-2xl text-blue-400 mb-6">${product.price}</p>
            <p className="text-gray-300 mb-8">{product.description}</p>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Category</h3>
                <p className="text-gray-300">{product.category}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Materials</h3>
                <div className="flex flex-wrap gap-2">
                  {product.materials.map(material => (
                    <span 
                      key={material}
                      className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                    >
                      {material}
                    </span>
                  ))}
                </div>
              </div>

              <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8">Product Details</h2>
          <div className="opacity-0 animate-fadeIn">
            <MagicBento
              textAutoHide={false}
              enableStars={true}
              enableSpotlight={true}
              enableBorderGlow={true}
              spotlightRadius={400}
              particleCount={15}
              enableTilt={true}
              glowColor="82, 0, 255"
              clickEffect={true}
              enableMagnetism={true}
              cardData={cardData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
