import { ApiCall } from "tsrpc";
import { ReqRegister, ResRegister } from "../../shared/protocols/authServer/PtlRegister";

export async function ApiRegister(call: ApiCall<ReqRegister, ResRegister>) {
    if (!call.req.account) {
        call.error('account is required');
    }

    if (!call.req.password) {
        call.error('password is required');
    }

    call.succ({token: 'xxxxxxxxxxxx'});
}