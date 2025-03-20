export interface Startup {
  id: string;
  name: string;
  industry: string;
  phase: 'Ideation' | 'IncuHatch' | 'IncuBoost';
  status: 'Active' | 'Pending' | 'Inactive';
  foundedDate: string;
  description: string;
  team: TeamMember[];
  progress: ProgressMetric[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone?: string;
}

export interface Mentor {
  id: string;
  name: string;
  expertise: string[];
  availability: 'Full-time' | 'Part-time' | 'On-demand';
  bio: string;
  status: 'Active' | 'Inactive';
  startups: string[]; // Startup IDs they're mentoring
  rating: number;
}

export interface ScreeningEvent {
  id: string;
  title: string;
  date: string;
  type: 'Pitch' | 'Technical' | 'Business Plan' | 'Final';
  startups: string[];
  mentors: string[];
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  scores?: ScreeningScore[];
}

export interface ScreeningScore {
  startupId: string;
  mentorId: string;
  criteria: {
    innovation: number;
    marketPotential: number;
    teamCapability: number;
    presentation: number;
  };
  feedback: string;
}

export interface Resource {
  id: string;
  name: string;
  type: 'video' | 'template' | 'tool' | 'document';
  format?: string;
  duration?: string;
  category: 'Business' | 'Technical' | 'Pitch' | 'Legal' | 'Finance';
  phase: 'Ideation' | 'IncuHatch' | 'IncuBoost';
  url: string;
}

export interface ProgressMetric {
  date: string;
  milestone: string;
  status: 'Completed' | 'In Progress' | 'Pending';
  score?: number;
  feedback?: string;
}
