// components/HeroHome.tsx
'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import logo from '../assets/logo.svg';

export default function HeroHome() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const menuItems = [
    'offres',
    'démarche',
    'références',
    'à propos',
    'blog',
    'contact'
  ];

  return (
    <section 
      className="hero-banner"

    >
      {/* Header with slogan */}
      <header className="w-full">
        <div className="mb-8">
            <h1 className="hero-title">
                cultivons un web inclusif et responsable… <br/>pour une croissance durable
            </h1>
        </div>
      </header>

      {/* Navigation - Fixed top right */}
      <nav className="fixed top-8 right-10">
        <ul className="space-y-1 list-none text-right">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a 
                href="#" 
                className="text-base font-primary text-black link"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>

        {/* Hero Banner with Logo */}
        <div className="hero-logo">
            <Image 
            src={logo}
            alt="Logo La main vert Studio" 
            className="hero-logo__image"
            priority
            />
        </div>
    </section>
  );
}