const bodyParser = require("body-parser");
const express = require("express"); // Importa biblioteca do express
const sqlite3 = require("sqlite3"); // Importa biblioteca sqlite3

const PORT = 8000; // Porta TCP do servidor HTTP da aplicação

const app = express(); //Instãncia para uso de express

const db = new sqlite3.Database("user.db"); // Instância para uso de SQLite3, e usa o arquivo 'user.db'
// Este método permite enviar comandos SQl em modo 'sequencial'
db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT,
    email TEXT, tel TEXT, cpf TEXT, rg TEXT)`
  );
});

// __dirname é variável interna do nodejs que guarda o caminho absoluto do projeto
console.log(__dirname);

// Aqui será acrescentado uma rota "/static", parar a pasta __dirname + "/static"
// O app.use é usado para acrescenter rotas novas para o express gerenciar e poder usar
// Middleware para isso, que neste caso é o express.static, que gerencia rotas estáticas
app.use("/static", express.static(__dirname + "/static"));

// Middleware para processar as requisições do body parameters do cliente
app.use(bodyParser.urlencoded({ extended: true }));

//Configurar EJS como o motor de visualização
app.set("view engine", "ejs");

// Cria conexão com o banco de dados
const index =
  "<a href='/'>Home</a> <a href='/sobre'>Sobre</a> <a href='/login'>login</a> <a href='/cadastro'>Cadastro</a>";
const sobre = "Você está na página 'sobre'<br><a href='/'>Voltar</a>";
const login = "Você está na página 'login' <br><a href='/'>Voltar</a>";
const cadastro = "Você está na página 'cadastro' <br><a href='/'>Voltar</a>";

/* Método express.get necessita de dois parãmetros
Na ARROW FUNCTION, o primeiro são os dados do servidor (REQUISITION - 'req')
O segundo são os dados que serão enviados ao cliente (RESULT - 'res')
|*/
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/sobre", (req, res) => {
  res.send(sobre);
});

app.get("/login", (req, res) => {
  res.render("login");
});

// Rota para processar o formulário de login
app.post("/login", (req, res) => {
  res.send("Login ainda não implementado");
});

app.get("/cadastro", (req, res) => {
  res.send(cadastro);
});

app.post("/cadastro", (req, res) => {
  req.body
    ? console.log(JSON.stringify(req.body))
    : console.log(`Body vazio: ${req.bod}`);
  res.send(
    `Bem-vindo usuário: ${req.body.username}, seu email é ${req.body.email}`
  );
});

// app.listen() deve ser o último comando da aplicação (app.js)
app.listen(PORT, () => {
  console.log(`Servidor sendo executado na porta ${PORT}`);
});
