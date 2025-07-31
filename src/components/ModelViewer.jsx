'use client';

import { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, PerspectiveCamera } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import * as THREE from 'three';

function Model({ file }) {
  const meshRef = useRef();
  const [geometry, setGeometry] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        setLoading(true);
        const arrayBuffer = event.target.result;
        const loader = new STLLoader();
        const geometry = loader.parse(arrayBuffer);
        
        // Center the geometry
        geometry.center();
        
        // Compute the bounding box
        geometry.computeBoundingBox();
        const box = geometry.boundingBox;
        
        // Calculate the size
        const size = new THREE.Vector3();
        box.getSize(size);
        
        // Scale the geometry to fit in a 100x100x100 box
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 100 / maxDim;
        geometry.scale(scale, scale, scale);
        
        setGeometry(geometry);
        setError(null);
      } catch (error) {
        console.error('Error loading STL:', error);
        setError('Failed to load 3D model. Please try again with a different file.');
      } finally {
        setLoading(false);
      }
    };

    reader.onerror = () => {
      setError('Failed to read file. Please try again.');
      setLoading(false);
    };

    reader.readAsArrayBuffer(file);
  }, [file]);

  if (error) {
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
    );
  }

  if (!geometry) return null;

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        color="#4F46E5"
        roughness={0.5}
        metalness={0.5}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function LoadingSpinner() {
  return (
    <mesh>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color="#4F46E5" wireframe />
    </mesh>
  );
}

export default function ModelViewer({ file }) {
  return (
    <div className="w-full h-[400px] bg-black/30 rounded-lg overflow-hidden relative">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 150]} fov={45} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={[512, 512]} castShadow />
        <Suspense fallback={<LoadingSpinner />}>
          <Stage environment="city" intensity={0.6}>
            {file && <Model file={file} />}
          </Stage>
        </Suspense>
        <OrbitControls
          autoRotate
          autoRotateSpeed={2}
          enableZoom={true}
          enablePan={true}
          minDistance={50}
          maxDistance={200}
        />
      </Canvas>
    </div>
  );
}
