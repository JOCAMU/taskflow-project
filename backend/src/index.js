const express = require('express');
const cors = require('cors');
const { PORT } = require('./config/env');
const taskRoutes = require('./routes/task.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/tasks', taskRoutes);
app.use((err, req, res, next) => {
  console.error(err);

  if (err.message === 'NOT_FOUND') {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  return res.status(500).json({ error: 'Error interno del servidor' });
});
app.use((err, req, res, next) => {
  console.error("ERROR REAL:", err.message);

  return res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});

app.get('/test', (req, res) => {
  res.send('FUNCIONA BACKEND');
});
console.log("este es mi backend acrual")