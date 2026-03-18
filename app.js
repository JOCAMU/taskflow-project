
const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const priority = document.getElementById("priority-input");
const tasklist = document.getElementById("task-list");
const searchInput = document.getElementById("search-input");

let tasks = [];
const savedTasks = localStorage.getItem("tasks");

if (savedTasks) {
  try {
    const parsed = JSON.parse(savedTasks);
    tasks = Array.isArray(parsed) ? parsed : [];
  } catch {
    tasks = [];
  }
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

let currentFilter = "all"; // all | pending | completed
let searchText = "";

function getVisibleTasks() {
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
  const toRender = Array.isArray(list) ? list : tasks;
  const shouldAnimate = Boolean(options && options.animate === true);
  tasklist.innerHTML = "";
  toRender.forEach(function(task) {
    createTaskElement(task, { animate: shouldAnimate });
  });
}

function updateStats() {
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
 
 if (taskData.completed === true) {
  task.classList.add("opacity-50");
  task.querySelector("h3").classList.add("line-through");
  deletebtn.textContent = "descompletar";
}
  deletebtn.setAttribute("aria-label", "marcar tarea como completada");
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
let isEditing = false;
let editInput = null;

editBtn.addEventListener("click", function() {
  if (!isEditing) {
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
  renderTasks(getVisibleTasks(), { animate: true });
  input.value = "";
  updateStats();
});

searchInput.addEventListener("input", function () {
  searchText = searchInput.value;
  renderTasks(getVisibleTasks());
});


const toggle = document.getElementById("toggle-dark");

// Al cargar la página comprueba si había guardada una preferencia
if (localStorage.getItem("darkMode") === "true") {
  document.documentElement.classList.add("dark");
}

toggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  // Guarda la preferencia en localStorage
  const isDark = document.documentElement.classList.contains("dark");
  localStorage.setItem("darkMode", isDark);
});

const clearBtn = document.getElementById("clear-completed");
clearBtn.addEventListener("click", () => {
  tasks = tasks.filter(t => !t.completed);

  saveTasks();
  renderTasks(getVisibleTasks());

  updateStats();
});

document.getElementById("filter-all").addEventListener("click", function() {
  currentFilter = "all";
  renderTasks(getVisibleTasks());
});

document.getElementById("filter-pending").addEventListener("click", function() {
  currentFilter = "pending";
  renderTasks(getVisibleTasks());
});

document.getElementById("filter-completed").addEventListener("click", function() {
  currentFilter = "completed";
  renderTasks(getVisibleTasks());
});

document.getElementById("complete-all").addEventListener("click", function() {
  tasks.forEach(function(t) {
    t.completed = true;
  });

  saveTasks();
  renderTasks(getVisibleTasks());

  updateStats();
});










