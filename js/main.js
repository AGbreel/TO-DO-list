let taskInput = document.querySelector("#taskInput");
let addTaskBtn = document.querySelector("#addTaskBtn");
let output = document.querySelector("#output");
let sortIcon = document.querySelector("#sort");
let filterInput = document.querySelector("#filter");
let checkInput = document.querySelectorAll(".form-check input");

let flag;
let mode = "add";
let tasks = {};
let taskList = [];
let task_filtered;

if (localStorage.getItem("tasks")) {
  taskList = JSON.parse(localStorage.getItem("tasks"));
  showTask();
} else {
  taskList = [];
}

// ADD TASK
taskInput.addEventListener("keypress", function (e) {
  if (e.key == "Enter") {
    addTask();
  }
});

addTaskBtn.addEventListener("click", addTask);
function addTask() {
  tasks = {
    title: taskInput.value,
    completed: false,
  };

  if (mode == "add") {
    if (taskInput.value != "") {
      taskList.push(tasks);
    }
  } else {
    if (taskInput.value != "") {
      taskList[flag] = tasks;
      addTaskBtn.innerHTML = "ADD TASK";
      mode = "add";
    }
  }
  localStorage.setItem("tasks", JSON.stringify(taskList));
  clearInput();
  showTask();
}

// CLEAR INPUT
function clearInput() {
  taskInput.value = "";
}

// SHOW TASKS
function showTask() {
  filterTask();
  let temp = "";
  for (let i = 0; i < task_filtered.length; i++) {
    temp += `
      <div class="row py-3 justify-content-between align-items-center">
          <div class="col-3">
              <div class="form-check">
              ${
                task_filtered[i].completed
                  ? `<input checked onchange="check(${i})" class="checkInput form-check-input" type="checkbox" value="" id="checkInput${i}">`
                  : `<input onchange="check(${i})" class="checkInput form-check-input" type="checkbox" value="" id="checkInput${i}"></input>`
              }
                  <label class="form-check-label" for="checkInput${i}">${task_filtered[i].title}</label>
              </div>
          </div>

          <div class="col-2">
              <div class="icon d-flex justify-content-end">
                  <i onclick="editTask(${i})" class="fa-solid fa-pen me-4" title="Edit todo"></i>
                  <i onclick="deleteTask(${i})" class="fa-solid fa-trash ms-4" title="Delete todo"></i>
              </div>
          </div>
      </div>`;
  }
  output.innerHTML = temp;
}

// DELETE TASK
function deleteTask(i) {
  taskList.splice(i, 1);
  localStorage.setItem("tasks", JSON.stringify(taskList));
  showTask();
}

// EDIT TASK
function editTask(i) {
  flag = i;
  taskInput.value = taskList[i].title;
  addTaskBtn.innerHTML = "EDIT TASK";
  mode = "edit";
  taskInput.focus();

  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// FILTER
filterInput.addEventListener("change", showTask);
function filterTask() {
  if (filterInput.value == "completed") {
    task_filtered = taskList.filter((val) => {
      return val.completed == true;
    });
  } else if (filterInput.value == "active") {
    task_filtered = taskList.filter((val) => {
      return val.completed == false;
    });
  } else {
    task_filtered = taskList.filter((val) => {
      return val;
    });
  }
}

// SORT TASK
sortIcon.addEventListener("click", sortTask);
function sortTask() {
  taskList.sort((a, b) => (a.title > b.title ? 1 : b.title > a.title ? -1 : 0));
  showTask();
}

// CHECK COMPELTE
function check(i) {
  if (taskList[i].completed == false) {
    taskList[i].completed = true;
  } else {
    taskList[i].completed = false;
  }
  localStorage.setItem("tasks", JSON.stringify(taskList));
}
