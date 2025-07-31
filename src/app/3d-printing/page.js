'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import dynamic from 'next/dynamic';

// Dynamically import ModelViewer to avoid SSR issues
const ModelViewer = dynamic(() => import('@/components/ModelViewer'), {
  ssr: false,
});

export default function ThreeDPrintingPage() {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFile(file);
    const url = URL.createObjectURL(file);
    setFileUrl(url);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'model/stl': ['.stl'],
      'model/obj': ['.obj'],
      'model/gltf-binary': ['.glb'],
      'model/gltf+json': ['.gltf']
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-white">3D Printing Services</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div 
            {...getRootProps()} 
            className={`p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
              isDragActive ? 'border-blue-500 bg-blue-50/10' : 'border-gray-300/30 bg-white/5'
            }`}
          >
            <input {...getInputProps()} />
            <div className="text-center">
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

          {file && (
            <div className="mt-8">
              <ModelViewer file={file} />
            </div>
          )}
        </div>

        <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20">
          <h3 className="text-xl font-semibold mb-4 text-white">Request a Quote</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-white/80">Project Description</label>
              <textarea 
                className="w-full p-2 bg-white/5 border border-white/10 rounded-md text-white"
                rows="4"
                placeholder="Describe your project requirements..."
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
