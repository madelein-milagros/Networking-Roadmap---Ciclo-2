
import React from 'react';
import { RoadmapItem } from '../types';

interface RoadmapNodeProps {
  item: RoadmapItem;
  index: number;
  isSelected: boolean;
  onClick: () => void;
  position: { x: number; y: number };
  onShare: () => void;
}

export const RoadmapNode: React.FC<RoadmapNodeProps> = ({ item, index, isSelected, onClick, position, onShare }) => {
  // Posicionamiento de la tarjeta basado en la ubicación del nodo
  const isLabelAbove = position.y > 600;

  return (
    <div 
      className={`absolute transition-all duration-300 ${isSelected ? 'z-[60]' : 'z-20'}`}
      style={{ left: position.x, top: position.y, transform: 'translate(-50%, -50%)' }}
    >
      {/* NODO DE CARRETERA */}
      <button
        onClick={onClick}
        className={`group relative flex items-center justify-center w-20 h-20 md:w-28 md:h-28 rounded-full border-[10px] transition-all duration-300 shadow-2xl ${
          isSelected 
          ? 'bg-[#ab022f] border-white scale-125' 
          : 'bg-white border-[#ab022f] hover:scale-110'
        } ${!isSelected && 'node-pulse'}`}
      >
        <span className={`text-5xl font-black ${isSelected ? 'text-white' : 'text-[#ab022f]'}`}>
          {index + 1}
        </span>
        
        {/* TÍTULO FLOTANTE */}
        {!isSelected && (
          <div className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/95 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-xl border-2 border-gray-50 transition-all pointer-events-none ${
            isLabelAbove ? '-top-20' : 'top-32'
          }`}>
            <span className="text-[14px] font-black text-[#6a041a] uppercase tracking-tight">{item.title}</span>
          </div>
        )}
      </button>

      {/* TARJETA DE DETALLES GRANDE */}
      {isSelected && (
        <div 
          className={`absolute left-1/2 -translate-x-1/2 w-[450px] bg-white rounded-[40px] shadow-[0_35px_70px_-15px_rgba(0,0,0,0.3)] border-[3px] border-[#ab022f] p-10 animate-in zoom-in slide-in-from-bottom-4 duration-300 ${
            isLabelAbove ? 'bottom-40' : 'top-40'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Triángulo indicador */}
          <div className={`absolute left-1/2 -translate-x-1/2 w-8 h-8 bg-white border-[3px] border-[#ab022f] rotate-45 z-[-1] ${
            isLabelAbove ? '-bottom-4 border-t-0 border-l-0' : '-top-4 border-b-0 border-r-0'
          }`}></div>

          <div className="flex justify-between items-start mb-6">
             <div>
                <span className="text-[11px] font-black text-[#ab022f] uppercase tracking-[0.2em] bg-red-50 px-3 py-1 rounded-full border border-red-100">Módulo de Especialización 0{index + 1}</span>
                <h3 className="text-3xl font-black text-[#6a041a] leading-tight mt-3 tracking-tighter">{item.title}</h3>
             </div>
             <button 
                onClick={onClick} 
                className="p-2 bg-gray-50 hover:bg-red-50 text-gray-300 hover:text-red-600 rounded-full transition-all active:scale-90"
             >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
             </button>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-3xl border border-gray-100 shadow-inner">
              <p className="text-[15px] text-gray-700 font-semibold italic leading-relaxed">"{item.description}"</p>
            </div>

            <div className="space-y-3">
              <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Cursos Cisco NetAcad:</p>
              {item.officialCourses.map((c, i) => (
                <a 
                  key={i} 
                  href={c.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-between bg-white border-2 border-gray-50 p-4 rounded-2xl hover:border-[#ab022f] hover:shadow-md transition-all group/link"
                >
                  <span className="text-[14px] font-bold text-blue-900 group-hover/link:text-[#ab022f] truncate pr-4">
                    🔗 {c.name.includes('–') ? c.name.split('–')[1] : c.name}
                  </span>
                  <svg className="w-5 h-5 text-[#ab022f] opacity-0 group-hover/link:opacity-100 transform translate-x-2 group-hover/link:translate-x-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </a>
              ))}
            </div>

            <div className="flex gap-3 pt-2">
              {item.videoUrl && (
                <button 
                  onClick={() => window.open(item.videoUrl, '_blank')}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-4 rounded-2xl text-[12px] font-black uppercase flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-red-200 active:scale-95"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 4-8 4z"/></svg>
                  Clase YouTube
                </button>
              )}
              <button 
                onClick={onShare}
                className="flex-1 bg-[#0077b5] hover:bg-[#005c8a] text-white py-4 rounded-2xl text-[12px] font-black uppercase flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-blue-200 active:scale-95"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                LinkedIn
              </button>
            </div>
            
            <div className="bg-[#6a041a] p-4 rounded-2xl text-center shadow-lg border border-white/10">
              <p className="text-[11px] text-red-100 font-black uppercase tracking-[0.2em]">🏆 Certificación: {item.certification}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
