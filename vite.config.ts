import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

const env = loadEnv("DEV", process.cwd(), "");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: Number(env.VITE_PORT),
    host: "0.0.0.0",
  },
});
