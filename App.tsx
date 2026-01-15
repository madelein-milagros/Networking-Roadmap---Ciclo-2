
import React, { useState } from 'react';
import { RoadmapNode } from './components/RoadmapNode';
import { ROADMAP_DATA, CHECKPOINT_TEXT } from './constants';
import { RoadmapItem } from './types';

const App: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  // Coordenadas fijas de los nodos para la carretera
  const positions = [
    { x: 400, y: 500 },
    { x: 950, y: 800 },
    { x: 1500, y: 500 },
    { x: 2050, y: 800 },
  ];

  const checkpointPos = { x: 2650, y: 800 };

  const generatePathData = () => {
    const startX = -100;
    const startY = 500;
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

  return (
    <div className="min-h-screen bg-[#fafbfc] flex flex-col relative text-slate-800">
      
      {/* MODAL DE CELEBRACIÓN FINAL */}
      {showCelebration && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#6a041a]/95 backdrop-blur-xl animate-in fade-in duration-300 p-6">
          <div className="bg-white rounded-[50px] shadow-2xl p-12 max-w-lg w-full text-center relative animate-in zoom-in duration-500">
            <div className="text-8xl mb-6">🎓</div>
            <h2 className="text-4xl font-black text-[#6a041a] mb-4 uppercase tracking-tighter">¡Ciclo Completado!</h2>
            <p className="text-xl text-gray-600 font-bold mb-10 leading-relaxed">Has superado todos los desafíos del Ciclo 2 de Redes. El mundo de la conectividad te espera.</p>
            <button 
              onClick={() => setShowCelebration(false)}
              className="bg-[#ab022f] hover:bg-[#6a041a] text-white px-12 py-5 rounded-3xl font-black text-xl shadow-2xl transition-all hover:scale-105 active:scale-95"
            >
              ¡VAMOS POR MÁS!
            </button>
          </div>
        </div>
      )}

      {/* HEADER CON TÍTULO FINAL */}
      <header className="sticky top-0 w-full py-6 px-10 flex flex-col md:flex-row justify-between items-center bg-white/90 backdrop-blur-md border-b-2 border-gray-100 z-50 shadow-sm">
        <div>
          <h1 className="text-3xl font-black text-[#6a041a] tracking-tighter uppercase">Networking Master Path</h1>
          <p className="text-xs text-gray-400 font-extrabold uppercase tracking-[0.3em] mt-1">Tecsup • Ciclo 2</p>
        </div>
        <div className="px-6 py-2 bg-[#ab022f] text-white text-[10px] font-black rounded-xl shadow-lg uppercase tracking-widest mt-4 md:mt-0">
          Mapa de Carrera
        </div>
      </header>

      {/* MAPA DE CARRETERA */}
      <main className="flex-1 horizontal-scroll-container relative bg-[#fdfdfd] overflow-y-auto">
        <div className="relative" style={{ width: '3200px', height: '1300px' }}>
          
          {/* CARRETERA (SVG) */}
          <svg width="3200" height="1300" className="absolute top-0 left-0 pointer-events-none road-fade-in z-0">
            <path d={pathData} fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="40" strokeLinecap="round" style={{ filter: 'blur(10px)', transform: 'translateY(12px)' }} />
            <path d={pathData} fill="none" stroke="#ab022f" strokeWidth="32" strokeLinecap="round" />
            <path d={pathData} fill="none" stroke="white" strokeWidth="10" strokeLinecap="round" strokeDasharray="25,20" className="opacity-90" />
          </svg>

          {/* NODOS DE MÓDULOS */}
          {ROADMAP_DATA.map((item, index) => (
            <RoadmapNode
              key={item.id}
              item={item}
              index={index}
              isSelected={selectedId === item.id}
              onClick={() => setSelectedId(selectedId === item.id ? null : item.id)}
              position={positions[index]}
              onShare={() => handleLinkedInShare(item)}
            />
          ))}

          {/* META FINAL */}
          <div 
            className="absolute z-10"
            style={{ left: checkpointPos.x, top: checkpointPos.y, transform: 'translate(-50%, -50%)' }}
          >
             <div className="bg-white border-[10px] border-double border-[#ab022f] p-12 rounded-[70px] shadow-2xl w-[550px] text-center transform hover:scale-105 transition-all group">
                <div className="w-24 h-24 bg-[#ab022f] rounded-[30px] flex items-center justify-center mx-auto -mt-24 mb-8 shadow-2xl border-4 border-white rotate-12 group-hover:rotate-0 transition-all">
                   <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </div>
                <h4 className="text-3xl font-black text-[#6a041a] mb-6 uppercase tracking-tighter">🏁 DESTINO FINAL</h4>
                <div className="bg-red-50/50 p-8 rounded-[40px] mb-10 border border-red-100">
                  <p className="text-xl text-gray-700 italic font-bold leading-relaxed">"{CHECKPOINT_TEXT}"</p>
                </div>
                <button 
                  onClick={() => setShowCelebration(true)}
                  className="w-full py-5 bg-[#6a041a] hover:bg-[#ab022f] rounded-[30px] text-xl font-black text-white uppercase tracking-widest shadow-2xl transition-all active:scale-95"
                >
                  ¡Misión Completada!
                </button>
             </div>
          </div>
        </div>
      </main>

      {/* GUÍA DE NAVEGACIÓN */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-[#6a041a] text-white px-10 py-5 rounded-full shadow-2xl z-50 flex items-center gap-6 border border-white/20">
         <div className="w-4 h-4 rounded-full bg-white animate-pulse"></div>
         <p className="text-[11px] font-black uppercase tracking-[0.3em]">Explora la carretera • Click para ver detalles</p>
      </div>
    </div>
  );
};

export default App;
