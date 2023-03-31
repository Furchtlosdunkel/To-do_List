// Get the necessary elements from the DOM
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const checkList = document.querySelector('ul');

// Check if there are any saved tasks in local storage and add them to the task list
if (localStorage.getItem("tasks")) {
  taskList.innerHTML = localStorage.getItem("tasks");
}

// Add a new task to the list when the "Add Task" button is clicked
addTaskBtn.addEventListener("click", function () {
  const taskText = taskInput.value;
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }
  // Create a new list item for the task
  const taskItem = document.createElement("li");
  taskItem.innerHTML = `
    <div>
      <input type="checkbox" class="chkbox">
      <span id="span" class="task">${taskText}</span>
    </div>
    <div>
      <button class="deleteBtn">Delete</button>
      <button class="editBtn">Edit</button>
    </div>
  `;
  //checkbox
  const checkbox = taskItem.querySelector('.chkbox');
  const span = taskItem.querySelector('.task');
  
  checkbox.addEventListener('change', function() {
    if (this.checked) {
      this.parentNode.parentNode.remove();
    } 
  });
  
  taskList.appendChild(taskItem);
  taskInput.value = "";

  // Update the saved task list in local storage
  localStorage.setItem("tasks", taskList.innerHTML);
});

// Handle delete and edit button clicks
taskList.addEventListener("click", function (event) {
  if (event.target.classList.contains("deleteBtn")) {
    event.target.parentElement.parentElement.remove();

    // Update the saved task list in local storage
    localStorage.setItem("tasks", taskList.innerHTML);

  }
  else if (event.target.classList.contains("editBtn")) {
    // Replace the task text with an input field for editing
    const li = event.target.closest("li");
    const span = li.querySelector("#span");
    const input = document.createElement("input");
    input.type = "text";
    input.value = span.innerText;
    span.replaceWith(input);

    // Change the button text and class for saving changes
    event.target.innerText = "Save";
    event.target.classList.remove("editBtn");
    event.target.classList.add("saveBtn");
  }
  else if (event.target.classList.contains("saveBtn")) {
    // Replace the input field with the edited task text
    const li = event.target.closest("li");
    const input = li.querySelector("input[type='text']");
    const span = document.createElement("span");
    span.id = "span";
    span.innerText = input.value;
    input.replaceWith(span);

    // Change the button text and class back to edit mode
    event.target.innerText = "Edit";
    event.target.classList.remove("saveBtn");
    event.target.classList.add("editBtn");

    // Update the saved task list in local storage
    localStorage.setItem("tasks", taskList.innerHTML);
  }
});