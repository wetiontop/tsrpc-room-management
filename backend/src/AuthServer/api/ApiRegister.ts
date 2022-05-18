import { ApiCall } from "tsrpc";
import { DbHelper } from "../../models/db/DbHelper";
import { decryptLoginPwd } from "../../models/helper/cryptoHelper";
import { ReqRegister, ResRegister } from "../../shared/protocols/authServer/PtlRegister";

export async function ApiRegister(call: ApiCall<ReqRegister, ResRegister>) {
    let account = call.req.account;
    let password = call.req.password;
    if (!account || !password) {
        call.error('账号和密码不能为空');
        return;
    }

    // 私钥解密
    const decrypted = decryptLoginPwd(password);
    console.log('decrypted ', decrypted);

    let user = DbHelper.collection("user");
    let ret = await user.findOne({ account });
    if (ret) {
        call.error('账号已存在');
        return;
    }

    await user.insertOne({
        account,
        password: decrypted
    })

    call.succ({token: 'xxxxxxxxxxxx'});
}