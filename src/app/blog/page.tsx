// src/app/blog/page.tsx - Version simple en construction
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - La main verte Studio',
  description: 'Actualités, réflexions et conseils sur le développement web responsable et le numérique durable.',
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-primary text-primary font-primary">
      <div className="container mx-auto px-8 py-20">
        <h1 className="text-5xl font-normal mb-8">Blog</h1>
        <p className="text-lg text-secondary">
          Page en construction...
        </p>
      </div>
    </div>
  );
}