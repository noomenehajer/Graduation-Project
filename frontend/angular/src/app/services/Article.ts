export interface Article {
  _id:string;
  title: string;
  content:string;
  createdAt:Date;
  updatedAt:Date |null ;
  image: string;
}
