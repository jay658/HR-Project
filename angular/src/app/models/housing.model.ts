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
}
