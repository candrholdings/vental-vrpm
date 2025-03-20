import axios from 'axios';
import { Company } from '../types/company';
import { Program, Resource, ScoringCriteria } from '../types/program';
import { User, UserAccess } from '../types/user';

// Mock companies data
const mockCompanies: Company[] = [
  { id: 1, name: 'TechnoVision Ltd', industry: 'Tech', phase: 'Ideation', status: 'Active' },
  { id: 2, name: 'GreenGrow Innovations', industry: 'AgriTech', phase: 'IncuHatch', status: 'Active' },
  { id: 3, name: 'MediHealth Solutions', industry: 'HealthTech', phase: 'IncuBoost', status: 'Active' },
  { id: 4, name: 'EduSmart Technologies', industry: 'EdTech', phase: 'Ideation', status: 'Pending' },
  { id: 5, name: 'FinSecure Systems', industry: 'FinTech', phase: 'Ideation', status: 'Active' },
];

// Base API URL - would be replaced with actual backend URL in production
const API_URL = process.env.NODE_ENV === 'production' ? 'https://api.ventalms.com' : 'http://localhost:3001';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// API service with mock implementation for now
export const ApiService = {
  // Companies
  getCompanies: async (): Promise<Company[]> => {
    // In a real app: return api.get<Company[]>('/companies').then(res => res.data);
    return new Promise(resolve => {
      setTimeout(() => resolve(mockCompanies), 500);
    });
  },

  getCompanyById: async (id: number): Promise<Company> => {
    // In a real app: return api.get<Company>(`/companies/${id}`).then(res => res.data);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const company = mockCompanies.find(c => c.id === id);
        if (company) {
          resolve(company);
        } else {
          reject(new Error('Company not found'));
        }
      }, 500);
    });
  },

  createCompany: async (company: Omit<Company, 'id'>): Promise<Company> => {
    // In a real app: return api.post<Company>('/companies', company).then(res => res.data);
    return new Promise(resolve => {
      setTimeout(() => {
        const newCompany = {
          ...company,
          id: Math.max(...mockCompanies.map(c => c.id)) + 1,
        };
        resolve(newCompany);
      }, 500);
    });
  },

  updateCompany: async (id: number, company: Partial<Company>): Promise<Company> => {
    // In a real app: return api.put<Company>(`/companies/${id}`, company).then(res => res.data);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockCompanies.findIndex(c => c.id === id);
        if (index >= 0) {
          const updatedCompany = { ...mockCompanies[index], ...company };
          resolve(updatedCompany);
        } else {
          reject(new Error('Company not found'));
        }
      }, 500);
    });
  },

  // Additional API methods for programs, resources, users, etc.
  // These would be implemented similarly with real API calls in production
};

export default ApiService;
