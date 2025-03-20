"use strict"; // بتعرف الحاجه فيها error وله لا
const add = document.querySelector("#add");
const newTodo = document.querySelector("#newTodo");
const section = document.querySelector("section");
const togglebtn = document.querySelector("#toggle");
const deletebtn = document.querySelector("#del");
// Load Todos from Local Storage
document.addEventListener("DOMContentLoaded", loadTodos);

const handleAdd = () => {
  const text = newTodo.value.trim();
  if (text === "") return;

  const todo = { text, done: false };
  saveTodo(todo);

  newTodo.value = "";
  renderTodos();
};
add.addEventListener("click", handleAdd);
newTodo.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleAdd();
});
// Save Todo to Local Storage
function saveTodo(todo) {
  const todos = getTodos();
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
// Get Todos from Local Storage
function getTodos() {
  return JSON.parse(localStorage.getItem("todos")) || [];
}
// Load Todos
function loadTodos() {
  renderTodos();
}
// Render Todos
function renderTodos() {
 section.innerHTML = ""; // Clear existing elements
  const todos = getTodos();

  todos.forEach((todo, index) => {
    let wrapper = document.createElement("div");
    wrapper.classList.add("todo");

    let chkbox = document.createElement("input");
    chkbox.type = "checkbox";
    chkbox.classList.add("chk");
    chkbox.checked = todo.done;
    chkbox.addEventListener("change", () => toggleDone(index));

    let span = document.createElement("span");
    span.textContent = todo.text;
    if (todo.done) span.classList.add("done");

    wrapper.appendChild(chkbox);
    wrapper.appendChild(span);
    section.appendChild(wrapper);
  });
}
// Toggle Done State
function toggleDone(index) {
  const todos = getTodos();
  todos[index].done = !todos[index].done;
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}
// Toggle Visibility of Completed Todos
togglebtn.addEventListener("click", () => {
  document.querySelectorAll(".done").forEach((el) => {
    el.parentElement.classList.toggle("hidden");
  });
});
// Delete Completed Todos
deletebtn.addEventListener("click", () => {
  const todos = getTodos().filter(todo => !todo.done);
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
});






