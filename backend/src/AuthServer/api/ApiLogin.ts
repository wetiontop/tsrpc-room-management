import { ApiCall } from "tsrpc";
import { ReqLogin, ResLogin } from "../../shared/protocols/authServer/PtlLogin";
import jwt from "jsonwebtoken";

export async function ApiLogin(call: ApiCall<ReqLogin, ResLogin>) {
    if (!call.req.account) {
        call.error('account is required');
    }

    if (!call.req.password) {
        call.error('password is required');
    }

    const tokenStr = jwt.sign({account: call.req.account}, 'secret', {
        expiresIn: '1h',
        algorithm: 'HS256'
    });
    call.succ({token: `Bearer ${tokenStr}`});
}