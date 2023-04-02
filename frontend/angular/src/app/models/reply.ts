
export interface Reply {
  _id?: string;
  content: string;
  student: {
    _id: string;
    nom: string;
    prenom: string;
  };
}
