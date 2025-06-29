// src/components/organisms/ChiffresSlider/ChiffresSlider.tsx
'use client';
import { useEffect, useState, useCallback } from 'react';

interface Slide {
  number: string;
  text: string;
}

export interface ChiffresSliderProps {
  className?: string;
  style?: React.CSSProperties;
  height?: string;
}

export default function ChiffresSlider({ 
  className = '',
  style,
  height = '400px'
}: ChiffresSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const slides: Slide[] = [
    {
      number: "4,4 %",
      text: "de l'empreinte carbone de la France liée au numérique en 2022, soit 29,5 millions de tonnes de CO₂ émises chaque année."
    },
    {
      number: "50 %",
      text: "de l'impact carbone du secteur provient de la fabrication et du fonctionnement des équipements."
    },
    {
      number: "x2 en 2 ans",
      text: "l'empreinte carbone du numérique en France a doublé entre 2020 et 2022."
    },
    {
      number: "+20 % de clients potentiels",
      text: "un site accessible touche jusqu'à 20 % de visiteurs supplémentaires."
    },
    {
      number: "Obligation légale",
      text: "depuis 2023, tous les sites publics doivent être accessibles (RGAA)."
    }
  ];

  // Navigation clavier
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCurrentSlide(prev => prev > 0 ? prev - 1 : slides.length - 1);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCurrentSlide(prev => prev < slides.length - 1 ? prev + 1 : 0);
    }
  }, [slides.length]);

  // Navigation touch
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      // Swipe up - slide suivant
      setCurrentSlide(prev => prev < slides.length - 1 ? prev + 1 : 0);
    } else if (distance < -minSwipeDistance) {
      // Swipe down - slide précédent
      setCurrentSlide(prev => prev > 0 ? prev - 1 : slides.length - 1);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    height,
    display: 'flex',
    flexDirection: 'column',
    ...style
  };

  return (
    <div className={className} style={containerStyle}>
      {/* Titre       <h3 style={{
        fontSize: 'var(--font-size-2xl)',
        fontWeight: 'var(--font-weight-bold)',
        color: 'var(--color-white)',
        marginBottom: 'var(--space-6)',
        textAlign: 'left'
      }}>
        Chiffres clés<br/> du numérique responsable
      </h3>
      */}


      {/* Container slider avec overflow */}
      <div 
        style={{
            flex: 1,
            overflow: 'hidden',
            position: 'relative'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slides */}
        <div style={{
          transform: `translateY(-${currentSlide * 100}%)`,
          transition: 'transform var(--transition-slow) ease-in-out',
          height: '100%'
        }}>
          {slides.map((slide, index) => (
            <div
              key={index}
              style={{
                position: 'relative',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
                textAlign: 'left',
                padding: 'var(--space-16)',
                borderRadius: '24px',
                backgroundColor: 'var(--color-primary)'
              }}
            >
                <h3 style={{
                    position: 'absolute',
                    top: '45px',
                    left: '75px',
                    fontSize: 'var(--font-size-2xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    lineHeight: 'var(--line-height-tight)',
                    color: 'var(--color-black)',
                    marginBottom: 'var(--space-6)',
                    textAlign: 'left'
                }}>
                    Chiffres clés <br/>du numérique responsable
                </h3>
              {/* Chiffre en grand */}
              <div style={{
                fontSize: 'var(--font-size-5xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--color-white)',
                lineHeight: 'var(--line-height-tight)',
                marginBottom: 'var(--space-4)',
                marginTop: 'var(--space-12)'
              }}>
                {slide.number}
              </div>
              
              {/* Texte explicatif */}
              <p style={{
                fontSize: 'var(--font-size-xl)',
                fontWeight: 'var(--font-weight-normal)',
                color: 'var(--color-black)',
                lineHeight: 'var(--line-height-relaxed)',
                margin: 0,
                marginRight: '50px'
              }}>
                {slide.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation bullets verticale */}
      <div style={{
        position: 'absolute',
        right: 'var(--space-8)',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2)'
      }}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: currentSlide === index ? 'var(--color-black)' : 'rgba(250, 250, 250, 0.25)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
            aria-label={`Aller au slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Instructions navigation (optionnel) */}
      <div style={{
        position: 'absolute',
        bottom: '25px',
        left: '145px',
        transform: 'translateX(-50%)',
        fontSize: 'var(--font-size-xs)',
        color: 'var(--color-white)',
        textAlign: 'left'
      }}>
        ↑↓ ou swipe pour naviguer
      </div>
    </div>
  );
}