export interface Option {
  text: string;
  value:string;
} 

export interface Question {
  _id: string;
  text: string;
  type: string;
  options?: Option[];
  answer?: string;
}

export interface Questionnaire {
  _id: string;
  title: string;
  description: string;
  questions: Question[];
}
