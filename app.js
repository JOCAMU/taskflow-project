let tasks= [];

const form = document.getElementById("task-form");
const input= document.getElementById("task-input");
const priority= document.getElementById("priority-input");
const tasklist= document.getElementById("task-list");
const savedTasks = localStorage.getItem("tasks");
if (savedTasks) {
    tasks = JSON.parse(savedTasks);
}
tasks.forEach(function(taskData){

    const task = document.createElement("div");
    task.classList.add("task");

    task.innerHTML = `
        <div class="task-header">
            <h3>${taskData.text}</h3>
            <span class="prioridad p-${taskData.level}">${taskData.level}</span>
        </div>
    `;
    const deletebtn = document.createElement("button");
    deletebtn.textContent = "Eliminar";

   deletebtn.addEventListener("click", function(){

    task.remove();

    tasks = tasks.filter(function(t){
        return t !== taskText;
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));

});

    task.appendChild(deletebtn);
    tasklist.appendChild(task);

});

form.addEventListener("submit", function(event){
    event.preventDefault();

    const text= input.value;
    const level= priority.value;
    tasks.push({
        text: text,
        level: level
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    
    const task= document.createElement("div");
    task.classList.add("task");
    task.innerHTML= ` <div class="task-header">
        <h3>${text}</h3>
        <span class="prioridad p-${level}">${level}</span>
    </div>`;

    
    const deletebtn =document.createElement("button");
    deletebtn.textContent= "eliminar";
    deletebtn.addEventListener("click", function(){
        task.remove();
    });
    task.appendChild(deletebtn);
    tasklist.appendChild(task);
    input.value=""
});