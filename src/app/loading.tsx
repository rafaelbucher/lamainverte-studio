// src/app/loading.tsx
import Image from 'next/image';
import logo from './assets/logo.svg';

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary">
      <div className="text-center">
        {/* Logo avec animation subtile */}
        <div className="mb-8 animate-pulse">
          <Image 
            src={logo}
            alt="Logo La main verte Studio"
            className="w-48 mx-auto opacity-80"
            priority
          />
        </div>

        {/* Indicateur de chargement */}
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="w-3 h-3 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>

        {/* Message */}
        <p className="text-accent font-primary text-lg">
          Chargement en cours...
        </p>
      </div>
    </div>
  );
}