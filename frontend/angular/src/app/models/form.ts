import { Question } from './question';

export interface Form {
  _id: string;
  title: string;
  description: string;
  questions: Question[];
}