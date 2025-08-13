'use client';

import React, { useState, useEffect } from 'react';
import MagicBento from '../../../components/MagicBento';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { useCart } from '@/context/CartContext';

const ModelViewer = dynamic(() => import('../../../components/ModelViewer'), { ssr: false });

export default function ProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params?.productId;

  const [product, setProduct] = useState(null);
  const [modelUrl, setModelUrl] = useState(null);
  const [show3DModel, setShow3DModel] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const { addToCart } = useCart();
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/product/getProduct/${productId}`);
        setProduct(res.data.data);
        setSelectedImage(res.data.data.thumbnail || res.data.data.images?.[0]);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    if (productId) fetchProduct();
  }, [productId]);

  const handleView3D = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/product/load3d/${productId}`);
      setModelUrl(res.data.data.modelUrl);
      setShow3DModel(true);
    } catch (err) {
      console.error("Error loading 3D model:", err);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
        <p className="text-xl font-medium animate-pulse">Loading product...</p>
      </div>
    );
  }

  const cardData = [
    {
      title: "Specifications",
      description:
        typeof product.description === "object"
          ? Object.entries(product.description || {})
              .map(([k, v]) => `${k}: ${v}`)
              .join('\n')
          : product.description,
      label: "Technical Details"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white antialiased">
      
      {/* Top Section - Gallery + Info */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Image Gallery */}
        <div>
          <div className="w-full h-[450px] rounded-xl overflow-hidden border border-gray-700 shadow-lg bg-black mb-4 flex items-center justify-center">
            <img
              src={selectedImage}
              alt={product.productName}
              className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>
          {product.images?.length > 1 && (
            <div className="flex gap-3 overflow-x-auto">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition ${
                    selectedImage === img ? 'border-indigo-500' : 'border-gray-700 hover:border-gray-500'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
          <button
            onClick={handleView3D}
            className="mt-6 bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-semibold shadow-md focus:ring-4 focus:ring-indigo-400"
          >
            View 3D Model
          </button>
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center space-y-6">
          <div>
            <p className="uppercase text-indigo-400 font-semibold">{product.category}</p>
            <h1 className="text-5xl font-extrabold tracking-tight mb-2">{product.productName}</h1>
            <p className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 bg-clip-text text-transparent">
              ₹{product.price.toLocaleString('en-IN')}
            </p>
          </div>
          <p className="text-lg leading-relaxed whitespace-pre-line opacity-90">{product.description}</p>
          <button
            onClick={() => {
              addToCart({
                _id: product._id,
                title: product.productName,
                price: product.price,
                thumbnail: product.thumbnail,
                quantity: 1,
              });
              router.push('/cart');
            }}
            className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg text-lg font-semibold shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-400"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Specifications Section */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <MagicBento
          cardData={cardData}
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
        />
      </div>

      {/* 3D Model Modal */}
      {show3DModel && modelUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-6">
          <div className="relative max-w-5xl w-full bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
            <button
              className="absolute top-4 right-4 text-white text-4xl font-bold hover:text-red-500 z-10 focus:outline-none"
              onClick={() => setShow3DModel(false)}
              aria-label="Close 3D Model Viewer"
            >
              &times;
            </button>
            <ModelViewer url={modelUrl} />
          </div>
        </div>
      )}
    </div>
  );
}
