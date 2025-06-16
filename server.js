const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const PORT = 5501;

// Conexão com o banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'onlinestudygroup'
});

db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco:', err);
  } else {
    console.log('Conectado ao banco de dados!');
  }
});

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rota de cadastro
app.post('/cadastro', (req, res) => {
  console.log("Dados recebidos:", req.body); 

  const { email, senha } = req.body;

  db.query('SELECT * FROM usuario WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).send('Erro no servidor');

    if (results.length > 0) {
      return res.status(400).send('Usuário já cadastrado.');
    }

    db.query('INSERT INTO usuario (email, senha) VALUES (?, ?)', [email, senha], (err2) => {
      if (err2) return res.status(500).send('Erro ao cadastrar usuário');

      res.send('Cadastro realizado com sucesso!');
    });
  });
});

// Rota de login
app.post('/login', (req, res) => {
  console.log("Login recebido:", req.body);

  const { email, senha } = req.body;

  db.query('SELECT * FROM usuario WHERE email = ? AND senha = ?', [email, senha], (err, results) => {
    if (err) return res.status(500).send('Erro no servidor');

    if (results.length > 0) {
      res.send('Login bem-sucedido!');
    } else {
      res.status(401).send('E-mail ou senha inválidos.');
    }
  });
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
