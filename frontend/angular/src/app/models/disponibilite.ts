export interface Disponibilite {
  _id: string;
  psy: string;
  seance: {
    jour: Date;
    debut: Date;
    fin: Date;
  }[];
}

