export interface Student {
  _id: string;
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  estValide: boolean;
  estSuspendu: boolean;
  telephone?: string;
  adresse?: string;
  niveau?: string;
  photo?: string;
}
