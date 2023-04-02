export interface Option {
  _id: string;
  text: string;
  value:string;
} 

export interface Question {
  _id: string;
  text: string;
  type: string;
  options?: string[];
  answer?: string;
}

export interface Questionnaire {
  _id: string;
  title: string;
  description: string;
  questions: Question[];
}
