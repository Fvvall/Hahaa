import "dotenv/config";
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import tailwindcss from "@tailwindcss/vite";
import process from "node:process";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    preact({
      reactAliasesEnabled: true,
    }),
  ],
  define: {
    "process.env": JSON.stringify(process.env),
  },
});
