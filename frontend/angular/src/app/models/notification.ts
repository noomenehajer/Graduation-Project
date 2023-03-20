export interface Notification {
  _id: string;
  receiverId: string;
  senderId: string;
  message: string;
  read: boolean;
  createdAt: Date;
}
