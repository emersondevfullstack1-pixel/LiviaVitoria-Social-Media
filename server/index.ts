import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // No Vercel, o dist/index.js está em /var/task/dist/index.js e os estáticos em /var/task/dist/public.
  // O __dirname será /var/task/dist.
  // Para produção, o caminho deve ser path.resolve(__dirname, "public").
  // Para desenvolvimento, o caminho deve ser path.resolve(__dirname, "..", "..", "dist", "public")
  // se o script for executado de server/index.ts.
  // No entanto, o script de build compila para dist/index.js, então a lógica de desenvolvimento
  // original (que você tinha na imagem) estava incorreta.
  // Vou usar a lógica que o Vercel espera para o arquivo compilado.

  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public") // Caminho correto para o arquivo compilado em dist/
      : path.resolve(__dirname, "..", "..", "dist", "public"); // Caminho para dev (se executado de server/index.ts)

  app.use(express.static(staticPath));

  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3e3;
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
