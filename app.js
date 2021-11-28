const form = document.getElementById("form");
const input = document.getElementById("input");
const collection = document.querySelector(".collection");
const clearCompleted = document.querySelector(".clear-completed");
const filterOptions = document.querySelector(".filter-options");

// Events
allAppEvents()

function allAppEvents() {
  document.addEventListener("DOMContentLoaded", loadLocalStorage);
  form.addEventListener("submit", addTodo);
  collection.addEventListener("click", todoActions);
  clearCompleted.addEventListener("click", clearCompletedTodos);
  filterOptions.addEventListener("click", filterTodos);
}

// Load Local Storage
function loadLocalStorage() {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    const li = document.createElement("li");
    li.className = "todo-item card-container";
    const circle = document.createElement("div");
    circle.className = "circle";
    li.appendChild(circle);
    li.appendChild(document.createTextNode(todo));
    const link = document.createElement("a");
    link.className = "delete-item";
    link.innerHTML = `<img src="images/icon-cross.svg" alt="remove todo">`
    li.appendChild(link);
    collection.appendChild(li);
  });

  updateItemsLeft();
}

// Add Todo
function addTodo(e) {

  const li = document.createElement("li");
  li.className = "todo-item card-container";
  const circle = document.createElement("div");
  circle.className = "circle";
  li.appendChild(circle);
  li.appendChild(document.createTextNode(input.value));
  const link = document.createElement("a");
  link.className = "delete-item";
  link.innerHTML = `<img src="images/icon-cross.svg" alt="remove todo">`
  li.appendChild(link);
  collection.appendChild(li);
  
  input.value = "";

  addToLocalStorage(li.innerText);

  updateItemsLeft();

  e.preventDefault();
}

// Add Todo to Local Storage
function addToLocalStorage(todo) {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);

  localStorage.setItem("todos", JSON.stringify(todos));
}

// Check/Uncheck, Remove Todo
function todoActions(e) {
  // Check/Uncheck Todo
  if (e.target.classList.contains("circle")) {
    e.target.parentElement.classList.toggle("checked");
  }

  // Remove Todo
  if (e.target.parentElement.classList.contains("delete-item")) {
    e.target.parentElement.parentElement.remove();

    // Remove from Local Storage
    removeFromLocalStorage(e.target.parentElement.parentElement);
  }

  updateItemsLeft();
}

// Clear Completed
function clearCompletedTodos(e) {
  const checkedItems = document.querySelectorAll(".checked");

  for (i = 0; i < checkedItems.length; i++) {
    checkedItems[i].remove();
    // remove from local storage
    removeFromLocalStorage(checkedItems[i]);
  }

  e.preventDefault();
}

// Remove Todo From Local Storage
function removeFromLocalStorage(todo) {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (item, index) {
    if (item === todo.innerText) {
      todos.splice(index, 1);
    }
  });

  localStorage.setItem("todos", JSON.stringify(todos));

}

// Items left
function updateItemsLeft() {
  const itemsLeft = document.querySelector(".items-left");
  const itemsChecked = document.querySelectorAll(".checked");

  let numberOfItemsLeft;
  if (collection.childElementCount > itemsChecked.length) {
    numberOfItemsLeft = collection.childElementCount - itemsChecked.length;
  } else {
    numberOfItemsLeft = itemsChecked.length - collection.childElementCount;
  }

  itemsLeft.innerText = `${numberOfItemsLeft} items left`;
}

// Filter todos
function filterTodos(e) {
  const todos = document.querySelectorAll(".todo-item");

  todos.forEach(function (todo) {
    if (e.target.id === "filterAll") {
      todo.style.display = "flex";
    }

    if (e.target.id === "filterActive") {
      if (todo.classList.contains("checked")) {
        todo.style.display = "none";
      } else {
        todo.style.display = "flex";
      }
    }

    if (e.target.id === "filterCompleted") {
      if (todo.classList.contains("checked")) {
        todo.style.display = "flex";
      } else {
        todo.style.display = "none";
      }
    }
  });
}