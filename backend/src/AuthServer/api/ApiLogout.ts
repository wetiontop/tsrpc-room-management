/*
 * @Author: hwx
 * @Date: 2022-05-18 09:17:54
 * @LastEditors: hwx
 * @LastEditTime: 2022-05-18 10:31:24
 * @FilePath: \backend\src\AuthServer\api\ApiLogout.ts
 * @Description: 
 */
import { ApiCall } from "tsrpc";
import { ReqLogout, ResLogout } from "../../shared/protocols/authServer/PtlLogout";
import jwt from "jsonwebtoken";

export async function ApiLogout(call: ApiCall<ReqLogout, ResLogout>) {

    // jwt.verify(call.req.token, )
    call.succ({code: 200});
}