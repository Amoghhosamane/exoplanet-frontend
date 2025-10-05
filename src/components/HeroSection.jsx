import React from 'react';

// SVG for the NASA "Worm" Logo used in the hero text
const NasaWormLogo = () => (
    <svg className="h-6 inline-block fill-white align-text-bottom" viewBox="0 0 171 40" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.4 39.8L0 27.4V0H12.4V27.4L24.8 39.8H12.4Z" />
        <path d="M49.6 39.8L37.2 27.4V0H49.6V27.4L62 39.8H49.6Z" />
        <path d="M74.8 39.8L62.4 27.4V0H74.8V27.4L87.2 39.8H74.8Z" />
        <path d="M112 39.8L99.6 27.4V0H112V27.4L124.4 39.8H112Z" />
        <path d="M137.2 39.8L124.8 27.4V0H137.2V27.4L149.6 39.8H137.2Z" />
        <path d="M162.4 39.8L150 27.4V0H162.4V27.4L174.8 39.8H162.4Z" />
    </svg>
);

export default function HeroSection() {
    return (
        // The hero section spans the full width of the screen
        // Placeholder background mimicking the visual effect from the screenshot
        <div className="w-full bg-gray-700 py-20 md:py-32 relative overflow-hidden" 
             style={{ 
                 // Replace this line with your actual image URL if you have one
                 backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('your-artemis-image.jpg')`,
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
                 minHeight: '40vh' // Set a minimum height for the visual impact
             }}>
            
            {/* Content centered and max-width constrained */}
            <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center relative z-20">
                
                {/* Small Header */}
                <p className="text-xl md:text-2xl font-light text-gray-300 uppercase tracking-widest mb-4">
                    <NasaWormLogo /> ARTEMIS PROGRAM
                </p>

                {/* Main Heading (Mimics the "Return to the Moon" text) */}
                <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter leading-none" 
                    style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.4)' }}>
                    Advanced AI model exoplanet detector
                </h1>

                {/* Call to Action/Subtitle */}
                <p className="mt-6 text-xl md:text-2xl max-w-3xl mx-auto text-gray-200">
                    Exploring the cosmos for humanity's next great leap.
                </p>

            </div>
            {/* Optional: Add a subtle separator bar like in the NASA site */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-red-600"></div>
        </div>
    );
}