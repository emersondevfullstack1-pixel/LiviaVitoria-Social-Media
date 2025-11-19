// server/index.ts
import express from "express";
import path from "path";

// Cria a aplicação Express
const app = express();

// Define o caminho para a pasta 'public'.
// 'process.cwd()' retorna o diretório raiz do projeto no ambiente da Vercel.
const staticPath = path.resolve(process.cwd(), "public");

// Configura o Express para servir os arquivos estáticos (CSS, JS, imagens)
// que estão na pasta 'public'.
app.use(express.static(staticPath));

// Cria uma rota "catch-all" (*). Qualquer requisição que não encontrou um arquivo estático
// será respondida com o 'index.html'. Isso é essencial para Single Page Applications (SPAs).
app.get("*", (_req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

// Exporta a aplicação 'app'.
// A Vercel vai pegar essa exportação e cuidar de todo o gerenciamento do servidor.
// Por isso, NÃO usamos app.listen() aqui.
export default app;
