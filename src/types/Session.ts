export interface Session {
  day: string;
  time: string;
  room: string;
  title: string;
  speakers: string[];
  type_duration: string;
}

export interface SessionWithId extends Session {
  id: string;
}

export type ViewMode = 'all' | 'selected';
export type FilterDay = 'all' | '2025-09-10' | '2025-09-11' | '2025-09-12';