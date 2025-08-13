'use client';

import { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, PerspectiveCamera } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import * as THREE from 'three';

function Model({ url }) {
  const meshRef = useRef();
  const [geometry, setGeometry] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!url) return;

    const loader = new STLLoader();

    loader.load(
      url,
      (geometry) => {
        geometry.center();
        geometry.computeBoundingBox();

        const box = geometry.boundingBox;
        const size = new THREE.Vector3();
        box.getSize(size);

        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 100 / maxDim;

        geometry.scale(scale, scale, scale);
        setGeometry(geometry);
        setLoading(false);
      },
      undefined,
      (err) => {
        console.error('Error loading STL from URL:', err);
        setError('Failed to load model');
        setLoading(false);
      }
    );
  }, [url]);

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
        color="#FFFFF0"
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

export default function ModelViewer({ url }) {
  return (
    <div className="w-full h-[400px] bg-black/30 rounded-lg overflow-hidden relative">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 150]} fov={45} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={[512, 512]} castShadow />
        <Suspense fallback={<LoadingSpinner />}>
          <Stage environment="city" intensity={0.6}>
            {url && <Model url={url} />}
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
