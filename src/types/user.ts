export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'mentor' | 'startup';
}

export interface UserAccess {
  id: number;
  userId: string;
  userName: string;
  role: string;
  viewAccess: boolean;
  editAccess: boolean;
  submitAccess: boolean;
}
