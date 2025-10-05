import React from 'react';
import InteractiveTrainer from './components/InteractiveTrainer.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import HeroSection from './components/HeroSection.jsx'; // <-- NEW IMPORT

// NOTE: StarryBackground component removed.

function App() {
  return (
    // Set background to solid black (bg-black) to match the NASA design
    // Text color remains white for contrast
    <div className="relative text-white font-sans bg-black min-h-screen"> 
      
      {/* Ensures full vertical height and uses flex column */}
      <div className="relative z-10 flex flex-col min-h-screen"> 
        <Navbar />
        
        {/* NEW: Include the Hero Section here, outside the main content wrapper */}
        <HeroSection />

        {/* Main Content Area: uses flex-grow, max-w, and centering */}
        <main className="flex-grow w-full px-4 sm:px-8 py-12 max-w-7xl mx-auto">
          
          {/* New Introduction Text Section */}
          <section className="text-center mb-16 pt-8">
            <h2 className="text-sm tracking-widest uppercase text-gray-400 font-bold mb-2">
              The Lunar Gateway Challenge
            </h2>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Exoplanet Detection System
            </h1>
            <p className="text-gray-300 mt-4 text-lg md:text-xl max-w-4xl mx-auto">
              An interactive AI-powered tool developed to assist in the classification of exoplanet candidates, supporting NASA's mission to explore new worlds.
            </p>
          </section>

          {/* Interactive Trainer Component */}
          <InteractiveTrainer />
          
        </main>
        
        <Footer />
      </div>
    </div>
  );
}

export default App;