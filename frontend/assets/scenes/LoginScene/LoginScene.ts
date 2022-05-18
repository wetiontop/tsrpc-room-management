/*
 * @Author: hwx
 * @Date: 2022-05-18 09:17:54
 * @LastEditors: hwx
 * @LastEditTime: 2022-05-18 12:05:14
 * @FilePath: \frontend\assets\scenes\LoginScene\LoginScene.ts
 * @Description: 
 */

import { _decorator, Component, EditBox } from 'cc';
import { NetUtil } from '../../scripts/models/NetUtil';
import JSEncrypt from 'jsencrypt'

const { ccclass, property } = _decorator;

@ccclass('LoginScene')
export class LoginScene extends Component {
    @property(EditBox)
    edtAccount?: EditBox;

    @property(EditBox)
    edtPassword?: EditBox;

    async onClickLogin() {
        let account = this.edtAccount?.string || '';
        let password = this.edtPassword?.string || '';

        let ret = await NetUtil.authClient.callApi('Login', { account, password: this.encrypt(password) });
        if (ret.isSucc) {
            localStorage.setItem('token', ret.res.token);
        } else {
            console.log(ret.err);
        }
    }

    async onClickRegister() {
        let account = this.edtAccount?.string || '';
        let password = this.edtPassword?.string || '';

        let ret = await NetUtil.authClient.callApi('Register', { account, password: this.encrypt(password) });
        if (ret.isSucc) {
            localStorage.setItem('token', ret.res.token);
        } else {
            console.log(ret.err);
        }
    }

    async onClickLogout() {
        let token = localStorage.getItem('token');
        let ret = await NetUtil.authClient.callApi('Logout', { token });
        if (ret.isSucc) {
            localStorage.removeItem('token');
        } else {
            console.log(ret.err);
        }
    }

    encrypt(str: string) {
        let encrypt = new JSEncrypt();
        const publicKey = `-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBALczfjaESEQFGAH3OFseIWBqdUo0qprG
Myd2GHpQ47oGfG2Z2c8XXF4ABar2fKfqknEOXeOed+RPs9oZwFrIbwECAwEAAQ==
-----END PUBLIC KEY-----`
        //公钥加密
        encrypt.setPublicKey(publicKey);
        let encrypted = encrypt.encrypt(str);
        console.log(encrypted);

        //私钥解密
        let decrypt = new JSEncrypt();
        const privateKey = `-----BEGIN PRIVATE KEY-----
MIIBVgIBADANBgkqhkiG9w0BAQEFAASCAUAwggE8AgEAAkEAtzN+NoRIRAUYAfc4
Wx4hYGp1SjSqmsYzJ3YYelDjugZ8bZnZzxdcXgAFqvZ8p+qScQ5d45535E+z2hnA
WshvAQIDAQABAkEAhlF4rhvaqBRb/8T0SsoSipBDIn7uvr+mbb5GQBfif1ZWt7oM
Iyx7QYO7AyPZlVntbmjAENCca3Pv2bNy0g6bgQIhAPDFOiUfLuC3qMBG+YC1rRV6
24Ed0VXrq5v8TeWAdHmZAiEAwsoNUVQAJZA/JOA0y07OxcpstXznKF0/u25oIGz5
EakCIQDmyPYiDRDfH8xmeeHAyOQemcP7sHwuspatDxwPp6B9yQIhAJ4BWiYzdl8C
EEZwXELirVXB6saZB8U1RuJaH7rVyn/pAiBMwcgtSG9JF3/J+0VmcXiSuXwwq7KN
hUzatsrbKfHKgQ==
-----END PRIVATE KEY-----`;
        decrypt.setPrivateKey(privateKey);
        let uncrypted = decrypt.decrypt(encrypted as string);
        console.log(uncrypted);

        return encrypted;
    }
}