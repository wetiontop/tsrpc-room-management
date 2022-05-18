/*
 * @Author: hwx
 * @Date: 2022-05-18 09:17:54
 * @LastEditors: hwx
 * @LastEditTime: 2022-05-18 20:54:12
 * @FilePath: \backend\src\AuthServer\AuthServer.ts
 * @Description: 
 */
import path from "path";
import { HttpServer } from "tsrpc";
import { useAdminToken } from "../models/flows/useAdminToken";
import { serviceProto } from "../shared/protocols/serviceProto_authServer";
import { Collection, Db, MongoClient, OptionalId } from "mongodb";
// import mongoose from 'mongoose';

export interface AuthServerOptions {
    port: number
}
export class AuthServer {
    readonly server = new HttpServer(serviceProto, {
        port: this.options.port,
        // Remove this to use binary mode (remove from the client too)
        json: true
    });
    readonly logger = this.server.logger;

    private db?: Db;

    constructor(public readonly options: AuthServerOptions) {
        // Flows
        useAdminToken(this.server);
    }

    async init() {
        await this.server.autoImplementApi(path.resolve(__dirname, './api'));

        const client = await new MongoClient('mongodb://localhost').connect();
        this.db = client.db();
    //    await mongoose.connect('mongodb://localhost/test')
    }

    async start() {
        await this.server.start();
    }
}