
export interface OfficialCourse {
  name: string;
  url: string;
}

export interface RoadmapItem {
  id: number;
  title: string;
  officialCourses: OfficialCourse[];
  description: string;
  certification: string;
  videoUrl?: string; // Nuevo campo para el enlace de YouTube
}
