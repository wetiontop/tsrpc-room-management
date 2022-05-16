import path from "path";
import { HttpServer } from "tsrpc";
import { useAdminToken } from "../models/flows/useAdminToken";
import { serviceProto } from "../shared/protocols/serviceProto_matchServer";

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
    }

    async start() {
        await this.server.start();
    }
}