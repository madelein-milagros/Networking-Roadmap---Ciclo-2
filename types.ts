
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
}
