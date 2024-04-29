import { ObjectId } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  createdAt: Date;
}
