export interface FacilityIssue {
  _id: string;
  title: string;
  description: string;
  status: 'open' | 'inProgress' | 'closed';
  createdBy: {
    _id: string;
    username: string;
    email: string;
  };
  comments: {
    description: string;
    createdBy: string;
    timestamp: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface House {
  _id: string;
  unit: string;
  address: string;
  capacity: number;
  status: string;
  tenants: {
    _id: string;
    username: string;
    email: string;
  }[];
  facilityIssues: FacilityIssue[];
}
