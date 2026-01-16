
import React, { useState, useMemo } from 'react';
import { RoadmapNode } from './components/RoadmapNode';
import { ROADMAP_DATA, CHECKPOINT_TEXT } from './constants';
import { RoadmapItem } from './types';

const App: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  const selectedItem = useMemo(() => 
    ROADMAP_DATA.find(item => item.id === selectedId)
  , [selectedId]);

  // Colores de los bordes de los círculos
  const circleColors = ['#f43f5e', '#ab022f', '#e11d48', '#be123c'];

  // Posiciones más verticales y sinuosas como la referencia
  const positions = [
    { x: 20, y: 75 },  // Nodo 1
    { x: 45, y: 30 },  // Nodo 2
    { x: 55, y: 70 },  // Nodo 3
    { x: 80, y: 25 },  // Nodo 4
  ];

  const generatePathData = () => {
    let d = `M -10 90 `; 
    d += `Q 10 90, ${positions[0].x} ${positions[0].y} `;
    d += `C ${positions[0].x + 15} ${positions[0].y - 40}, ${positions[1].x - 15} ${positions[1].y + 40}, ${positions[1].x} ${positions[1].y} `;
    d += `C ${positions[1].x + 15} ${positions[1].y - 40}, ${positions[2].x - 15} ${positions[2].y + 40}, ${positions[2].x} ${positions[2].y} `;
    d += `C ${positions[2].x + 15} ${positions[2].y - 40}, ${positions[3].x - 15} ${positions[3].y + 40}, ${positions[3].x} ${positions[3].y} `;
    d += `Q 95 10, 110 30`;
    return d;
  };

  const pathData = generatePathData();

  const handleLinkedInShare = (item: RoadmapItem) => {
    const careerTag = "Administración de Redes y Comunicaciones";
    const text = encodeURIComponent(`¡Módulo "${item.title}" completado en @Tecsup! 🚀 #${careerTag.replace(/\s+/g, '')} #Redes #Ciclo2`);
    const url = `https://www.linkedin.com/feed/?shareActive=true&text=${text}`;
    window.open(url, '_blank');
  };

  return (
    <div className="main-container select-none">
      
      {/* HEADER PROFESIONAL */}
      <header className="absolute top-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-[110] pointer-events-none w-full text-center px-4">
          <h1 className="text-xl md:text-3xl font-black text-[#6a041a] uppercase tracking-tighter leading-tight drop-shadow-sm">
            Administración de Redes y Comunicaciones
          </h1>
          <p className="text-[10px] md:text-xs text-[#ab022f] font-bold uppercase tracking-[0.2em] mt-2 opacity-70">
            Tecsup • Ciclo 2 • Roadmap Interactivo
          </p>
      </header>

      {/* VIEWPORT DEL MAPA */}
      <div className="roadmap-viewport">
        <svg viewBox="0 0 100 100" className="absolute w-full h-full road-path" preserveAspectRatio="none">
          <path d={pathData} fill="none" stroke="#ab022f" strokeWidth="12" strokeLinecap="round" className="opacity-10 translate-y-2" />
          <path d={pathData} fill="none" stroke="#ab022f" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
          <path d={pathData} fill="none" stroke="white" strokeWidth="0.3" strokeLinecap="round" className="opacity-20" />
        </svg>

        {/* NODOS CIRCULARES */}
        {ROADMAP_DATA.map((item, index) => (
          <div 
            key={item.id} 
            className="absolute"
            style={{ left: `${positions[index].x}%`, top: `${positions[index].y}%` }}
          >
            <RoadmapNode
              item={item}
              index={index}
              isSelected={selectedId === item.id}
              onClick={() => setSelectedId(selectedId === item.id ? null : item.id)}
              borderColor={circleColors[index % circleColors.length]}
            />
          </div>
        ))}

        {/* BOTÓN FINAL ESTILO ICONO */}
        <div className="absolute right-[5%] top-[15%]">
            <button 
                onClick={() => setShowCelebration(true)}
                className="w-16 h-16 bg-white border-4 border-[#ab022f] rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95 group"
            >
                <svg className="w-8 h-8 text-[#ab022f] group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
        </div>
      </div>

      {/* MODAL DE DETALLES */}
      {selectedItem && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#4c0519]/20 backdrop-blur-md" onClick={() => setSelectedId(null)} />
          
          <div className="relative w-full max-w-[380px] bg-white rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in duration-300 border border-rose-100">
            <div className="p-8 pb-4">
               <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-[#ab022f] font-black text-xl border border-rose-100">
                    {selectedItem.id}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-[#6a041a] uppercase leading-tight">{selectedItem.title}</h3>
                    <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">Tecsup Networking</p>
                  </div>
               </div>
               
               <p className="text-xs text-gray-500 font-medium leading-relaxed mb-6 italic">"{selectedItem.description}"</p>

               <div className="space-y-3">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Contenido NetAcad:</p>
                  {selectedItem.officialCourses.map((c, i) => (
                    <a key={i} href={c.url} target="_blank" className="group flex items-center justify-between bg-rose-50/50 p-4 rounded-2xl border border-rose-100/50 hover:bg-rose-50 transition-all">
                      <span className="text-[11px] font-bold text-gray-700 truncate pr-4">{c.name}</span>
                      <div className="w-6 h-6 rounded-lg bg-white flex items-center justify-center shadow-sm">
                        <svg className="w-3 h-3 text-[#ab022f]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                      </div>
                    </a>
                  ))}
               </div>
            </div>

            {/* BOTONES ACTUALIZADOS SEGÚN REFERENCIA (YouTube Rojo, LinkedIn Azul) */}
            <div className="p-8 pt-4 flex flex-col gap-3">
                <div className="flex gap-3">
                  {selectedItem.videoUrl && (
                    <button 
                      onClick={() => window.open(selectedItem.videoUrl, '_blank')} 
                      className="flex-1 bg-[#E62117] text-white py-4 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-rose-200 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 4-8 4z"/></svg>
                      VIDEO DEMO
                    </button>
                  )}
                  <button 
                    onClick={() => handleLinkedInShare(selectedItem)} 
                    className="flex-1 bg-[#0A66C2] text-white py-4 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-100 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    COMPARTIR
                  </button>
                </div>
            </div>
          </div>
        </div>
      )}

      {/* CELEBRACIÓN FINAL - FONDO BLANCO CON BORDES ROJOS */}
      {showCelebration && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 animate-in fade-in">
          <div className="absolute inset-0 bg-white/60 backdrop-blur-md" />
          <div className="relative w-full max-w-sm bg-white border-[6px] border-[#ab022f] rounded-[48px] p-10 text-center shadow-2xl overflow-hidden">
            {/* Decoración sutil de fondo */}
            <div className="absolute top-0 left-0 w-full h-2 bg-[#ab022f]"></div>
            
            <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce border-2 border-rose-100">
              <span className="text-4xl">🎓</span>
            </div>
            
            <h2 className="text-2xl font-black text-[#6a041a] uppercase tracking-tighter mb-3">¡Misión Cumplida!</h2>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-6 opacity-60">Ciclo 2 • Tecsup</p>
            
            <p className="text-sm text-gray-600 font-semibold mb-10 leading-relaxed px-2">
              {CHECKPOINT_TEXT}
            </p>
            
            <button 
              onClick={() => setShowCelebration(false)} 
              className="w-full bg-[#ab022f] text-white py-5 rounded-3xl font-black text-xs tracking-widest shadow-xl shadow-rose-200 active:scale-95 transition-all"
            >
              VOLVER AL ROADMAP
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
