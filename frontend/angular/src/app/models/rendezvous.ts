import { Student } from "./Student";
import { Disponibilite } from "./disponibilite";

export interface Rendezvous {
  _id?: string;
  etudiant: Student;
  disponibilite:Disponibilite,
  status?: 'demande' | 'confirme' | 'refuse';
  type?: 'face to face' | 'online';
  commentaire?: string;
}
