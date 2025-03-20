export interface Company {
  id: number;
  name: string;
  industry: string;
  phase: 'Ideation' | 'IncuHatch' | 'IncuBoost';
  status: 'Active' | 'Pending' | 'Inactive';
  foundedDate?: string;
  description?: string;
  contacts?: CompanyContact[];
}

export interface CompanyContact {
  id: number;
  name: string;
  position: string;
  email: string;
  phone?: string;
}
