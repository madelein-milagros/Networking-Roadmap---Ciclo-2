
import React from 'react';
import { RoadmapCard } from './components/RoadmapCard';
import { ROADMAP_DATA, CHECKPOINT_TEXT } from './constants';

const App: React.FC = () => {
  return (
    <div className="min-h-screen pb-20 selection:bg-[#ab022f] selection:text-white">
      {/* Hero Header */}
      <header className="py-16 px-4 text-center">
        <h1 
          className="text-4xl md:text-5xl font-black mb-4 tracking-tight"
          style={{ color: '#6a041a' }}
        >
          ROADMAP DE REDES
        </h1>
        <div 
          className="inline-block px-4 py-1 rounded-full text-white text-sm font-bold tracking-widest uppercase mb-6"
          style={{ backgroundColor: '#ab022f' }}
        >
          Ciclo 2
        </div>
        <p className="text-gray-600 max-w-xl mx-auto text-lg leading-relaxed">
          Sigue esta ruta de aprendizaje estructurada para dominar los conceptos fundamentales de seguridad, programación y hardware del segundo ciclo.
        </p>
      </header>

      {/* Roadmap Container */}
      <main className="max-w-4xl mx-auto px-6 relative">
        {/* Central Vertical Line */}
        <div 
          className="roadmap-line absolute left-1/2 transform -translate-x-1/2 w-1 h-full opacity-30 z-0"
        ></div>

        <div className="relative z-10">
          {ROADMAP_DATA.map((item, index) => (
            <RoadmapCard key={item.id} item={item} index={index} />
          ))}

          {/* Final Checkpoint */}
          <div className="mt-16 flex flex-col items-center">
             {/* Node Circle for Checkpoint */}
            <div 
                className="w-10 h-10 rounded-full border-4 border-white shadow-lg flex items-center justify-center mb-6"
                style={{ backgroundColor: '#9a0526' }}
            >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
            </div>

            <div 
              className="w-full max-w-lg p-8 rounded-2xl shadow-xl text-center border-4 border-dashed"
              style={{ backgroundColor: '#9a0526', borderColor: '#ab022f' }}
            >
              <h4 className="text-white text-xl font-bold mb-3 flex items-center justify-center gap-2">
                ⬛ Checkpoint del Ciclo 2
              </h4>
              <p className="text-white opacity-90 text-md italic leading-relaxed">
                “{CHECKPOINT_TEXT}”
              </p>
              <div className="mt-6 flex justify-center">
                  <div className="h-1 w-20 bg-white opacity-30 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="mt-20 text-center opacity-50 text-xs font-medium uppercase tracking-[0.2em]">
        <p style={{ color: '#6a041a' }}>Tecsup - Ingeniería de Redes y Comunicaciones</p>
      </footer>
    </div>
  );
};

export default App;
