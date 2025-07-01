// src/app/models/employe.ts

// NOUVEAU : Interface pour les permissions
export interface Permission {
  id: number;
  name: string;
  description: string;
}

// NOUVEAU : Interface pour les rôles (remplace l'enum)
export interface Role {
  id: number;
  name: string;
  permissions: Permission[];
}

// L'enum de Statut reste inchangée
export enum EmployeStatus {
  ACTIF = 'ACTIF',
  SUSPENDU = 'SUSPENDU'
}

// L'interface Employe est mise à jour pour utiliser la nouvelle interface Role
export interface Employe {
  id?: number;
  nom: string;
  identifiantConnexion: string;
  roles: Role[]; // <-- MODIFIÉ : Utilise un tableau de l'interface Role
  status: EmployeStatus;
  photoUrl?: string;
  motDePasse?: string;
}