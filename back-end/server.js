const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const path = require('path');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../front-end')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../front-end/index.html'));
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  db.query(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, hashed],
    (err) => {
      if (err) return res.json({ status: 'error', err });
      res.json({ status: 'ok' });
    }
  );
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.query(
    'SELECT * FROM users WHERE username = ?',
    [username],
    async (err, results) => {
      if (err) return res.json({ status: 'error', err });
      if (results.length === 0)
        return res.json({ status: 'error', message: 'Usuario no encontrado' });
      const match = await bcrypt.compare(password, results[0].password);
      if (!match)
        return res.json({ status: 'error', message: 'Contraseña incorrecta' });
      res.json({ status: 'ok', message: 'Login exitoso' });
    }
  );
});

app.listen(3000, () => console.log('Servidor en http://localhost:3000'));