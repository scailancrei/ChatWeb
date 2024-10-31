import { defineConfig } from "vite"

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: process.cwd() + "/apps/client/index.html"
      }
    }
  }
})
