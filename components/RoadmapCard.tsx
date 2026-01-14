
import React, { useState } from 'react';
import { RoadmapItem } from '../types';

interface RoadmapCardProps {
  item: RoadmapItem;
  index: number;
}

export const RoadmapCard: React.FC<RoadmapCardProps> = ({ item, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative mb-12 flex flex-col items-center">
      {/* Node Circle */}
      <div 
        className="absolute -top-4 w-8 h-8 rounded-full border-4 border-white shadow-md z-10"
        style={{ backgroundColor: '#ab022f' }}
      ></div>

      {/* Main Button / Card */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full max-w-md p-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none text-left"
        style={{ backgroundColor: '#6a041a', color: 'white' }}
      >
        <div className="flex justify-between items-center">
          <span className="text-sm font-light uppercase tracking-wider opacity-80">Curso {index + 1}</span>
          <svg 
            className={`w-6 h-6 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold mt-2 leading-tight">{item.title}</h3>
      </button>

      {/* Expandable Details */}
      <div 
        className={`overflow-hidden transition-all duration-500 ease-in-out w-full max-w-md ${
          isExpanded ? 'max-h-[800px] opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}
      >
        <div 
          className="p-6 rounded-xl border-2 shadow-inner bg-white"
          style={{ borderColor: '#ab022f' }}
        >
          <div className="space-y-4">
            <div>
              <p className="text-xs font-bold uppercase text-gray-500 mb-1">📘 Nombre Oficial</p>
              <div className="space-y-2">
                {item.officialCourses.map((course, idx) => (
                  <p key={idx} className="text-sm font-semibold text-gray-800">• {course.name}</p>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase text-gray-500 mb-1">🔗 Enlaces NetAcad</p>
              <div className="flex flex-col gap-2">
                {item.officialCourses.map((course, idx) => (
                  <a 
                    key={idx}
                    href={course.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm font-medium hover:underline inline-flex items-center"
                    style={{ color: '#ab022f' }}
                  >
                    Ver {item.officialCourses.length > 1 ? `parte ${idx + 1}` : "curso"} en Cisco NetAcad
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase text-gray-500 mb-1">🛠️ Descripción</p>
              <p className="text-sm text-gray-700 leading-relaxed">{item.description}</p>
            </div>

            {item.certification && (
              <div className="pt-2 border-t border-gray-100">
                <p className="text-xs font-bold uppercase text-gray-500 mb-1">🏆 Certificación</p>
                <div className="flex items-start">
                  <span className="text-sm font-semibold text-gray-800">{item.certification}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
