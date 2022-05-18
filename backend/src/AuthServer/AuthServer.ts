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
import { DbHelper } from "../models/db/DbHelper";

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

    constructor(public readonly options: AuthServerOptions) {
        // Flows
        useAdminToken(this.server);
    }

    async init() {
        await this.server.autoImplementApi(path.resolve(__dirname, './api'));

        this.logger.log(`Start connecting db...`)
        await DbHelper.connect('mongodb://localhost:27017', 'test');
        this.logger.log(`Db connected successfully...`)
    }

    async start() {
        await this.server.start();
    }
}