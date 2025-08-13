'use client';

import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { ParticleCard } from './MagicBento';

export default function ProductCard({ product, title: propTitle, description: propDesc, price: propPrice, images: propImages, onBuy }) {
  const { addToCart } = useCart();
  
  // Use either product object properties or direct props
  const title = product?.productName || propTitle;
  const description = product?.description || propDesc;
  const price = product?.price || propPrice;
  const images = product?.thumbnail || propImages;

  if (!title || !description || !price) {
    return null;
  }

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onBuy) {
      onBuy();
    } else if (product) {
      addToCart({
                  _id: product._id,
                  title: product.productName,
                  price: product.price,
                  thumbnail: product.thumbnail,
                  quantity: 1,
                });
    } else {
      addToCart({
        title,
        description,
        price,
        images
      });
    }
  };

  return (
    <ParticleCard
      className="card bg-[#060010] border border-[#392e4e] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
      enableTilt={true}
      enableMagnetism={true}
      clickEffect={true}
      particleCount={8}
      glowColor="132, 0, 255"
    >
      <div className="relative h-48">
        {images? (
          <Image
            src={images}
            alt={title}
            fill
            className="object-contain p-4"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No image available
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-blue-400">${price?.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </ParticleCard>
  );
}
