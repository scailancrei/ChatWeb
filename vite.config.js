import { defineConfig } from "vite"

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: process.cwd() + "/docs/apps/client/index.html"
      }
    }
  }
})
