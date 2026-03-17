
const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const priority = document.getElementById("priority-input");
const tasklist = document.getElementById("task-list");
const searchInput = document.getElementById("search-input");

let tasks = [];
const savedTasks = localStorage.getItem("tasks");

if (savedTasks) {
  tasks = JSON.parse(savedTasks);
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

function createTaskElement(taskData) {

  const task = document.createElement("div");
 task.className = "bg-gray-300 dark:bg-gray-800 p-4 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 flex justify-between items-center";

  const priorityColor =
    taskData.level === "alta"
    ? "bg-red-500"
    : taskData.level === "media"
    ? "bg-yellow-500"
    : "bg-green-500";

  task.innerHTML = `
    <div>
      <h3 class="font-semibold text-gray-800 dark:text-white">
        ${taskData.text}
      </h3>
      <span class="text-white text-xs px-2 py-1 rounded ${priorityColor}">
        ${taskData.level}
      </span>
    </div>
  `;

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

  localStorage.setItem("tasks", JSON.stringify(tasks));
  updateStats();
});

 const editBtn = document.createElement("button");
editBtn.textContent = "editar";
editBtn.className = "bg-gray-500 text-white px-1 py-1 rounded hover:bg-gray-600 transition ml-1";
editBtn.setAttribute("aria-label", "editar tarea");
editBtn.addEventListener("click", function() {
  const h3 = task.querySelector("h3");
  const currentText = h3.textContent.trim();

  const editInput = document.createElement("input");
  editInput.value = currentText;
  editInput.className = "border p-1 rounded w-full";

  h3.replaceWith(editInput);
  editBtn.textContent = "guardar";

  editBtn.addEventListener("click", function() {
    const newText = editInput.value.trim();
    if (newText === "") return;

    const tareaEncontrada = tasks.find(function(t) {
      return t.id === taskData.id;
    });

    tareaEncontrada.text = newText;
    taskData.text = newText;

    const newH3 = document.createElement("h3");
    newH3.className = "font-semibold text-gray-800 dark:text-white";
    newH3.textContent = newText;

    editInput.replaceWith(newH3);
    editBtn.textContent = "editar";

    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
});

task.appendChild(deletebtn);
task.appendChild(editBtn);
tasklist.appendChild(task);

setTimeout(() => {
  task.classList.add("animate-fade");
}, 10);
}
tasks.forEach(function (task) {
  createTaskElement(task);
});
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
  localStorage.setItem("tasks", JSON.stringify(tasks));
  createTaskElement(newTask);
  input.value = "";
  updateStats();
});

searchInput.addEventListener("input", function () {
  const searchText = searchInput.value.toLowerCase();
  const tasks = document.querySelectorAll("#task-list div");

  tasks.forEach(function (task) {
    const text = task.textContent.toLowerCase();
    if (text.includes(searchText)) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
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
clearBtn.addEventListener("click", function() {
  tasks = tasks.filter(function(t) {
    return t.completed === false;
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));

  tasklist.innerHTML = "";

  tasks.forEach(function(task) {
    createTaskElement(task);
  });

  updateStats();
});

  document.getElementById("filter-all").addEventListener("click", function() {
  const allTasks = document.querySelectorAll("#task-list div");
  allTasks.forEach(function(task) {
    task.style.display = "flex";
  });
});

document.getElementById("filter-pending").addEventListener("click", function() {
  tasklist.innerHTML = "";
  tasks.filter(function(t) {
    return t.completed === false;
  }).forEach(function(task) {
    createTaskElement(task);
  });
});

document.getElementById("filter-completed").addEventListener("click", function() {
  tasklist.innerHTML = "";
  tasks.filter(function(t) {
    return t.completed === true;
  }).forEach(function(task) {
    createTaskElement(task);
  });
});

document.getElementById("complete-all").addEventListener("click", function() {
  tasks.forEach(function(t) {
    t.completed = true;
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
  tasklist.innerHTML = "";

  tasks.forEach(function(task) {
    createTaskElement(task);
  });

  updateStats();
});










