export interface Client {
  id: number;
  name: string;
  cif: string;
  phone: string;
  status: 'ACTIVE' | 'BLOCKED' | string;
  currentOtp: string;
  motifBlocage?: string; // NOUVEAU CHAMP (optionnel)
}