// components/Hero.tsx
'use client';
import Image from 'next/image';
import logo from '../assets/logo.svg';

export default function Hero() {
  return (
    <section className="w-full flex items-center justify-center py-20">
      <div className="max-w-3xl w-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-full max-w-2xl mx-auto">
            <Image 
              src={logo}
              alt="Logo Krabb Studio" 
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}