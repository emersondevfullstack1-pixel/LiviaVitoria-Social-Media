// server/index.ts
import express from "express";
import path from "path";

const app = express();

// Encontra o caminho para a pasta 'public' na raiz do projeto.
// 'process.cwd()' é o diretório onde o processo de build da Vercel é executado.
const staticPath = path.resolve(process.cwd(), "public");

// Serve os arquivos estáticos (CSS, JS, imagens) da pasta 'public'
app.use(express.static(staticPath));

// Para qualquer outra rota, serve o arquivo principal da sua aplicação (SPA).
app.get("*", (_req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

// Exporta o 'app' para que a Vercel possa criar uma Serverless Function com ele.
// A Vercel vai gerenciar o servidor, por isso não usamos 'app.listen()'.
export default app;
