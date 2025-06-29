// components/Header.tsx
'use client';
import { useEffect, useState } from 'react';

export default function Header() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const menuItems = [
    'Accueil',
    'Nos offres',
    'Notre démarche',
    'Réalisations / Références',
    'Blog',
    'À propos',
    'Contact'
  ];

  return (
    <header className="w-full py-8">
      {/* Top section with slogan */}
      <div className="mb-8">
        <h1 className="text-base font-primary text-black">
          L'expertise numérique, engagée et inclusive
        </h1>
      </div>
      
      {/* Navigation - Fixed top right */}
      <nav className="fixed top-8 right-10">
        <ul className="space-y-3 list-none text-right">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a 
                href="#" 
                className="link"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}