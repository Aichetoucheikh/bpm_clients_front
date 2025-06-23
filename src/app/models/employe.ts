export enum Role {
  ADMIN = 'ADMIN',
  AGENT_BANKILY = 'AGENT_BANKILY',
  SUPERVISEUR = 'SUPERVISEUR'
}

// Nouvelle énumération pour le statut de l'employé
export enum EmployeStatus {
  ACTIF = 'ACTIF',
  SUSPENDU = 'SUSPENDU'
}

export interface Employe {
  id?: number;
  nom: string;
  identifiantConnexion: string;
  role: Role;
  status: EmployeStatus; // Ce champ est maintenant obligatoire
  motDePasse?: string;
}