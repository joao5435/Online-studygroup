app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  console.log('Email recebido:', email);
  console.log('Senha recebida:', senha);



  db.query('SELECT * FROM usuarios WHERE email = ? AND senha = ?', [email, senha], (err, results) => {
    if (err) return res.status(500).send('Erro no servidor');

    if (results.length > 0) {
      res.send('Login bem-sucedido!');
    } else {
      res.status(401).send('E-mail ou senha inválidos.');
    }
  });
});
