const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let mensagens = [];

app.post("/api/mensagens", (req, res) => {
  const { nome, email, mensagem } = req.body;

  if (!nome || !email || !mensagem) {
    return res.status(400).json({
      erro: "Preencha todos os campos."
    });
  }

  const novaMensagem = {
    id: Date.now(),
    nome,
    email,
    mensagem,
    data: new Date().toLocaleString("pt-BR")
  };

  mensagens.push(novaMensagem);

  res.status(201).json({
    sucesso: true,
    mensagem: "Mensagem enviada com sucesso!",
    dados: novaMensagem
  });
});

app.get("/api/mensagens", (req, res) => {
  res.json(mensagens);
});

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});