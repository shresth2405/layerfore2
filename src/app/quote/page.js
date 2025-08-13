'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const ModelViewer = dynamic(() => import('../../components/ModelViewer'), {
  ssr: false
});

export default function QuotationPage() {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modelUrl, setModelUrl] = useState(null);

  const getQuote = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/request/getByCustomer`, {
        withCredentials: true,
      });
      console.log(response.data);
      setQuotations(response.data.data || []);
    } catch (err) {
      console.error('Error fetching quotations:', err);
      setError('Failed to fetch quotations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Quotations</h1>

      {loading && <p className="text-gray-300">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && quotations.length === 0 && (
        <p className="text-gray-400">No quotations found.</p>
      )}

      {!loading && quotations.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white/10 border border-white/10 rounded-md text-white">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="px-4 py-2 text-left">File</th>
                <th className="px-4 py-2 text-left">Material</th>
                <th className="px-4 py-2 text-left">Color</th>
                <th className="px-4 py-2 text-left">Infill</th>
                <th className="px-4 py-2 text-left">Layer Height</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Quotation</th>
              </tr>
            </thead>
            <tbody>
              {quotations.map((q) => (
                <tr key={q._id} className="border-t border-white/10 hover:bg-white/5">
                  <td className="px-4 py-2">
                    {q.product?.file ? (
                      <button
                        onClick={() => setModelUrl(q.product.file)}
                        className="text-blue-400 underline"
                      >
                        View File
                      </button>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td className="px-4 py-2">{q.product?.material || 'N/A'}</td>
                  <td className="px-4 py-2">{q.product?.color || 'N/A'}</td>
                  <td className="px-4 py-2">{q.product?.infill || 'N/A'}</td>
                  <td className="px-4 py-2">{q.product?.layerHeight || 'N/A'}</td>
                  <td className="px-4 py-2">{q.status || 'N/A'}</td>
                  <td className="px-4 py-2">
                    {q.createdAt ? new Date(q.createdAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-4 py-2">
                    {q.quotation ? (
                      <a
                        href={q.quotation}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 underline"
                      >
                        View File
                      </a>
                    ) : (
                      'N/A'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for 3D Model Viewer */}
      {modelUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative w-full max-w-4xl p-4 bg-gray-900 rounded-xl shadow-lg">
            <button
              className="absolute top-2 right-2 text-white text-2xl font-bold hover:text-red-400"
              onClick={() => setModelUrl(null)}
            >
              ×
            </button>
            <ModelViewer url={modelUrl} />
          </div>
        </div>
      )}
    </div>
  );
}
