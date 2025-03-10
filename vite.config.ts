import { internalIpV4 } from "internal-ip";
import { defineConfig } from "vite";

const mobile = !!/android|ios/.exec(process.env.TAURI_ENV_PLATFORM);

// https://vitejs.dev/config/
export default defineConfig(async () => ({
    plugins: [],

    base: "./",

    // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
    //
    // 1. prevent vite from obscuring rust errors
    clearScreen: false,
    // 2. tauri expects a fixed port, fail if that port is not available
    server: {
        port: 4321,
        strictPort: true,
        host: mobile ? "0.0.0.0" : false,
        hmr: mobile
            ? {
                protocol: "ws",
                host: await internalIpV4(),
                port: 4321,
            }
            : undefined,
        watch: {
            // 3. tell vite to ignore watching `src-tauri`
            ignored: ["**/src-tauri/**"],
        },
    },
}));
