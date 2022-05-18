import { ObjectId } from "mongodb";

export interface DbUser {
    _id: ObjectId;
    account: string;
    password: string;
}