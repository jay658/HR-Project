// housing.model.ts
export interface House {
  _id: string;
  unit: string;
  capacity: number;
  address: string;
  status: 'available' | 'unavailable';
  tenants: any[];
}
