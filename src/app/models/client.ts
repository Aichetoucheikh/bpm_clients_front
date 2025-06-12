export interface Client {
 id: number;
  name: string;
  cif: string;
  phone: string;
  ClientStatus: 'ACTIVE' | 'BLOCKED' | 'Pending' | string;
  currentOtp: string;
}
