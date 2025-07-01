export interface Client {
  id: number;
  name: string;
  cif: string;
  phone: string;
  status: 'ACTIVE' | 'BLOCKED' | string;
  currentOtp: string;
  motifBlocage?: string;
  nni?: string;      // AJOUTER
  sexe?: string;     // AJOUTER
  photoUrl?: string; // AJOUTER // NOUVEAU CHAMP (optionnel)
}