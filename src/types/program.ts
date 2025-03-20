export interface Program {
  id: string;
  name: string;
  duration: string;
  startDate: string;
  endDate: string;
  goals?: string;
  milestones?: Milestone[];
}

export interface Milestone {
  id: number;
  title: string;
  month: string;
  activities: string[];
  completed?: boolean;
}

export interface Resource {
  id: string;
  name: string;
  type: 'video' | 'template' | 'tool';
  format?: string;
  duration?: string;
  assigned?: boolean;
}

export interface ScoringCriteria {
  id: string;
  section: string;
  defaultWeight: number;
  customWeight?: number;
}
