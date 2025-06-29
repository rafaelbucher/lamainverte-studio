// src/app/error.tsx
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from './assets/logo.svg';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log de l'erreur pour monitoring
    console.error('Erreur capturée:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary text-primary font-primary">
      <div className="max-w-2xl mx-auto text-center px-8">
        {/* Logo */}
        <div className="mb-16">
          <Image 
            src={logo}
            alt="Logo La main verte Studio"
            className="w-64 mx-auto"
            priority
          />
        </div>

        {/* Titre d'erreur */}
        <h1 className="text-5xl font-normal mb-8 text-accent">
          Oups !
        </h1>

        {/* Message */}
        <h2 className="text-2xl font-normal mb-6 text-primary">
          Une erreur s&apos;est produite
        </h2>
        
        <p className="text-lg mb-12 text-secondary leading-relaxed">
          Nous rencontrons actuellement un problème technique.
          <br />
          Notre équipe a été notifiée et travaille à résoudre le problème.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            onClick={reset}
            className="inline-block px-8 py-4 bg-accent text-white font-medium transition-colors hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Réessayer
          </button>
          
          <Link 
            href="/"
            className="inline-block px-8 py-4 border-2 border-accent text-accent font-medium transition-colors hover:bg-accent hover:text-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
          >
            Retour à l&apos;accueil
          </Link>
        </div>

        {/* Contact */}
        <div className="mt-16 pt-8 border-t border-border-light">
          <p className="text-sm text-muted mb-4">
            Le problème persiste ?
          </p>
          <Link 
            href="/contact"
            className="text-accent hover:text-primary transition-colors underline"
          >
            Contactez notre équipe support
          </Link>
        </div>

        {/* Debug info en dev */}
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-8 text-left bg-gray-100 p-4 rounded text-sm">
            <summary className="cursor-pointer font-medium">
              Détails de l&apos;erreur (dev)
            </summary>
            <pre className="mt-2 whitespace-pre-wrap">
              {error.message}
              {error.stack}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}