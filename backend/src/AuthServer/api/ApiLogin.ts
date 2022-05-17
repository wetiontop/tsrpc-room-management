import { ApiCall } from "tsrpc";
import { ReqLogin, ResLogin } from "../../shared/protocols/authServer/PtlLogin";

export async function ApiLogin(call: ApiCall<ReqLogin, ResLogin>) {
    // TODO
    // call.error('API Not Implemented');
    console.log(call.req);
    if (!call.req.account) {
        call.error('account is required');
    }

    if (!call.req.password) {
        call.error('password is required');
    }

    call.succ({token: 'xxxxxxxxxxxx'});
}