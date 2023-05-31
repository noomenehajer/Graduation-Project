import { Question } from './questionnaire';
import { Questionnaire } from './questionnaire';


export interface QuestionAnswer {
  question:Question['_id'];
  answer: any;
}
export interface Answer {
  questionnaire: Questionnaire;
  answers: QuestionAnswer[];
}

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
  answers?: Answer[];
  publishedQuestions?: Questionnaire[];
}
