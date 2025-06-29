// src/app/not-found.tsx
import Link from 'next/link';
import Image from 'next/image';
import logo from './assets/logo.svg';

export default function NotFound() {
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
          404
        </h1>

        {/* Message */}
        <h2 className="text-2xl font-normal mb-6 text-primary">
          Page non trouvée
        </h2>
        
        <p className="text-lg mb-12 text-secondary leading-relaxed">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
          <br />
          Retournons ensemble vers des horizons plus verts.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link 
            href="/"
            className="inline-block px-8 py-4 bg-accent text-white font-medium transition-colors hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Retour à l&apos;accueil
          </Link>
          
          <Link 
            href="/contact"
            className="inline-block px-8 py-4 border-2 border-accent text-accent font-medium transition-colors hover:bg-accent hover:text-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
          >
            Nous contacter
          </Link>
        </div>

        {/* Navigation rapide */}
        <div className="mt-16 pt-8 border-t border-border-light">
          <p className="text-sm text-muted mb-4">
            Pages principales :
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/offres" className="text-accent hover:text-primary transition-colors underline">
              Nos offres
            </Link>
            <Link href="/demarche" className="text-accent hover:text-primary transition-colors underline">
              Notre démarche
            </Link>
            <Link href="/references" className="text-accent hover:text-primary transition-colors underline">
              Nos références
            </Link>
            <Link href="/blog" className="text-accent hover:text-primary transition-colors underline">
              Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}