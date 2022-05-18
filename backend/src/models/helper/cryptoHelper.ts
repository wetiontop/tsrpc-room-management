/*
 * @Author: hwx
 * @Date: 2022-05-18 12:13:49
 * @LastEditors: hwx
 * @LastEditTime: 2022-05-18 20:32:41
 * @FilePath: \backend\src\models\helper\cryptoHelper.ts
 * @Description: 
 */

import crypto from 'crypto';
import { BackConfig } from '../BackConfig';

/**
 * 解密登录密码
 * @param encryptData 
 * @returns 登录密码明文
 */
export function decryptLoginPwd(encryptData: string): string {
    const decrypted = crypto.privateDecrypt({
        key: BackConfig.privateKeyForPassword,
        padding: crypto.constants.RSA_PKCS1_PADDING
    }, Buffer.from(encryptData, 'base64'));

    return decrypted.toString();
}

/**
 * 生成公私钥对
 * @returns { publicKey, privateKey }
 */
export function generateKeyPair() {
    return crypto.generateKeyPairSync('rsa', {
        modulusLength: 512,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
        }
    });
}

//     const publicKey = `-----BEGIN PUBLIC KEY-----
// MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBALczfjaESEQFGAH3OFseIWBqdUo0qprG
// Myd2GHpQ47oGfG2Z2c8XXF4ABar2fKfqknEOXeOed+RPs9oZwFrIbwECAwEAAQ==
// -----END PUBLIC KEY-----`

//     const privateKey = `-----BEGIN PRIVATE KEY-----
// MIIBVgIBADANBgkqhkiG9w0BAQEFAASCAUAwggE8AgEAAkEAtzN+NoRIRAUYAfc4
// Wx4hYGp1SjSqmsYzJ3YYelDjugZ8bZnZzxdcXgAFqvZ8p+qScQ5d45535E+z2hnA
// WshvAQIDAQABAkEAhlF4rhvaqBRb/8T0SsoSipBDIn7uvr+mbb5GQBfif1ZWt7oM
// Iyx7QYO7AyPZlVntbmjAENCca3Pv2bNy0g6bgQIhAPDFOiUfLuC3qMBG+YC1rRV6
// 24Ed0VXrq5v8TeWAdHmZAiEAwsoNUVQAJZA/JOA0y07OxcpstXznKF0/u25oIGz5
// EakCIQDmyPYiDRDfH8xmeeHAyOQemcP7sHwuspatDxwPp6B9yQIhAJ4BWiYzdl8C
// EEZwXELirVXB6saZB8U1RuJaH7rVyn/pAiBMwcgtSG9JF3/J+0VmcXiSuXwwq7KN
// hUzatsrbKfHKgQ==
// -----END PRIVATE KEY-----`;
    
    // 生成公私密钥
    // const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    //     modulusLength: 512,
    //     publicKeyEncoding: {
    //         type: 'spki',
    //         format: 'pem'
    //     },
    //     privateKeyEncoding: {
    //         type: 'pkcs8',
    //         format: 'pem',
    //     }
    // })
    // console.log(publicKey, privateKey);
    
    // const data = 'data to crypt';

    // // 公钥加密
    // const encryptData = crypto.publicEncrypt(publicKey, Buffer.from(data)).toString('base64');
    // console.log('encode', encryptData);

    // // 私钥解密
    // const decrypted = crypto.privateDecrypt(privateKey, Buffer.from(encryptData, 'base64'));
    // console.log('decrypted ', decrypted.toString());