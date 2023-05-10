export interface Rendezvous {
  _id?: string;
  etudiant: string;
  disponibilite:string,
  status?: 'demande' | 'confirme' | 'refuse';
  type?: 'face to face' | 'online';
  commentaire?: string;
}
