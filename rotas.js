const express = require("express");
const sqlite3 = require("sqlite3");

const PORT = 3000; // Porta TCP do servidor HTTP da aplicação

const app = express(); // Instância para uso do Express

const db = new sqlite3.Database("user.db"); // Instância para uso do Sqlite3, e usa o arquivo 'user.db'

db.serialize(() => {
  // Este método permite enviar comandos SQL em modo 'sequencial'
  db.run(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)"
  );
});

// Cria conexão com o banco de dados

const index =
  '<a href="/">Home</a> <a href="/sobre">Sobre</a> <a href="/login"> Login</a> <a href="/cadastro"> Cadastro</a>';
const sobre = 'Você está na página "Sobre"<br><a href ="/">Voltar</a>';
const login = 'Você está na página "Login"<br><a href ="/">Voltar</a>';
const cadastro = 'Você está na página "Cadastro"<br><a href ="/">Voltar</a>';

/* Método express.get necessita de dois parâmetros
// Na ARROW FUNCTION , o primeiro são os dados do servidor (REQUISITION - 'req')
o segundo são os dados que serão enviados ao cliente (RESULT - 'res') */
app.get("/", (req, res) => {
  res.send(index);
});

app.get("/sobre", (req, res) => {
  res.send(sobre);
});

app.get("/login", (req, res) => {
  res.send(login);
});

app.get("/cadastro", (req, res) => {
  res.send(cadastro);
});

// app.listen() deve ser o último comando da aplicação (app.js)
app.listen(PORT, () => {
  console.log(`Servidor sendo executado na porta ${PORT}`);
});
