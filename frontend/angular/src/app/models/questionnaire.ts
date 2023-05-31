import { Student } from './Student';
export interface Answer {
  student: Student['_id'];
  answers: {
    question: Question['_id'];
    answer:  any;
  }[];
}
export interface Option {
  _id: string;
  text: string;
}

export interface Question {
  _id: string;
  text: string;
  type: string;
  options: Option[];
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
