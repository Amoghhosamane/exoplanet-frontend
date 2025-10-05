import React, { useState } from 'react';

// === REMOVED THE PREVIOUS TEXT-BASED NASALOGO SVG COMPONENT ===

// SVG for Search Icon (used on the left side)
const SearchIcon = () => (
    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
    </svg>
);

// SVG for Chevron Down Icon (for dropdowns)
const ChevronDownIcon = () => (
    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
    </svg>
);

export default function Navbar() {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const rightLinks = [
    { label: "News & Events", hasDropdown: true },
    { label: "Multimedia", hasDropdown: true },
  ];

  return (
    <nav className="sticky top-0 z-50">
      
      {/* 1. Top Blue Bar (Federal Notice) */}
      <div className="w-full bg-[#0b335a] py-1 text-center text-xs text-white">
        Due to the lapse in federal government funding, NASA is not updating this website.
      </div>

      {/* 2. Main Black Bar */}
      <div className="bg-black border-b border-gray-800">
        
        {/* Content Wrapper (Max width, Centered) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between relative">
          
          {/* A. Left Side: Explore & Search */}
          <div className="flex items-center space-x-6 h-full">
            <span className="text-white text-lg font-bold">Explore</span>
            
            {/* Search Input Container */}
            <div className={`relative ${isSearchFocused ? 'w-64' : 'w-48'} transition-all duration-300`}>
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full h-8 px-2 text-sm text-white bg-black border border-gray-600 focus:outline-none focus:border-white transition-colors duration-300"
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                />
                <div className="absolute top-1/2 right-1 transform -translate-y-1/2">
                    <SearchIcon />
                </div>
            </div>
          </div>
          
          {/* B. Centered NASA Meatball Logo (Absolute positioning for precision) */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 z-30">
            {/* !!! IMPORTANT: Replace 'nasa_meatball_logo.png' with the actual path to your saved image !!! */}
            {/* Assuming the image is in the 'public' folder or similar accessible path */}
            <a href="#" aria-label="Home">
                <img 
                    src="src\assets\NASA Meatball Logo.png" // <-- Update this path
                    alt="NASA Meatball Logo" 
                    className="h-10 w-auto" // Adjust height as needed
                />
            </a>
          </div>
          
          {/* C. Right Side: Navigation Links & NASA+ LIVE */}
          <div className="flex items-center space-x-6 h-full">
            {rightLinks.map(link => (
              <a 
                key={link.label} 
                href="#" 
                className="text-white hover:text-gray-400 flex items-center transition-colors duration-300 text-sm font-semibold"
              >
                {link.label}
                {link.hasDropdown && <ChevronDownIcon />}
              </a>
            ))}
            
            {/* NASA+ LIVE Button */}
            <div className="flex items-center space-x-1">
              <a 
                href="#nasa-live" 
                className="text-white font-bold text-sm"
              >
                NASA+
              </a>
              <span className="bg-red-600 text-white text-[10px] px-1 py-[1px] rounded font-extrabold tracking-widest">
                LIVE
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}