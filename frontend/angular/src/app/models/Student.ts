import { Question } from './questionnaire';
import { Questionnaire } from './questionnaire';
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

export interface Answer {
  questionnaire: Questionnaire['_id'];
  answers: QuestionAnswer[];
}

export interface QuestionAnswer {
  question: Question['_id'];
  answer: string;
}