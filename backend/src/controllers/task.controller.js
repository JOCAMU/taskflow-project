const taskService = require('../services/task.service');

function obtenerTareas(req, res) {
  const tasks = taskService.obtenerTodas();
  res.json(tasks);
}

function crearTarea(req, res) {
  const { text, level } = req.body;

  if (!text || typeof text !== 'string' || text.trim().length < 1) {
    return res.status(400).json({ error: "El texto de la tarea es obligatorio" });
  }

  const tarea = taskService.crearTarea({ text, level });
  res.status(201).json(tarea);
}

function eliminarTarea(req, res) {
  const id = Number(req.params.id);

  try {
    taskService.eliminarTarea(id);
    res.status(204).send();
  } catch (error) {
    if (error.message === 'NOT_FOUND') {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

module.exports = { obtenerTareas, crearTarea, eliminarTarea };