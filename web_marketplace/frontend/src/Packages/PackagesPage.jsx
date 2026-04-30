import React, { useState, useEffect } from 'react';
import { packagesData as defaultPackages } from './data/packages'; 
import PackageCard from './PackageCard';
import PackageModal from './PackageModal';
import bgImage from '../media/packages.png'; 
import Navbar from '../Navbar/Navbar';
export default function PackagesPage() {
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [packagesData, setPackagesData] = useState(defaultPackages);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/packages');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            const combinedMap = new Map();
            defaultPackages.forEach(p => combinedMap.set(p.categoryId, { ...p, agents: [...p.agents] }));
            
            data.forEach(p => {
              if (combinedMap.has(p.categoryId)) {
                const existing = combinedMap.get(p.categoryId);
                existing.agents = [...existing.agents, ...p.agents];
              } else {
                combinedMap.set(p.categoryId, p);
              }
            });
            
            setPackagesData(Array.from(combinedMap.values()));
          }
        }
      } catch (error) {
        console.error("Failed to fetch packages from backend", error);
      }
    };
    fetchPackages();
  }, []);

  return (
    <div 
      className="relative min-h-screen w-80% bg-cover bg-center bg-fixed bg-[#0a0a0a]"
      style={{ backgroundImage: `url(${bgImage})` }} 
    >
      <div className="absolute inset-0 bg-black/50 z-0 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-r from-transparent to-[#FF5A06]/10 z-0 pointer-events-none"></div>

<div className="fixed top-0 left-0 w-full z-[999] bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-gray-800/80 shadow-2xl">
        <Navbar />
      
      </div>

      <div className="relative z-10 w-full px-8 md:px-16 pt-24 pb-16 flex flex-col items-center">        
        <div className="text-center max-w-3xl mb-12 animate-fade-in">
          <h1 className="text-5xl font-extrabold text-white mb-6 tracking-tight">
            AI <span className="text-[#FF5A06]">Packages</span>
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            Packages are curated collections of specialized AI agents designed to handle complex workflows. Initialize a package to deploy a team of digital experts directly into your environment.
          </p>
        </div>

        <hr className="w-full max-w-6xl border-gray-700/80 mb-16 shadow-sm" />

        <div className="w-full max-w-7xl">
          {packagesData.map((category, index) => (
            <div key={category.categoryId} className="mb-16">
              
              <div className="flex items-center mb-6">
                <div className="h-8 w-1.5 bg-[#FF5A06] rounded-full mr-4 shadow-[0_0_10px_rgba(255,90,6,0.5)]"></div>
                <h2 className="text-3xl font-bold text-white tracking-wide">{category.categoryTitle}</h2>
              </div>
              
              <div className="flex overflow-x-auto gap-6 pb-6 pt-2 snap-x snap-mandatory hide-scrollbar">
                {category.agents.map((agent) => (
                  <PackageCard 
                    key={agent.id} 
                    data={agent} 
                    onClick={setSelectedAgent} 
                  />
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>

      {selectedAgent && (
        <PackageModal 
          data={selectedAgent} 
          onClose={() => setSelectedAgent(null)} 
        />
      )}
    </div>
  );
}