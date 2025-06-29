// src/app/demarche/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Notre démarche - La main verte Studio',
  description: 'Découvrez notre approche responsable du développement web et notre engagement pour un numérique durable.',
};

export default function DemarchePage() {
  return (
    <div className="min-h-screen bg-primary text-primary font-primary">
      <div className="container mx-auto px-8 py-20">
        <h1 className="text-5xl font-normal mb-8">Notre démarche</h1>
        <p className="text-lg text-secondary">
          Page en construction...
        </p>
      </div>
    </div>
  );
}