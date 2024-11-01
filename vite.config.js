import { defineConfig } from "vite"
import path from "path"

export default defineConfig({
  root: path.resolve(__dirname, "docs/apps/client"), // Define la carpeta raíz del proyecto frontend
  build: {
    outDir: path.resolve(__dirname, "docs/apps/client/dist"), // Define el directorio de salida para el build
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "docs/apps/client/index.html") // Define el archivo principal
      }
    }
  },
  server: {
    port: 3000 // Puerto para el desarrollo local, puedes cambiarlo si lo necesitas
  }
})
