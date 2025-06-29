// app/page.tsx
import HeroHome from './components/HeroHome';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className='w-full px-8 relative bg-white text-black font-primary bg-white'>
      <HeroHome />
      {/* Le reste de ta page */}
      <Footer />
    </div>
  );
}