/*
 * @Author: hwx
 * @Date: 2022-05-18 20:35:13
 * @LastEditors: hwx
 * @LastEditTime: 2022-05-18 20:41:08
 * @FilePath: \backend\src\models\helper\mongoHelper.ts
 * @Description: 
 */

import { Db, MongoClient } from "mongodb";
import { Logger } from "tsrpc";

export async function connect(url: string, dbName?: string): Promise<Db> {
    const client = new MongoClient(url);
    await client.connect();
    return client.db(dbName);
};