
import React from 'react';
import { RoadmapItem } from '../types';

interface RoadmapNodeProps {
  item: RoadmapItem;
  index: number;
  isSelected: boolean;
  onClick: () => void;
  borderColor: string;
}

export const RoadmapNode: React.FC<RoadmapNodeProps> = ({ item, index, isSelected, onClick, borderColor }) => {
  
  // Iconos minimalistas por materia
  const getIcon = () => {
    switch(index) {
      case 0: // Ciberseguridad
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      case 1: // Programación
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      case 2: // Hardware
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        );
      case 3: // Networking
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        );
      default:
        return <span>{index + 1}</span>;
    }
  };

  return (
    <div className={`relative -translate-x-1/2 -translate-y-1/2 group transition-all duration-500 ${isSelected ? 'scale-110' : ''}`}>
      
      {/* Círculo Principal Estilo Flat */}
      <button
        onClick={onClick}
        className={`relative w-14 h-14 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center transition-all duration-300 shadow-xl border-[6px] md:border-[8px] animate-float ${
          isSelected 
          ? 'scale-125 border-[#ab022f] z-50' 
          : 'hover:scale-110 z-10'
        }`}
        style={{ borderColor: isSelected ? '#ab022f' : borderColor }}
      >
        <div className={`transition-colors duration-300 ${isSelected ? 'text-[#ab022f]' : 'text-gray-400 group-hover:text-gray-600'}`}>
          {getIcon()}
        </div>
      </button>

      {/* Etiqueta de Título (Minimalista) */}
      <div className={`absolute top-full mt-6 left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-300 ${
        isSelected ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-2 scale-90 pointer-events-none'
      }`}>
        <div className="bg-[#6a041a] px-4 py-2 rounded-2xl shadow-xl">
           <span className="text-[10px] font-black text-white uppercase tracking-widest">
             {item.title}
           </span>
        </div>
      </div>
    </div>
  );
};
