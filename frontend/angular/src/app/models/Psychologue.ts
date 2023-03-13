export interface Psychologue {
_id:string,
nom:string,
prenom:string,
email:string,
motDePasse:string,
telephone?: string;
adresse?: string;
specialite?: string;
description?:string;
photo?: string;
estValide?: boolean;
estSuspendu?: boolean;
}
