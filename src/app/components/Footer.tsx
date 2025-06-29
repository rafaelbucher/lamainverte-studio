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
    <footer className="w-full py-8">
        <h3 className="text-base font-primary text-black">
            L'expertise numérique, engagée et inclusive
        </h3>
    </footer>
  );
}