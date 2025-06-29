// src/app/offres/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nos offres - La main verte Studio',
  description: 'Découvrez nos services de développement web responsable et nos solutions numériques éco-conçues.',
};

export default function OffresPage() {
  return (
    <div className="min-h-screen bg-primary text-primary font-primary">
      <div className="container mx-auto px-8 py-20">
        <h1 className="text-5xl font-normal mb-8">Nos offres</h1>
        <p className="text-lg text-secondary">
          Page en construction...
        </p>
      </div>
    </div>
  );
}