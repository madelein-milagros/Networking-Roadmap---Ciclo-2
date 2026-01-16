
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { RoadmapNode } from './components/RoadmapNode';
import { ROADMAP_DATA, CHECKPOINT_TEXT } from './constants';
import { RoadmapItem } from './types';

const App: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedItem = useMemo(() => 
    ROADMAP_DATA.find(item => item.id === selectedId)
  , [selectedId]);

  // Posicionamiento de los nodos en el canvas de 3200px x 1200px
  const positions = [
    { x: 400, y: 450 },
    { x: 950, y: 750 },
    { x: 1500, y: 450 },
    { x: 2050, y: 750 },
  ];

  const checkpointPos = { x: 2750, y: 600 };

  const generatePathData = () => {
    const startX = 0;
    const startY = 450;
    let d = `M ${startX} ${startY}`;
    const allPoints = [...positions, checkpointPos];
    let currentX = startX;
    let currentY = startY;

    allPoints.forEach((point) => {
      const cp1x = currentX + (point.x - currentX) / 2;
      const cp1y = currentY;
      const cp2x = currentX + (point.x - currentX) / 2;
      const cp2y = point.y;
      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${point.x} ${point.y}`;
      currentX = point.x;
      currentY = point.y;
    });
    return d;
  };

  const pathData = generatePathData();

  const handleLinkedInShare = (item: RoadmapItem) => {
    const text = encodeURIComponent(`¡He completado el módulo de "${item.title}" en mi formación de Redes en Tecsup! 🚀 #Tecsup #Networking #Ciclo2`);
    const url = `https://www.linkedin.com/feed/?shareActive=true&text=${text}`;
    window.open(url, '_blank');
  };

  // Efecto para scroll inicial suave hacia el primer nodo
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = 0;
      containerRef.current.scrollTop = 200;
    }
  }, []);

  return (
    <div className="main-container custom-scrollbar select-none" ref={containerRef}>
      
      {/* MODAL DE CELEBRACIÓN */}
      {showCelebration && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-[#6a041a]/90 backdrop-blur-xl p-6 animate-in fade-in duration-500">
          <div className="bg-white rounded-[50px] shadow-2xl p-10 max-w-md w-full text-center animate-in zoom-in duration-300 border-8 border-white">
            <div className="text-8xl mb-6">🎓</div>
            <h2 className="text-4xl font-black text-[#6a041a] mb-4 uppercase tracking-tighter">¡NIVEL ALCANZADO!</h2>
            <p className="text-xl text-slate-600 font-bold mb-8">Has dominado las competencias fundamentales del Ciclo 2 de Redes.</p>
            <button 
              onClick={() => setShowCelebration(false)}
              className="w-full bg-[#ab022f] hover:bg-[#6a041a] text-white py-5 rounded-3xl font-black text-xl shadow-xl transition-all active:scale-95"
            >
              CONTINUAR VIAJE
            </button>
          </div>
        </div>
      )}

      {/* MODAL DE DETALLES (EL CORAZÓN DEL RESPONSIVE) */}
      {selectedItem && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200">
          {/* Fondo oscuro con cierre al click */}
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setSelectedId(null)} />
          
          {/* Tarjeta Adaptable */}
          <div className="relative w-full max-w-[500px] bg-white rounded-[40px] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)] border-[4px] border-[#ab022f] flex flex-col max-h-[90vh] animate-in zoom-in slide-in-from-bottom-8 duration-300 overflow-hidden">
            
            {/* Cabecera Fija */}
            <div className="p-6 md:p-10 pb-4 flex justify-between items-start shrink-0">
               <div className="pr-4">
                  <span className="text-[10px] font-black text-[#ab022f] uppercase tracking-[0.2em] bg-red-50 px-4 py-1.5 rounded-full border border-red-100 inline-block">Módulo 0{ROADMAP_DATA.indexOf(selectedItem) + 1}</span>
                  <h3 className="text-2xl md:text-4xl font-black text-[#6a041a] leading-tight mt-3 tracking-tighter uppercase">{selectedItem.title}</h3>
               </div>
               <button 
                  onClick={() => setSelectedId(null)} 
                  className="p-3 bg-gray-100 hover:bg-red-600 hover:text-white text-gray-400 rounded-2xl transition-all active:scale-90 shrink-0 shadow-sm"
                  aria-label="Cerrar"
               >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
               </button>
            </div>

            {/* Contenido con Scroll Propio */}
            <div className="px-6 md:px-10 pb-10 overflow-y-auto custom-scrollbar flex-1 space-y-6">
              <div className="bg-slate-50 p-6 rounded-[30px] border border-slate-100">
                <p className="text-[15px] md:text-lg text-slate-700 font-medium leading-relaxed italic">"{selectedItem.description}"</p>
              </div>

              <div className="space-y-3">
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">📚 Recursos Cisco:</p>
                {selectedItem.officialCourses.map((c, i) => (
                  <a 
                    key={i} 
                    href={c.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-between bg-white border-2 border-slate-100 p-5 rounded-2xl hover:border-[#ab022f] hover:bg-red-50/50 transition-all group shadow-sm active:scale-[0.98]"
                  >
                    <span className="text-[14px] md:text-base font-bold text-slate-700 group-hover:text-[#ab022f] truncate pr-3">
                      {c.name}
                    </span>
                    <svg className="w-5 h-5 text-[#ab022f] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                ))}
              </div>

              <div className="bg-[#6a041a] p-5 rounded-2xl text-center shadow-lg border-b-4 border-[#4a0312]">
                <p className="text-xs text-red-100 font-black uppercase tracking-widest">🎖️ Certificado Sugerido:</p>
                <p className="text-white font-bold text-lg mt-1">{selectedItem.certification}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedItem.videoUrl && (
                  <button 
                    onClick={() => window.open(selectedItem.videoUrl, '_blank')}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-2xl text-[12px] font-black uppercase flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 4-8 4z"/></svg>
                    Video Demo
                  </button>
                )}
                <button 
                  onClick={() => handleLinkedInShare(selectedItem)}
                  className="w-full bg-[#0077b5] hover:bg-[#005c8a] text-white py-4 rounded-2xl text-[12px] font-black uppercase flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  Compartir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HEADER FIJO */}
      <header className="fixed top-0 left-0 right-0 py-4 md:py-8 px-6 md:px-12 flex justify-between items-center bg-white/80 backdrop-blur-xl border-b border-slate-100 z-[200]">
        <div className="flex flex-col">
          <h1 className="text-xl md:text-4xl font-black text-[#6a041a] uppercase tracking-tighter leading-none">Redes & Networking</h1>
          <p className="text-[10px] md:text-sm text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">Guía de Carrera • Tecsup Ciclo 2</p>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <div className="px-4 py-2 bg-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500">
             Version 1.2
          </div>
        </div>
      </header>

      {/* CANVAS DEL ROADMAP */}
      <div className="roadmap-canvas">
        
        {/* LA CARRETERA (SVG) */}
        <svg width="3200" height="1200" className="absolute top-0 left-0 pointer-events-none road-fade-in z-0">
          <path d={pathData} fill="none" stroke="#ab022f" strokeWidth="24" strokeLinecap="round" className="opacity-10" />
          <path d={pathData} fill="none" stroke="#ab022f" strokeWidth="12" strokeLinecap="round" />
          <path d={pathData} fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeDasharray="15,15" />
        </svg>

        {/* LOS NODOS */}
        {ROADMAP_DATA.map((item, index) => (
          <RoadmapNode
            key={item.id}
            item={item}
            index={index}
            isSelected={selectedId === item.id}
            onClick={() => setSelectedId(selectedId === item.id ? null : item.id)}
            position={positions[index]}
          />
        ))}

        {/* META FINAL */}
        <div 
          className="absolute z-10"
          style={{ left: checkpointPos.x, top: checkpointPos.y, transform: 'translate(-50%, -50%)' }}
        >
           <div className="bg-white border-[8px] border-double border-[#ab022f] p-8 md:p-14 rounded-[50px] shadow-2xl w-[90vw] max-w-[450px] text-center group transition-all hover:scale-[1.02]">
              <div className="w-20 h-20 bg-[#ab022f] rounded-[25px] flex items-center justify-center mx-auto -mt-20 mb-8 shadow-2xl border-4 border-white rotate-12">
                 <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
              </div>
              <h4 className="text-2xl md:text-3xl font-black text-[#6a041a] mb-4 uppercase tracking-tighter leading-tight">🏁 FINAL DEL CICLO</h4>
              <div className="bg-slate-50 p-6 rounded-[30px] mb-8 border border-slate-100">
                <p className="text-sm md:text-lg text-slate-600 font-bold leading-relaxed italic">"{CHECKPOINT_TEXT}"</p>
              </div>
              <button 
                onClick={() => setShowCelebration(true)}
                className="w-full py-5 bg-[#6a041a] hover:bg-[#ab022f] rounded-3xl text-xl font-black text-white uppercase tracking-widest shadow-xl transition-all active:scale-95"
              >
                ¡MISIÓN CUMPLIDA!
              </button>
           </div>
        </div>
      </div>

      {/* AYUDA DE NAVEGACIÓN */}
      <div className="initial-helper">
         Desliza para explorar →
      </div>

    </div>
  );
};

export default App;
