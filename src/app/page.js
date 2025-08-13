"use client";

import { useEffect, useState } from "react";
import DotGrid from "../components/DotGrid";
import TextType from "../components/TextType";
import SpotlightCard from "../components/SpotlightCard";
import ProductCard from "../components/ProductCard";
import StarBorder from "../components/StarBorder";
import { products } from "@/data/products";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const featuredProducts = products;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen text-white font-fi flex flex-col items-center relative">
      {mounted && (
        <div
          style={{
            width: "100%",
            height: "100vh",
            position: "fixed",
            zIndex: -1,
          }}
        >
          <DotGrid
            dotSize={2}
            gap={20}
            baseColor="#4F5E66"
            activeColor="#FCB41F"
            proximity={150}
            shockRadius={150}
            shockStrength={50}
            resistance={75000}
            returnDuration={1.5}
          />
        </div>
      )}

      <div className="flex flex-col items-center pt-32 pb-20 w-full">
        <h1 className="text-4xl sm:text-8xl font-bold mb-6 z-10 bg-gradient-to-r from-primary via-accent to-success bg-clip-text text-white">LayerForge</h1>

        <div className="text-3xl sm:text-6xl z-10 min-h-[3rem] mb-32 flex items-center justify-side">
          <TextType
            text={[
              "Building the future",
              "One layer at a time",
              "Innovation in 3D Printing",
              "Create without limits"
            ]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
            textColors={["rgb(252, 180, 31)", "rgb(14, 165, 233)", "rgb(34, 197, 94)"]}
            className="text-center"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12  max-w-7xl mx-auto px-6 w-full">
          {/* Featured Products Section */}


          {/* Services Section */}
          <SpotlightCard
            className="flex flex-col items-center gap-6 min-h-[400px] transform hover:-translate-y-1 transition-all duration-300"
            spotlightColor="rgba(14, 165, 233, 0.2)"
          >
            <div className="w-20 h-20 rounded-2xl bg-blue-500/20 flex items-center justify-center">
              <svg className="w-10 h-10 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" />
                <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold">Consultancy Services</h3>
            <p className="text-neutral-400 text-center">Expert guidance for your business transformation and technical challenges. Let us help you navigate the digital landscape.</p>
            {/* <StarBorder
              color="#0EA5E9"
              speed="5s"
              className="mt-auto"
            >
              Get Started
            </StarBorder> */}
          </SpotlightCard>

          <SpotlightCard
            className="flex flex-col items-center gap-6 min-h-[400px] transform hover:-translate-y-1 transition-all duration-300"
            spotlightColor="rgba(252, 180, 31, 0.2)"
          >
            <div className="w-20 h-20 rounded-2xl bg-[#FCB41F]/20 flex items-center justify-center">
              <svg className="w-10 h-10 text-[#FCB41F]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 12H20M12 4V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold">Custom Development</h3>
            <p className="text-neutral-400 text-center">Tailored software solutions built with cutting-edge technology. From web apps to enterprise systems.</p>
            {/* <StarBorder
              color="#FCB41F"
              speed="5s"
              className="mt-auto"
            >
              Learn More
            </StarBorder> */}
          </SpotlightCard>

          <SpotlightCard
            className="flex flex-col items-center gap-6 min-h-[400px] transform hover:-translate-y-1 transition-all duration-300"
            spotlightColor="rgba(34, 197, 94, 0.2)"
          >
            <div className="w-20 h-20 rounded-2xl bg-green-500/20 flex items-center justify-center">
              <svg className="w-10 h-10 text-green-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6V18M18 12L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold">3D Printing</h3>
            <p className="text-neutral-400 text-center">Bring your ideas to life with our state-of-the-art 3D printing services. From prototypes to final products, we’ve got you covered.</p>
            {/* <StarBorder
              color="#22C55E"
              speed="5s"
              className="mt-auto"
            >
              Explore Services
            </StarBorder> */}
          </SpotlightCard>
        </div>


        <div className="col-span-full mb-32 mt-32">
          <h2 className="text-4xl font-bold text-center mb-6">Featured Products</h2>
          <p className="text-neutral-400 mb-12 max-w-2xl mx-auto text-center">
            Discover our cutting-edge products designed to transform your digital experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {featuredProducts.slice(0, 3).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                href={`/products/${product.id}`}
              />
            ))}
          </div>
          <div className="text-center mt-16">
            <a
              href="/products"
              className="inline-block px-8 py-4 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-all duration-300 text-lg font-semibold hover:shadow-lg hover:shadow-accent-500/25 transform hover:-translate-y-0.5"
            >
              View All Products
            </a>
          </div>
        </div>



        {/* Service Showcase Section */}
        <div className="w-full z-20 mt-32 ">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="aspect-video z-10 backdrop-blur-lg rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20 relative">
                  {/* Replace with your actual manufacturing/process image */}
                  <div className="absolute inset-0  flex items-center justify-center text-white/50">
                    Manufacturing Process Image
                  </div>
                </div>
                {/* <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-[#FCB41F] to-orange-600 rounded-2xl -z-10 blur-2xl opacity-30"></div> */}
              </div>

              <div>
                <h2 className="text-4xl font-bold mb-6">Crafting Excellence</h2>
                <p className="text-neutral-400 mb-8">
                  At LayerForge, we believe in creating products that redefine industry standards. Our rigorous development process ensures that every solution we deliver meets the highest quality benchmarks.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Quality Assurance</h3>
                      <p className="text-neutral-400">Rigorous testing and validation processes ensure reliable and robust solutions.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#FCB41F]/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-[#FCB41F]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
                      <p className="text-neutral-400">Dedicated team of experts providing round-the-clock assistance and guidance.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 10V3L4 14H11V21L20 10H13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Rapid Implementation</h3>
                      <p className="text-neutral-400">Swift deployment and integration processes to get you up and running quickly.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
      </div>
      <footer className="w-full backdrop-blur-lg mt-32  pt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-6">Ready to Scale?</h2>
              <p className="text-neutral-400 mb-8 max-w-md">
                Looking for enterprise solutions or bulk orders? Our team is here to help you find the perfect package for your organization.
              </p>
              <StarBorder
                color="#FCB41F"
                speed="5s"
              >
                Contact Sales Team
              </StarBorder>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold mb-4">Contact</h3>
                <div className="space-y-3 text-neutral-400">
                  <p>Email: sales@layerforge.com</p>
                  <p>Phone: +1 (555) 123-4567</p>
                  <p>Location: San Francisco, CA</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="border-t bg-transparent border-white/10 mt-12 pt-8 text-center text-neutral-400">
          <p>&copy; {new Date().getFullYear()} LayerForge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
