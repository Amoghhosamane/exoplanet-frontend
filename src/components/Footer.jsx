import React from 'react';

// Reusing the NASA Logo SVG from the Navbar for the footer branding
const NasaLogo = () => (
  <svg height="30" viewBox="0 0 133 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 30V0H10.8347V19.1653H11.0063L21.6667 0H30V30H19.1653V10.8347H19.006L8.33333 30H0Z" fill="white"/>
    <path d="M37.5 30V0H60V8.33333H48.3333V10.8333H58.3333V19.1667H48.3333V21.6667H60V30H37.5Z" fill="white"/>
    <path d="M67.5 30V0H90V8.33333H78.3333V10.8333H88.3333V19.1667H78.3333V21.6667H90V30H67.5Z" fill="white"/>
    <path d="M103.333 30C95.5556 30 91.6667 25.5556 91.6667 18.3333V11.6667C91.6667 4.44444 95.5556 0 103.333 0C111.111 0 115 4.44444 115 11.6667V18.3333C115 25.5556 111.111 30 103.333 30ZM103.333 22.5C106.389 22.5 107.5 20.2778 107.5 16.25V13.75C107.5 9.72222 106.389 7.5 103.333 7.5C100.278 7.5 99.1667 9.72222 99.1667 13.75V16.25C99.1667 20.2778 100.278 22.5 103.333 22.5Z" fill="white"/>
    <path d="M124.167 30V0H133.333L125.556 12.5H133.333V20.8333H123.333L132.5 30H124.167Z" fill="#FC3D21"/>
  </svg>
);

export default function Footer() {
  const footerLinks = [
    { title: "Programs", links: ["Artemis", "Commercial Space", "ISS", "Deep Space"] },
    { title: "Resources", links: ["Data Policy", "Privacy", "Sitemap", "About"] },
    { title: "Exo-Stacker", links: ["The Challenge", "Model Insights", "Source Code", "Contact Team"] },
  ];

  return (
    // Main Footer Container: Darker background, padding
    <footer className="bg-gray-900 text-gray-400 pt-12 pb-6 border-t border-red-600">
      
      {/* Content Wrapper (max-width centered) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Top Section: Logo and Link Grid */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-stretch mb-8">
          
          {/* Logo and Contact Info (Left) */}
          <div className="mb-8 md:mb-0">
            <a href="#" aria-label="Home" className="inline-block mb-4">
              <NasaLogo />
            </a>
            <p className="text-sm font-semibold text-white mt-4">NATIONAL AERONAUTICS AND SPACE ADMINISTRATION</p>
            <p className="text-xs text-gray-500 mt-1">NASA Official: <a href="#" className="underline hover:text-white">Exploration Directorate</a></p>
          </div>
          
          {/* Link Columns (Right) */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
            {footerLinks.map(section => (
              <div key={section.title}>
                <h3 className="text-white font-bold mb-3 uppercase text-sm tracking-wider">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map(link => (
                    <li key={link}>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom Bar: Copyright and Project Attribution */}
        <div className="border-t border-gray-700 pt-4 text-center">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Exo-Stacker v9.0 | Developed by VyomTarak for the NASA Space Apps Challenge.
          </p>
          <p className="mt-1 text-xs text-gray-600">
            This project is an independent submission and is not officially endorsed by NASA.
          </p>
        </div>
      </div>
    </footer>
  );
}