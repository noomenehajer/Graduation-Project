export interface Loginresponse {
  token: string;
  estValide: boolean;
  user: {
    nom: string;
    prenom: string;
    email: string;
    estValide: boolean;
  };
}
