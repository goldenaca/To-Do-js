// SET VARIABLES
const inputTaskButton = document.getElementById("inputTaskButton");
const inputTask = document.getElementById("inputTask");
const deleteButton = document.getElementById("deleteButton");
const tasks = document.getElementById("tasks");
const count = document.getElementById("count");
let id = 0;
let storageList = [];
let countStorage = 0;

//FUNCTIONS

const createTask = () => {
  if (inputTask.value !== "") {
    // create list element
    const storageTask = {
      id: id,
      value: inputTask.value,
      taskStatus: false,
    };
    storageList.push(storageTask);
    storage();
    // Display Current Task
    addTask(storageTask.id, storageTask.value, false);
    // Reset values from dom
    inputTask.value = null;
  }
};

const addTask = (taskId, taskValue, taskStatus) => {
  let status = "taskText";
  if (taskStatus == true) {
    status = "taskText taskDone";
  }
  const newTask = document.createElement("div");
  newTask.innerHTML = `<div id="${taskId}" class="tasks">
            <p class="${status}">${taskValue}</p>
            <div class="buttons">
              <i id="done" class="material-icons green pointer">check</i>
              <i id="close" class="material-icons red pointer">close</i>
            </div>
          </div>`;
  tasks.appendChild(newTask);
  id++;
};

const taskDone = (task) => {
  if (task.className.includes("taskDone")) {
    task.className = "taskText";
    for (const item of storageList) {
      if (item.id == task.parentNode.id) {
        item.taskStatus = false;
        storage();
      }
    }
  } else {
    task.className = "taskText taskDone";
    for (const item of storageList) {
      if (item.id == task.parentNode.id) {
        item.taskStatus = true;
        storage();
      }
    }
    taskCount();
  }
};

const taskCount = () => {
  countStorage++;
  localStorage.setItem("doneTasksCount", JSON.stringify(countStorage));
  count.innerText = `Contador: ${countStorage}`;
};

const deleteTask = (id) => {
  document.getElementById(id).remove();
  deleteStorage(id);
  storage();
};

const deleteAllTasks = () => {
  tasks.innerHTML = "";
  id = 0;
  storageList = [];
  storage();
  storageList.length = 0;
};

const storage = () => {
  localStorage.setItem("todo", JSON.stringify(storageList));
};

const askLocalStorage = () => {
  if (JSON.parse(localStorage.getItem("todo"))) {
    storageList = JSON.parse(localStorage.getItem("todo"));
  }
  if (JSON.parse(localStorage.getItem("doneTasksCount"))) {
    countStorage = JSON.parse(localStorage.getItem("doneTasksCount"));
  }
  console.log(storageList);
  count.innerText = `Contador: ${countStorage}`;
  displayTask();
};

const deleteStorage = (id) => {
  let i = 0;
  for (const object of storageList) {
    if (object.id == id) return storageList.splice(i, 1);
    i++;
  }
};

const displayTask = () => {
  for (const task of storageList) {
    task.id = id;
    addTask(task.id, task.value, task.taskStatus);
  }
};

// Ask to localStorage for old tasks

askLocalStorage();

// Buttons actions

addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.id === "inputTaskButton") {
    createTask();
  }
  if (e.target.id === "deleteButton") {
    deleteAllTasks();
  }
  if (e.target.id === "close") {
    deleteTask(e.target.parentNode.parentNode.id);
  }
  if (e.target.id === "done") {
    taskDone(e.target.parentNode.previousElementSibling);
  }
  if (e.target.id === "count") {
    countStorage = 0;
    localStorage.setItem("doneTasksCount", JSON.stringify(countStorage));
    count.innerText = `Contador: ${countStorage}`;
  }
});
