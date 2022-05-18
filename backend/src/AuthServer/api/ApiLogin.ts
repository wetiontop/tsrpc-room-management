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
import { DbHelper } from "../../models/db/DbHelper";
import jwt from "jsonwebtoken";

export async function ApiLogin(call: ApiCall<ReqLogin, ResLogin>) {
    let account = call.req.account;
    let password = call.req.password;
    if (!account || !password) {
        call.error('账号和密码不能为空');
        return;
    }

    // 私钥解密
    const decrypted = decryptLoginPwd(password);
    // 比较密码

    let ret = await DbHelper.collection('user').findOne({ account });
    if (!ret) {
        call.error('账号不存在');
        return;
    }

    if (ret.password !== decrypted) {
        call.error('密码不正确');
        return;
    }


    // 生成 token
    const tokenStr = jwt.sign({ account }, 'secret', {
        expiresIn: '1h',
        algorithm: 'HS256'
    });
    call.succ({token: `Bearer ${tokenStr}`});
}