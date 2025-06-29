// src/app/a-propos/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'À propos - La main verte Studio',
  description: 'Découvrez l\'histoire de La main verte Studio, notre équipe et nos valeurs pour un web responsable.',
};

export default function AProposPage() {
  return (
    <div className="min-h-screen bg-primary text-primary font-primary">
      <div className="container mx-auto px-8 py-20">
        <h1 className="text-5xl font-normal mb-8">À propos</h1>
        <p className="text-lg text-secondary">
          Page en construction...
        </p>
      </div>
    </div>
  );
}