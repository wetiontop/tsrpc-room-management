import { Collection, Db, MongoClient, OptionalId } from "mongodb";
import { DbCollectionType } from "./DbCollectionType";

export class DbHelper {
    static db: Db;

    static async connect(url: string, dbName?: string) {
        const client = new MongoClient(url);
        await client.connect();
        this.db = client.db(dbName);
    }

    static collection<T extends keyof DbCollectionType>(col: T): Collection<OptionalId<DbCollectionType[T]>> {
        return this.db.collection(col);
    }
}