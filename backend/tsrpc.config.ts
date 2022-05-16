import { CodeTemplate, TsrpcConfig } from 'tsrpc-cli';

const tsrpcConf: TsrpcConfig = {
    // Generate ServiceProto
    proto: [
        {
            ptlDir: 'src/shared/protocols/authServer', // Protocol dir
            output: 'src/shared/protocols/serviceProto_authServer.ts', // Path for generated ServiceProto
            apiDir: 'src/AuthServer/api',   // API dir
            docDir: 'docs/authServer',     // API documents dir
            // ptlTemplate: CodeTemplate.getExtendedPtl(),
            // msgTemplate: CodeTemplate.getExtendedMsg(),
        },
        {
            ptlDir: 'src/shared/protocols/hallServer', // Protocol dir
            output: 'src/shared/protocols/serviceProto_hallServer.ts', // Path for generated ServiceProto
            apiDir: 'src/HallServer/api',   // API dir
            docDir: 'docs/hallServer',     // API documents dir
            ptlTemplate: CodeTemplate.getExtendedPtl(),
            // msgTemplate: CodeTemplate.getExtendedMsg(),
        },
        {
            ptlDir: 'src/shared/protocols/matchServer', // Protocol dir
            output: 'src/shared/protocols/serviceProto_matchServer.ts', // Path for generated ServiceProto
            apiDir: 'src/MatchServer/api',   // API dir
            docDir: 'docs/matchServer',     // API documents dir
            // ptlTemplate: CodeTemplate.getExtendedPtl(),
            // msgTemplate: CodeTemplate.getExtendedMsg(),
        },
        {
            ptlDir: 'src/shared/protocols/roomServer', // Protocol dir
            output: 'src/shared/protocols/serviceProto_roomServer.ts', // Path for generated ServiceProto
            apiDir: 'src/RoomServer/api',   // API dir
            docDir: 'docs/roomServer',     // API documents dir
            ptlTemplate: CodeTemplate.getExtendedPtl(),
            // msgTemplate: CodeTemplate.getExtendedMsg(),
        },
    ],
    // Sync shared code
    sync: [
        {
            from: 'src/shared',
            to: '../frontend/assets/scripts/shared',
            type: 'symlink'     // Change this to 'copy' if your environment not support symlink
        }
    ],
    // Dev server
    dev: {
        autoProto: true,        // Auto regenerate proto
        autoSync: true,         // Auto sync when file changed
        autoApi: true,          // Auto create API when ServiceProto updated
        watch: 'src',           // Restart dev server when these files changed
        entry: 'src/index.ts',  // Dev server command: node -r ts-node/register {entry}
    },
    // Build config
    build: {
        autoProto: true,        // Auto generate proto before build
        autoSync: true,         // Auto sync before build
        autoApi: true,          // Auto generate API before build
        outDir: 'dist',         // Clean this dir before build
    }
}
export default tsrpcConf;