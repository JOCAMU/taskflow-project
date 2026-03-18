
const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const priority = document.getElementById("priority-input");
const tasklist = document.getElementById("task-list");
const searchInput = document.getElementById("search-input");

let tasks = [];
const savedTasks = localStorage.getItem("tasks");

if (savedTasks) {
  try {
    // Intentamos cargar el array de tareas guardado.
    const parsed = JSON.parse(savedTasks);
    tasks = Array.isArray(parsed) ? parsed : [];
  } catch {
    // Si el JSON está corrupto o no es válido, empezamos desde cero.
    tasks = [];
  }
}

function saveTasks() {
  // Guardamos el estado actual en localStorage.
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Estado de la vista: filtro activo + búsqueda por texto.
let currentFilter = "all"; // all | pending | completed
let searchText = "";

function getVisibleTasks() {
  // Aplica filtro por estado (pending/completed) y luego busca por texto.
  const q = searchText.trim().toLowerCase();

  let filtered = tasks;
  if (currentFilter === "pending") {
    filtered = tasks.filter(t => !t.completed);
  } else if (currentFilter === "completed") {
    filtered = tasks.filter(t => t.completed);
  }

  if (q === "") return filtered;
  return filtered.filter(t => String(t.text || "").toLowerCase().includes(q));
}

function renderTasks(list, options) {
  // Vuelve a construir el DOM completo de la lista.
  // options.animate sirve para controlar si queremos animar (evita parpadeos).
  const toRender = Array.isArray(list) ? list : tasks;
  const shouldAnimate = Boolean(options && options.animate === true);
  tasklist.innerHTML = "";
  toRender.forEach(function(task) {
    createTaskElement(task, { animate: shouldAnimate });
  });
}

function updateStats() {
  // Recalcula contadores para el panel lateral.
  const total = tasks.length;
  const completed = tasks.filter(function(t) {
    return t.completed === true;
  }).length;
  const pending = total - completed;

  document.getElementById("total-tasks").textContent = total;
  document.getElementById("completed-tasks").textContent = completed;
  document.getElementById("pending-task").textContent = pending;
}

function createTaskElement(taskData, options) {
  // Construye la tarjeta de una tarea y configura los listeners de sus botones.
  const shouldAnimate = Boolean(options && options.animate === true);

  const task = document.createElement("div");
 task.className = "bg-gray-300 dark:bg-gray-800 p-4 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 flex justify-between items-stretch";

  const priorityColor =
    taskData.level === "alta"
    ? "bg-red-500"
    : taskData.level === "media"
    ? "bg-yellow-500"
    : "bg-green-500";

  const left = document.createElement("div");
  left.className = "flex items-center gap-3 w-full";

  const bar = document.createElement("div");
  bar.className = `w-2 h-full rounded ${priorityColor}`;

  const content = document.createElement("div");
  content.className = "flex flex-col";

  const h3 = document.createElement("h3");
  h3.className = "font-semibold text-gray-800 dark:text-white";
  h3.textContent = String(taskData.text ?? "");

  const badge = document.createElement("span");
  badge.className = `text-white text-xs px-2 py-1 rounded ${priorityColor}`;
  badge.textContent = String(taskData.level ?? "");

  content.appendChild(h3);
  content.appendChild(badge);

  left.appendChild(bar);
  left.appendChild(content);
  task.appendChild(left);

  const deletebtn = document.createElement("button");
  deletebtn.textContent = "completada";
  deletebtn.className = "bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-700 transition";
 
  // Estado visual inicial si la tarea ya viene como completada.
 if (taskData.completed === true) {
  task.classList.add("opacity-50");
  task.querySelector("h3").classList.add("line-through");
  deletebtn.textContent = "descompletar";
}
  deletebtn.setAttribute("aria-label", "marcar tarea como completada");

  // Click en este botón alterna "completada" <-> "pendiente".
 deletebtn.addEventListener("click", function () {
  const tareaEncontrada = tasks.find(function(t) {
    return t.id === taskData.id;
  });
  if (!tareaEncontrada) return;

  if (tareaEncontrada.completed === false) {
    tareaEncontrada.completed = true;
    task.classList.add("opacity-50");
    task.querySelector("h3").classList.add("line-through");
    deletebtn.textContent = "Descompletar";
  } else {
    tareaEncontrada.completed = false;
    task.classList.remove("opacity-50");
    task.querySelector("h3").classList.remove("line-through");
    deletebtn.textContent = "completada";
  }

  saveTasks();
  updateStats();
  renderTasks(getVisibleTasks());
});

 const editBtn = document.createElement("button");
editBtn.textContent = "editar";
editBtn.className = "bg-gray-600 text-white px-1 py-1 rounded hover:bg-gray-700 transition ml-1";
editBtn.setAttribute("aria-label", "editar tarea");

  // Estado interno del botón "editar/guardar" para esta tarea.
let isEditing = false;
let editInput = null;

editBtn.addEventListener("click", function() {
  if (!isEditing) {
    // Modo editar: reemplazamos el texto por un input.
    const h3 = task.querySelector("h3");
    if (!h3) return;

    const currentText = h3.textContent.trim();
    editInput = document.createElement("input");
    editInput.value = currentText;
    editInput.className = "border p-1 rounded w-full";

    h3.replaceWith(editInput);
    editBtn.textContent = "guardar";
    isEditing = true;
    return;
  }

  // Modo guardar: actualizamos el texto en el estado (tasks) y re-render.
  const newText = (editInput ? editInput.value : "").trim();
  if (newText === "") return;

  const tareaEncontrada = tasks.find(function(t) {
    return t.id === taskData.id;
  });
  if (!tareaEncontrada) return;

  tareaEncontrada.text = newText;
  taskData.text = newText;

  const newH3 = document.createElement("h3");
  newH3.className = "font-semibold text-gray-800 dark:text-white";
  newH3.textContent = newText;

  if (editInput) editInput.replaceWith(newH3);
  editInput = null;
  editBtn.textContent = "editar";
  isEditing = false;

  saveTasks();
  renderTasks(getVisibleTasks());
});

task.appendChild(deletebtn);
task.appendChild(editBtn);
tasklist.appendChild(task);

  // Animación opcional al crear/redibujar (solo si lo indicamos desde renderTasks()).
  if (shouldAnimate) {
  setTimeout(() => {
    task.classList.add("animate-fade");
  }, 10);
}
}
renderTasks();
updateStats();

form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Crear una nueva tarea desde el formulario.
  const text = input.value.trim();
  const level = priority.value;

  if (text === "") return;

  const newTask = {
    id: Date.now(),
    text: text,
    level: level,
    completed: false,
    createdAt: new Date().toLocaleDateString() 
  };

  tasks.push(newTask);
  saveTasks();
  // Al añadir una tarea nueva, animamos para que se note el cambio.
  renderTasks(getVisibleTasks(), { animate: true });
  input.value = "";
  updateStats();
});

searchInput.addEventListener("input", function () {
  // Actualizamos el texto de búsqueda y redibujamos la lista visible.
  searchText = searchInput.value;
  renderTasks(getVisibleTasks());
});


const toggle = document.getElementById("toggle-dark");

// Al cargar la página restauramos el modo oscuro (si estaba guardado).
if (localStorage.getItem("darkMode") === "true") {
  document.documentElement.classList.add("dark");
}

toggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  // Guardamos la preferencia para la próxima visita.
  const isDark = document.documentElement.classList.contains("dark");
  localStorage.setItem("darkMode", isDark);
});

const clearBtn = document.getElementById("clear-completed");
clearBtn.addEventListener("click", () => {
  // Eliminamos del array todas las tareas completadas.
  tasks = tasks.filter(t => !t.completed);

  saveTasks();
  renderTasks(getVisibleTasks());

  updateStats();
});

document.getElementById("filter-all").addEventListener("click", function() {
  // Mostramos todas las tareas respetando la búsqueda actual.
  currentFilter = "all";
  renderTasks(getVisibleTasks());
});

document.getElementById("filter-pending").addEventListener("click", function() {
  // Mostramos solo pendientes.
  currentFilter = "pending";
  renderTasks(getVisibleTasks());
});

document.getElementById("filter-completed").addEventListener("click", function() {
  // Mostramos solo completadas.
  currentFilter = "completed";
  renderTasks(getVisibleTasks());
});

document.getElementById("complete-all").addEventListener("click", function() {
  // Marcamos todas como completadas.
  tasks.forEach(function(t) {
    t.completed = true;
  });

  saveTasks();
  renderTasks(getVisibleTasks());

  updateStats();
});










