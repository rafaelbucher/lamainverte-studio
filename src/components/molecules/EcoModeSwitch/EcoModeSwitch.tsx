// src/components/molecules/EcoModeSwitch/EcoModeSwitch.tsx - Version diagnostic
'use client';

import React, { useState, useEffect } from 'react';

export interface EcoModeSwitchProps {
  className?: string;
  position?: 'fixed' | 'relative' | 'static' | 'absolute';
  style?: React.CSSProperties;
  showLabel?: boolean;
  labelPosition?: 'left' | 'right' | 'top' | 'bottom';
  labels?: {
    standard: string;
    eco: string;
  };
  onChange?: (isEcoMode: boolean) => void;
  size?: 'small' | 'medium' | 'large';
  controlled?: boolean;
  value?: boolean;
  showHints?: boolean;
}

const EcoModeSwitch: React.FC<EcoModeSwitchProps> = ({
  className = '',
  position = 'static',
  style,
  showLabel = true,
  labelPosition = 'left',
  labels = { standard: 'mode standard', eco: 'mode éco' },
  onChange,
  size = 'medium',
  controlled = false,
  value,
  showHints = true
}) => {
  const [isEcoMode, setIsEcoMode] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    if (!controlled) {
      // Vérification initiale
      const hasEcoMode = document.body.classList.contains('eco-mode');
      setIsEcoMode(hasEcoMode);
    }
  }, [controlled]);

  const currentMode = controlled ? (value ?? false) : isEcoMode;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('🖱️ Click détecté sur EcoModeSwitch');
    
    const newEcoMode = !currentMode;
    
    if (!controlled) {
      setIsEcoMode(newEcoMode);
      
      if (newEcoMode) {
        document.body.classList.add('eco-mode');
        console.log('✅ Mode éco activé');
      } else {
        document.body.classList.remove('eco-mode');
        console.log('❌ Mode éco désactivé');
      }
    }
    
    onChange?.(newEcoMode);
  };

  if (!mounted) {
    return null;
  }

  // Styles avec z-index élevé et pointer-events
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    position: position as any,
    zIndex: 999999, // Z-index très élevé pour test
    pointerEvents: 'auto',
    userSelect: 'none',
    ...style
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px',
    fontStyle: 'italic',
    color: '#4B4B4B',
    pointerEvents: 'none',
    userSelect: 'none'
  };

  const buttonStyle: React.CSSProperties = {
    display: 'flex',
    padding: '2px',
    border: '2px solid #4B4B4B',
    background: 'white',
    cursor: 'pointer',
    outline: 'none',
    pointerEvents: 'auto',
    zIndex: 999999,
    position: 'relative',
    // Ajout de styles de debug
    boxShadow: isHovered ? '0 0 10px rgba(255, 0, 0, 0.5)' : '0 0 5px rgba(0, 255, 0, 0.3)',
    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
    transition: 'all 0.2s ease'
  };

  const squareSize = 16;
  
  const squareStyle = (isActive: boolean): React.CSSProperties => ({
    width: `${squareSize}px`,
    height: `${squareSize}px`,
    backgroundColor: isActive ? '#3EDC81' : '#FFFFFF',
    border: `1px solid ${isActive ? '#3EDC81' : '#4B4B4B'}`,
    pointerEvents: 'none'
  });

  const displayText = currentMode ? labels.eco : labels.standard;

  return (
    <div 
      className={className} 
      style={containerStyle}
      onMouseEnter={() => {
        console.log('🐭 Mouse enter container');
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        console.log('🐭 Mouse leave container');
        setIsHovered(false);
      }}
    >
      {showLabel && labelPosition === 'left' && (
        <span style={labelStyle}>
          {displayText}
        </span>
      )}
      
      <button
        onClick={handleClick}
        onMouseDown={(e) => {
          console.log('🖱️ Mouse down sur button');
          e.preventDefault();
        }}
        onMouseUp={(e) => {
          console.log('🖱️ Mouse up sur button');
          e.preventDefault();
        }}
        style={buttonStyle}
        aria-label={`Basculer vers le ${currentMode ? 'mode standard' : 'mode éco'}`}
        type="button"
        data-testid="eco-mode-switch"
      >
        {/* Carré mode standard (gauche) */}
        <div style={squareStyle(!currentMode)} />
        
        {/* Carré mode éco (droite) */}
        <div style={squareStyle(currentMode)} />
      </button>
      
      {showLabel && labelPosition === 'right' && (
        <span style={labelStyle}>
          {displayText}
        </span>
      )}
      
      {/* Indicateur de debug */}
      <div style={{
        position: 'absolute',
        top: '-20px',
        left: '0',
        fontSize: '10px',
        color: 'red',
        background: 'yellow',
        padding: '2px 4px',
        pointerEvents: 'none'
      }}>
        {currentMode ? 'ÉCO' : 'STD'}
      </div>
    </div>
  );
};

export default EcoModeSwitch;