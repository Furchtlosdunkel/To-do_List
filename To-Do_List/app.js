const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const checkList = document.querySelector('ul');

//localde task oluştur ve kayıtlı bişey varsa onu taskListe e ekler
if(localStorage.getItem("tasks")) {
  taskList.innerHTML = localStorage.getItem("tasks");
}

//boş dönerse
addTaskBtn.addEventListener("click", function () {
  const taskText = taskInput.value;
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }
  //görevler 
  const taskItem = document.createElement("li");
  taskItem.innerHTML = `
    <span id="span">${taskText}</span>
   <div>
   <button class="deleteBtn">Delete</button>
   <button class="editBtn">Edit</button>
   </div>
  `;
  taskList.appendChild(taskItem);
  taskInput.value = "";
  
  // Kaydedilmiş görevlerin listesini günceller
  localStorage.setItem("tasks", taskList.innerHTML);
});

//silme ve düzeltme
taskList.addEventListener("click", function (event) {
  if (event.target.classList.contains("deleteBtn")) {
    event.target.parentElement.parentElement.remove();

    // Kaydedilmiş görevlerin listesini güncelle
    localStorage.setItem("tasks", taskList.innerHTML);

  }
  else if (event.target.classList.contains("editBtn")) {
    const li = event.target.closest("li"); 
    const span = li.querySelector("#span");
    const input = document.createElement("input");
    input.type = "text";
    input.value = span.innerText;
    span.replaceWith(input);
    
    event.target.innerText = "Save";
    event.target.classList.remove("editBtn");
    event.target.classList.add("saveBtn");
  } 
  else if (event.target.classList.contains("saveBtn")) {
    const li = event.target.closest("li"); 
    const input = li.querySelector("input[type='text']");
    const span = document.createElement("span");
    span.id = "span";
    span.innerText = input.value;
    input.replaceWith(span);
    
    event.target.innerText = "Edit";
    event.target.classList.remove("saveBtn");
    event.target.classList.add("editBtn");

    // Kaydedilmiş görevlerin listesini güncelle
    localStorage.setItem("tasks", taskList.innerHTML);
  }
});
//check işareti
checkList.addEventListener('click', function (x) {
  if (x.target.tagName === 'LI') {
    x.target.classList.toggle('checked');
  }
}, false);