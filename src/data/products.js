export const products = [
  {
    id: 1,
    productName: "Professional 3D Printing",
    description: "High-quality 3D printing service with industrial-grade materials",
    price: 299.99,
    category: "printing",
    materials: ["PLA", "ABS", "PETG"],
    thumbnail: '/window.svg',
    specs: {
      resolution: "50-100 microns",
      buildVolume: "250 x 250 x 300 mm",
      speed: "Up to 150 mm/s"
    },
    features: [
      "Industrial-grade materials",
      "High precision printing",
      "Fast turnaround time",
      "Custom color options",
      "Post-processing available"
    ]
  },
  {
    id: 2,
    productName: "Rapid Prototyping",
    description: "Quick turnaround prototyping service with expert consultation",
    price: 199.99,
    category: "prototyping",
    materials: ["Resin", "Nylon", "TPU"],
    thumbnail: '/globe.svg',
    specs: {
      accuracy: "±0.1mm",
      minFeatureSize: "0.2mm",
      turnaround: "24-48 hours"
    },
    features: [
      "Rapid iteration cycles",
      "Expert design consultation",
      "Multiple material options",
      "Functional testing",
      "Design optimization"
    ]
  },
  {
    id: 3,
    productName: "Custom Manufacturing",
    description: "Tailored manufacturing solutions for your specific needs",
    price: 499.99,
    category: "manufacturing",
    materials: ["Metal", "Composite", "Ceramic"],
    thumbnail: '/file.svg',
    specs: {
      batchSize: "1-1000 units",
      quality: "ISO 9001:2015",
      consulting: "Included"
    },
    features: [
      "Custom batch sizes",
      "Quality certification",
      "Material selection assistance",
      "Assembly services",
      "Quality control"
    ]
  }
];
