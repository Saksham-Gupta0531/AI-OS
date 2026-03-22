import React, { useState } from 'react';
import { packagesData } from './data/packages'; 
import PackageCard from './PackageCard';
import PackageModal from './PackageModal';
import bgImage from '../media/packages.png'; 
import Navbar from '../Navbar/Navbar';
export default function PackagesPage() {
  const [selectedAgent, setSelectedAgent] = useState(null);

  return (
    <div 
      className="relative min-h-screen w-80% bg-cover bg-center bg-fixed bg-[#0a0a0a]"
      style={{ backgroundImage: `url(${bgImage})` }} 
    >
      {/* FULL PAGE TINT: Dark over the whole image, with an orange glow on the right */}
      <div className="absolute inset-0 bg-black/50 z-0 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-r from-transparent to-[#FF5A06]/10 z-0 pointer-events-none"></div>

<div className="fixed top-0 left-0 w-full z-[999] bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-gray-800/80 shadow-2xl">
        <Navbar />
      
      </div>
      {/* Main Content Container */}
      <div className="relative z-10 w-full px-8 md:px-16 pt-24 pb-16 flex flex-col items-center">        
        {/* Title & Description Area */}
        <div className="text-center max-w-3xl mb-12 animate-fade-in">
          <h1 className="text-5xl font-extrabold text-white mb-6 tracking-tight">
            AI <span className="text-[#FF5A06]">Packages</span>
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            Packages are curated collections of specialized AI agents designed to handle complex workflows. Initialize a package to deploy a team of digital experts directly into your environment.
          </p>
        </div>

        <hr className="w-full max-w-6xl border-gray-700/80 mb-16 shadow-sm" />

        {/* MAPPING THROUGH CATEGORIES */}
        <div className="w-full max-w-7xl">
          {packagesData.map((category, index) => (
            <div key={category.categoryId} className="mb-16">
              
              {/* Category Header */}
              <div className="flex items-center mb-6">
                <div className="h-8 w-1.5 bg-[#FF5A06] rounded-full mr-4 shadow-[0_0_10px_rgba(255,90,6,0.5)]"></div>
                <h2 className="text-3xl font-bold text-white tracking-wide">{category.categoryTitle}</h2>
              </div>
              
              {/* Horizontally Scrollable Agent Row */}
              {/* Using snap-x for smooth scrolling feel */}
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

      {/* Render Modal if an agent is selected */}
      {selectedAgent && (
        <PackageModal 
          data={selectedAgent} 
          onClose={() => setSelectedAgent(null)} 
        />
      )}
    </div>
  );
}