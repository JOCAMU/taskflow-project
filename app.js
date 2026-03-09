

const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const priority = document.getElementById("priority-input");
const tasklist = document.getElementById("task-list");
const searchInput = document.getElementById("search-input");

const savedTasks = localStorage.getItem("tasks");

if (savedTasks) {
tasks = JSON.parse(savedTasks);
}

function createTaskElement(taskData) {

const task = document.createElement("div");

task.className =
"bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex justify-between items-center";

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

deletebtn.textContent = "Eliminar";

deletebtn.className =
"bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition";

deletebtn.addEventListener("click", function () {

task.remove();

tasks = tasks.filter(function (t) {
return t.text !== taskData.text;
});

localStorage.setItem("tasks", JSON.stringify(tasks));

});

task.appendChild(deletebtn);

tasklist.appendChild(task);

}

tasks.forEach(function (task) {
createTaskElement(task);
});

form.addEventListener("submit", function (event) {

event.preventDefault();

const text = input.value.trim();

const level = priority.value;

if (text === "") return;

const newTask = {
text: text,
level: level
};

tasks.push(newTask);

localStorage.setItem("tasks", JSON.stringify(tasks));

createTaskElement(newTask);

input.value = "";

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

toggle.addEventListener("click", () => {
document.documentElement.classList.toggle("dark");
});
