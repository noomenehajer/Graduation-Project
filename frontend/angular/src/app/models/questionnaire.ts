import { Student } from './Student';

export interface Answer {
  student: Student['_id'];
  answers: {
    question: Question['_id'];
    answer: string;
  }[];
}

export interface Option {
  text: string;
  value: string;
}

export interface Question {
  _id: string;
  text: string;
  type: string;
  options: Option[];
  answer?: string;
}

export interface Questionnaire {
  _id: string;
  title: string;
  description: string;
  questions: Question[];
  published?: boolean;
  publishedTo: Student['_id'][];
  answers?: Answer[];
  answeredBy?: Student['_id'][];
}
