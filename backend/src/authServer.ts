import { AuthServer } from "./AuthServer/AuthServer";

// 环境变量配置
// 程序运行的端口 默认 2022
const port = parseInt(process.env['PORT'] || '2022');

export const authServer = new AuthServer({
    port: port
});

// Entry function
async function main() {
    await authServer.init();
    await authServer.start();
}
main();

