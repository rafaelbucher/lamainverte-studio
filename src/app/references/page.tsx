// src/app/references/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nos références - La main verte Studio',
  description: 'Découvrez nos réalisations et projets web responsables pour nos clients.',
};

export default function ReferencesPage() {
  return (
    <div className="min-h-screen bg-primary text-primary font-primary">
      <div className="container mx-auto px-8 py-20">
        <h1 className="text-5xl font-normal mb-8">Nos références</h1>
        <p className="text-lg text-secondary">
          Page en construction...
        </p>
      </div>
    </div>
  );
}