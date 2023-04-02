import { Reply } from "./reply";

export interface Article {
  _id:string;
  title: string;
  content:string;
  createdAt:Date;
  updatedAt:Date |null ;
  image: string;
  replies: Reply[];
}
