/*
 * @Author: hwx
 * @Date: 2022-05-16 09:23:11
 * @LastEditors: hwx
 * @LastEditTime: 2022-05-18 12:20:13
 * @FilePath: \backend\src\models\BackConfig.ts
 * @Description: 
 */
export const BackConfig = {

    adminToken: 'AAABBBCCC',

    dbUrl: 'mongodb://localhost:27017/test',

    roomServer: {
        /** 发送房间状态的时间间隔 */
        intervalSendState: 3000,
        /** 每个房间的最大人数 */
        maxRoomUserNum: 10
    },

    matchServer: {
        /** 执行匹配的间隔 */
        intervalMatch: 3000
    },

    publicKeyForPassword: `-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBALczfjaESEQFGAH3OFseIWBqdUo0qprG
Myd2GHpQ47oGfG2Z2c8XXF4ABar2fKfqknEOXeOed+RPs9oZwFrIbwECAwEAAQ==
-----END PUBLIC KEY-----`,

    privateKeyForPassword: `-----BEGIN PRIVATE KEY-----
MIIBVgIBADANBgkqhkiG9w0BAQEFAASCAUAwggE8AgEAAkEAtzN+NoRIRAUYAfc4
Wx4hYGp1SjSqmsYzJ3YYelDjugZ8bZnZzxdcXgAFqvZ8p+qScQ5d45535E+z2hnA
WshvAQIDAQABAkEAhlF4rhvaqBRb/8T0SsoSipBDIn7uvr+mbb5GQBfif1ZWt7oM
Iyx7QYO7AyPZlVntbmjAENCca3Pv2bNy0g6bgQIhAPDFOiUfLuC3qMBG+YC1rRV6
24Ed0VXrq5v8TeWAdHmZAiEAwsoNUVQAJZA/JOA0y07OxcpstXznKF0/u25oIGz5
EakCIQDmyPYiDRDfH8xmeeHAyOQemcP7sHwuspatDxwPp6B9yQIhAJ4BWiYzdl8C
EEZwXELirVXB6saZB8U1RuJaH7rVyn/pAiBMwcgtSG9JF3/J+0VmcXiSuXwwq7KN
hUzatsrbKfHKgQ==
-----END PRIVATE KEY-----`,

    publicKeyForToken: `-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAL9vfcfiJMCqBeeqpuXITHlStnE7T3qi
0bWFNtjeh4v8ntE4CoVbaV1ya+GqpDZkLlh0sIBv4uzzj90AlPCdyEECAwEAAQ==
-----END PUBLIC KEY-----`,

    privateKeyForToken: `-----BEGIN PRIVATE KEY-----
MIIBVgIBADANBgkqhkiG9w0BAQEFAASCAUAwggE8AgEAAkEAv299x+IkwKoF56qm
5chMeVK2cTtPeqLRtYU22N6Hi/ye0TgKhVtpXXJr4aqkNmQuWHSwgG/i7POP3QCU
8J3IQQIDAQABAkEAusnEhuYnSj4bqOIgGxEHXVHRZkai1FxOFrm2vIDU7UaM/wOj
I2h87nJRFvSVfLGaCjMNWliVNUOzfpTJzfooSQIhAPDG28RoGPSg8kGQkTZZ2/Rr
AhqqoN7cqQ/PVtAzt0JTAiEAy4oCdiSD5NPBWaO/EjYE78MB5mbNoerdIgVZ3Arg
4JsCIARLd8YUGUXbzRZwTrbKeYrtkbcKDh6LjxRyHVlPYthzAiEAneztUAGxHMF4
yjaVMGodlnL2bHDjqHh1L8p7GJKQPXUCIQDe5eWR2wEXdKR7oLm2Q6Qvaz/vkdSd
OCDNpWS0aP2kHA==
-----END PRIVATE KEY-----`
}