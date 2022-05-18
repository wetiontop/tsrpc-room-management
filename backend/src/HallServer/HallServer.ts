import path from "path";
import { HttpServer } from "tsrpc";
import { useAdminToken } from "../models/flows/useAdminToken";
import { serviceProto } from "../shared/protocols/serviceProto_hallServer";
import * as mongoHelper from "../models/helper/mongoHelper";
import { Db } from "mongodb";

export interface HallServerOptions {
    port: number
}
export class HallServer {
    readonly server = new HttpServer(serviceProto, {
        port: this.options.port,
        // Remove this to use binary mode (remove from the client too)
        json: true
    });
    readonly logger = this.server.logger;

    public db?: Db;

    constructor(public readonly options: HallServerOptions) {
        // Flows
        useAdminToken(this.server);
    }

    async init() {
        await this.server.autoImplementApi(path.resolve(__dirname, './api'));
        
        this.logger.log(`Start connecting db...`)
        this.db = await mongoHelper.connect('mongodb://localhost:27017/test');
        this.logger.log(`Db connected successfully...`)
    }

    async start() {
        await this.server.start();
    }
}