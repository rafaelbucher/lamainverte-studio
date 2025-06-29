// src/app/contact/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact - La main verte Studio',
  description: 'Contactez-nous pour échanger sur votre projet web responsable et obtenir un devis personnalisé.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-primary text-primary font-primary">
      <div className="container mx-auto px-8 py-20">
        <h1 className="text-5xl font-normal mb-8">Contact</h1>
        <p className="text-lg text-secondary">
          Page en construction...
        </p>
      </div>
    </div>
  );
}