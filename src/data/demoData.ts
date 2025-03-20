import { Startup, Mentor, ScreeningEvent, Resource } from '../types/incubator';

export const demoStartups: Startup[] = [
  {
    id: 'st001',
    name: 'TechnoVision Ltd',
    industry: 'Tech',
    phase: 'Ideation',
    status: 'Active',
    foundedDate: '2024-01-15',
    description: 'AI-powered visual recognition solutions for industry',
    team: [
      { id: 'tm001', name: 'John Smith', role: 'CEO', email: 'john@technovision.com' },
      { id: 'tm002', name: 'Sarah Chen', role: 'CTO', email: 'sarah@technovision.com' },
    ],
    progress: [
      { date: '2024-02-01', milestone: 'Business Plan Submission', status: 'Completed', score: 85 },
      { date: '2024-03-15', milestone: 'MVP Development', status: 'In Progress' },
    ],
  },
  {
    id: 'st002',
    name: 'GreenEnergy Solutions',
    industry: 'Clean Energy',
    phase: 'IncuHatch',
    status: 'Active',
    foundedDate: '2023-11-20',
    description: 'Renewable energy storage solutions',
    team: [{ id: 'tm003', name: 'David Wilson', role: 'CEO', email: 'david@greenenergy.com' }],
    progress: [{ date: '2024-01-15', milestone: 'Prototype Testing', status: 'Completed', score: 92 }],
  },
  {
    id: 'st003',
    name: 'HealthTech Innovations',
    industry: 'Healthcare',
    phase: 'IncuBoost',
    status: 'Pending',
    foundedDate: '2023-09-05',
    description: 'Digital health monitoring platform',
    team: [
      { id: 'tm004', name: 'Emma Rodriguez', role: 'CEO', email: 'emma@healthtech.com' },
      { id: 'tm005', name: 'James Lee', role: 'CTO', email: 'james@healthtech.com' },
      { id: 'tm006', name: 'Lisa Chen', role: 'COO', email: 'lisa@healthtech.com' },
    ],
    progress: [{ date: '2023-12-01', milestone: 'Market Research', status: 'Completed', score: 88 }],
  },
];

export const demoMentors: Mentor[] = [
  {
    id: 'mt001',
    name: 'Dr. Michael Brown',
    expertise: ['AI/ML', 'Business Strategy', 'Venture Capital'],
    availability: 'Part-time',
    bio: '20+ years experience in tech startups and venture capital',
    status: 'Active',
    startups: ['st001'],
    rating: 4.8,
  },
  // Add more mentors as needed
];

export const demoScreeningEvents: ScreeningEvent[] = [
  {
    id: 'se001',
    title: 'Q1 2024 Pitch Day',
    date: '2024-03-15',
    type: 'Pitch',
    startups: ['st001'],
    mentors: ['mt001'],
    status: 'Scheduled',
  },
  // Add more events as needed
];

export const demoResources: Resource[] = [
  {
    id: 'rs001',
    name: 'Business Model Canvas Workshop',
    type: 'video',
    format: 'MP4',
    duration: '45 mins',
    category: 'Business',
    phase: 'Ideation',
    url: '/resources/business-model-canvas',
  },
  // Add more resources as needed
];

// Utility functions
export const getStartupById = (id: string): Startup | undefined => {
  return demoStartups.find(startup => startup.id === id);
};

export const getMentorById = (id: string): Mentor | undefined => {
  return demoMentors.find(mentor => mentor.id === id);
};

export const getResourcesByPhase = (phase: string): Resource[] => {
  return demoResources.filter(resource => resource.phase === phase);
};

export const getUpcomingEvents = (): ScreeningEvent[] => {
  return demoScreeningEvents.filter(event => event.status === 'Scheduled');
};
