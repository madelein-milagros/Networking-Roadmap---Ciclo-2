
import React from 'react';
import { RoadmapItem } from '../types';

interface RoadmapNodeProps {
  item: RoadmapItem;
  index: number;
  isSelected: boolean;
  onClick: () => void;
  position: { x: number; y: number };
}

export const RoadmapNode: React.FC<RoadmapNodeProps> = ({ item, index, isSelected, onClick, position }) => {
  const isLabelAbove = position.y > 600;

  return (
    <div 
      className={`absolute transition-all duration-300 ${isSelected ? 'z-[100]' : 'z-20'}`}
      style={{ left: position.x, top: position.y, transform: 'translate(-50%, -50%)' }}
    >
      {/* Botón del Nodo */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        className={`group relative flex items-center justify-center w-20 h-20 md:w-32 md:h-32 rounded-[30px] md:rounded-[45px] border-[6px] md:border-[10px] transition-all duration-300 shadow-xl ${
          isSelected 
          ? 'bg-[#ab022f] border-white scale-110' 
          : 'bg-white border-[#ab022f] hover:scale-105 active:scale-95'
        } ${!isSelected && 'node-pulse'}`}
      >
        <span className={`text-3xl md:text-5xl font-black ${isSelected ? 'text-white' : 'text-[#ab022f]'}`}>
          {index + 1}
        </span>
        
        {/* Título del Nodo (Siempre legible) */}
        {!isSelected && (
          <div className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap bg-white px-4 py-2 rounded-2xl shadow-xl border-2 border-slate-100 transition-all pointer-events-none ${
            isLabelAbove ? '-top-16' : 'top-24 md:top-36'
          }`}>
            <span className="text-[10px] md:text-sm font-black text-[#6a041a] uppercase tracking-tighter">
              {item.title}
            </span>
          </div>
        )}

        {/* Pequeño indicador de "click aquí" */}
        {!isSelected && (
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#6a041a] rounded-full border-4 border-white flex items-center justify-center animate-bounce shadow-lg">
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M12 4v16m8-8H4" /></svg>
          </div>
        )}
      </button>
    </div>
  );
};
