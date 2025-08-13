'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import dynamic from 'next/dynamic';
import axios from 'axios';

const ModelViewer = dynamic(() => import('@/components/ModelViewer'), {
  ssr: false,
});

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function ThreeDPrintingPage() {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [material, setMaterial] = useState('');
  const [color, setColor] = useState('');
  const [infill, setInfill] = useState('');
  const [layerHeight, setLayerHeight] = useState('');
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const droppedFile = acceptedFiles[0];
    if (droppedFile) {
      setFile(droppedFile);
      setFileUrl(URL.createObjectURL(droppedFile));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'model/stl': ['.stl'],
      'model/obj': ['.obj'],
      'model/gltf-binary': ['.glb'],
      'model/gltf+json': ['.gltf'],
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !material || !color || !infill || !layerHeight) {
      alert('Please fill all fields and upload a file.');
      return;
    }

    const formData = new FormData();
    formData.append('material', material);
    formData.append('color', color);
    formData.append('infill', infill);
    formData.append('layerHeight', layerHeight);
    formData.append('Three_D_file', file); // backend expects this exact key

    try {
      setUploading(true);
      const res = await axios.post(`${BACKEND_URL}/request/create`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      console.log('Upload successful:', res.data);
      alert('Request submitted successfully');

      // Reset form
      setFile(null);
      setFileUrl(null);
      setMaterial('');
      setColor('');
      setInfill('');
      setLayerHeight('');
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      <h1 className="text-4xl font-bold mb-8">3D Printing Services</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div
            {...getRootProps({ className: 'dropzone' })}
            className={`p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${isDragActive ? 'border-blue-500 bg-blue-50/10' : 'border-gray-300/30 bg-white/5'
              }`}
          >
            <input {...getInputProps()} />
            <div className="text-center pointer-events-none">
              <p className="text-white/80">
                {isDragActive
                  ? 'Drop the files here ...'
                  : 'Drag & drop your 3D model files here, or click to select files'}
              </p>
              <p className="text-sm text-white/60 mt-2">
                Supported formats: STL, OBJ, GLTF, GLB
              </p>
            </div>
          </div>

          {file && fileUrl && (
            <div className="mt-8">
              <ModelViewer url={fileUrl} />
              <p className="text-sm text-green-400 mt-2">Selected: {file.name}</p>
            </div>
          )}
        </div>

        <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20">
          <h3 className="text-xl font-semibold mb-4">Request a Quote</h3>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1 text-white/80">Material</label>
              <input
                type="text"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className="w-full p-2 bg-white/5 border border-white/10 rounded-md text-white"
                placeholder="e.g. PLA, ABS"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-white/80">Color</label>
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full p-2 bg-white/5 border border-white/10 rounded-md text-white"
                placeholder="e.g. Blue, Red"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-white/80">Infill (%)</label>
              <input
                type="number"
                value={infill}
                onChange={(e) => setInfill(e.target.value)}
                className="w-full p-2 bg-white/5 border border-white/10 rounded-md text-white"
                placeholder="e.g. 20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-white/80">Layer Height (mm)</label>
              <input
                type="number"
                value={layerHeight}
                onChange={(e) => setLayerHeight(e.target.value)}
                className="w-full p-2 bg-white/5 border border-white/10 rounded-md text-white"
                placeholder="e.g. 0.2"
              />
            </div>

            <button
              type="submit"
              disabled={uploading}
              className={`w-full py-2 px-4 rounded-md transition-colors ${uploading
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
                }`}
            >
              {uploading ? 'Uploading...' : 'Submit Request'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
