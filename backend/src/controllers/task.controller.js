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

function eliminarTarea(req, res, next) {
  const id = Number(req.params.id);

  try {
    taskService.eliminarTarea(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

function actualizarTarea(req, res, next) {
  const id = Number(req.params.id);
  const { completed } = req.body;

  try {
    const tareaActualizada = taskService.actualizarTarea(id, { completed });
    res.json(tareaActualizada);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  obtenerTareas,
  crearTarea,
  eliminarTarea,
  actualizarTarea // 🔥 clave
};