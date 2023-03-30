const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const checkList = document.querySelector('ul');

addTaskBtn.addEventListener("click", function () {
  const taskText = taskInput.value;
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }
  const taskItem = document.createElement("li");
  taskItem.innerHTML = `
    <span>${taskText}</span>
   <div>
   <button class="deleteBtn">Delete</button>
   <button class="editBtn">Edit</button>
   </div>
  `;
  taskList.appendChild(taskItem);
  taskInput.value = "";
});

taskList.addEventListener("click", function (event) {
  if (event.target.classList.contains("deleteBtn")) {
    event.target.parentElement.parentElement.remove();
  }
  else if (event.target.classList.contains("editBtn")) {
    const span = event.target.previousElementSibling;
    const input = document.createElement("input");
    input.type = "text";
    input.value = span.innerText;
    span.replaceWith(input);
    event.target.innerText = "Save";
    event.target.classList.remove("editBtn");
    event.target.classList.add("saveBtn");
  }
  else if (event.target.classList.contains("saveBtn")) {
    const input = event.target.previousElementSibling;
    const span = document.createElement("span");
    span.innerText = input.value;
    input.replaceWith(span);
    event.target.innerText = "Edit";
    event.target.classList.remove("saveBtn");
    event.target.classList.add("editBtn");
  }
});

checkList.addEventListener('click', function (x) {
  if (x.target.tagName === 'LI') {
    x.target.classList.toggle('checked');
  }
}, false);