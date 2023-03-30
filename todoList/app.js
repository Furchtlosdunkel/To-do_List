const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

addTaskBtn.addEventListener("click", function () {
    const taskText = taskInput.value;
    if (textText === "") {
        alert("Please enter a task!");
        return;
    }

    const taskItem = docuemnt.createElment("li");
    taskItem.innerHTML = `
    <span>${taskText}</span>
    <button class="deleteBtn">Delete</button>
    `;
    taskList.appendChild(taskItem);
    taskInput.value = "";
});
taskList.addEventListener("click", function (event) {
    if (event.target.classList.contains("deleteBtn")) {
        event.target.parentElement.remove();
    }
});