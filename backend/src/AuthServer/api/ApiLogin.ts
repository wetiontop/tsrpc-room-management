/*
 * @Author: hwx
 * @Date: 2022-05-18 09:17:54
 * @LastEditors: hwx
 * @LastEditTime: 2022-05-18 20:32:27
 * @FilePath: \backend\src\AuthServer\api\ApiLogin.ts
 * @Description: 
 */
import { ApiCall } from "tsrpc";
import { ReqLogin, ResLogin } from "../../shared/protocols/authServer/PtlLogin";
import { decryptLoginPwd } from '../../models/helper/cryptoHelper';
import jwt from "jsonwebtoken";

export async function ApiLogin(call: ApiCall<ReqLogin, ResLogin>) {
    if (!call.req.account) {
        call.error('account is required');
    }

    if (!call.req.password) {
        call.error('password is required');
    }

    // 私钥解密
    const decrypted = decryptLoginPwd(call.req.password);
    console.log('decrypted ', decrypted);
    // 比较密码

    // 生成 token
    const tokenStr = jwt.sign({account: call.req.account}, 'secret', {
        expiresIn: '1h',
        algorithm: 'HS256'
    });
    call.succ({token: `Bearer ${tokenStr}`});
}