import { ApiCall } from "tsrpc";
import { ReqLogout, ResLogout } from "../../shared/protocols/authServer/PtlLogout";

export async function ApiLogout(call: ApiCall<ReqLogout, ResLogout>) {
    // TODO
    call.error('API Not Implemented');
}