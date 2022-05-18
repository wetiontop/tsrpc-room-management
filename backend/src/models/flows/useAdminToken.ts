import { BaseServer } from "tsrpc";
import { BackConfig } from "../BackConfig";
import { expressjwt } from "express-jwt";

/** admin 目录下的接口，校验 adminToken */
export function useAdminToken(server: BaseServer<any>) {
    server.flows.preApiCallFlow.push(call => {

        let a = expressjwt({secret: 'secret', algorithms: ['HS256']});
        console.log('a ', a.name);
        if (a.name === 'UnauthorizedError') {
            console.log('UnauthorizedError');
            call.error('token error');
        }
        
        if (call.service.name.startsWith('admin/')) {
            if ((call.req as any).adminToken !== BackConfig.adminToken) {
                call.error('adminToken error');
                return undefined;
            }
        }

        return call;
    })
}