const express = require('express');
const cors = require('cors');
const { PORT } = require('./config/env');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor funcionando con nodemon para que reinicie solo');
});

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});