import { defineConfig } from "vite"

export default defineConfig({
  root: ".", // Define la raíz en el directorio actual
  build: {
    rollupOptions: {
      input: "./apps/client/index.html"
    },
    outDir: "./apps/server/dist"
  }
})
