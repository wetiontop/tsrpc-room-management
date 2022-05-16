import { HallServer } from "./HallServer/HallServer";

// 环境变量配置
// 程序运行的端口 默认 2022
const port = parseInt(process.env['PORT'] || '2023');

export const hallServer = new HallServer({
    port: port
});

// Entry function
async function main() {
    await hallServer.init();
    await hallServer.start();
}
main();

