
import { RoadmapItem } from './types';

// CUANDO EL PROFESOR TE PASE EL LINK GENERAL, PÉGALO AQUÍ:
export const GLOBAL_TUTORIAL_URL = "https://youtu.be/dQw4w9WgXcQ?si=YHkLxdTjHQ-IzVrd"; 

export const ROADMAP_DATA: RoadmapItem[] = [
  {
    id: 1,
    title: "Ciberseguridad Aplicada",
    officialCourses: [
      {
        name: "Tecsup – Introducción a la Ciberseguridad",
        url: "https://www.netacad.com/es/courses/introduction-to-cybersecurity?courseLang=es-XL"
      }
    ],
    description: "Inicia tu camino protegiendo el mundo digital. Aprende sobre amenazas, phishing y defensa de activos.",
    certification: "Badge: Intro to Cybersecurity",
    // SI EL VIDEO ES ESPECÍFICO PARA ESTE MÓDULO, CAMBIA ESTE LINK:
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
  },
  {
    id: 2,
    title: "Programación Automation",
    officialCourses: [
      {
        name: "Tecsup – Fundamentos de Python 1",
        url: "https://www.netacad.com/courses/python-essentials-1?courseLang=es-XL"
      }
    ],
    description: "Python es el lenguaje rey de las redes. Aprende a automatizar tareas repetitivas y scripts de configuración.",
    certification: "Badge: Python Essentials 1",
    videoUrl: "" // Si lo dejas vacío, el botón no aparecerá
  },
  {
    id: 3,
    title: "Arquitectura de Hardware",
    officialCourses: [
      {
        name: "Tecsup – Conceptos Básicos de Hardware",
        url: "https://www.netacad.com/es/courses/computer-hardware-basics?courseLang=es-XL"
      }
    ],
    description: "Entiende el 'fierro'. Domina los componentes internos, almacenamiento y mantenimiento preventivo de equipos.",
    certification: "Badge: Computer Hardware Basics",
    videoUrl: ""
  },
  {
    id: 4,
    title: "Networking & Simulation",
    officialCourses: [
      {
        name: "Tecsup – Networking Basics",
        url: "https://www.netacad.com/es/courses/networking-basics?courseLang=es-XL"
      },
      {
        name: "Tecsup – Packet Tracer Essentials",
        url: "https://www.netacad.com/courses/getting-started-cisco-packet-tracer?courseLang=es-XL"
      }
    ],
    description: "El núcleo de tu carrera. Configura switches, routers y diseña topologías complejas en simuladores.",
    certification: "Badge: Networking Basics + PT",
    videoUrl: ""
  }
];

export const CHECKPOINT_TEXT = "¡Reto Final! Configura una red corporativa segura en Packet Tracer e integra un script de Python para reportar el estado de los puertos en tiempo real.";
