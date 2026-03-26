let tasks = [];

function obtenerTodas() {
  return tasks;
}

function crearTarea(data) {
  const tarea = {
    id: Date.now(),
    text: data.text,
    level: data.level || "baja",
    completed: false
  };
  tasks.push(tarea);
  return tarea;
}

function eliminarTarea(id) {
  const existe = tasks.find(t => t.id === id);
  if (!existe) {
    throw new Error('NOT_FOUND');
  }
  tasks = tasks.filter(t => t.id !== id);
}

// 🔥 FUNCIÓN PATCH BIEN HECHA
function actualizarTarea(id, data) {
  const tarea = tasks.find(t => t.id === id);

  if (!tarea) {
    throw new Error('NOT_FOUND');
  }

  if (typeof data.completed === 'boolean') {
    tarea.completed = data.completed;
  }

  return tarea;
}

module.exports = {
  obtenerTodas,
  crearTarea,
  eliminarTarea,
  actualizarTarea // 👈 clave
};