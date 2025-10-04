// Array untuk menyimpan daftar todo
let todos = [];

// Referensi elemen DOM
const todoForm = document.getElementById("todo-form");
const taskInput = document.getElementById("task");
const dateInput = document.getElementById("date");
const todoList = document.getElementById("todo-list");
const filterBtn = document.getElementById("filter-btn");
const deleteAllBtn = document.getElementById("delete-all-btn");

// Fungsi render daftar todo ke halaman
function renderTodo(list = todos) {
  todoList.innerHTML = "";

  if (list.length === 0) {
    todoList.innerHTML = "<li>No task found</li>";
    return;
  }

  list.forEach((todo, index) => {
    const li = document.createElement("li");

    const div = document.createElement("div");
    const strong = document.createElement("strong");
    strong.textContent = todo.task;
    const small = document.createElement("small");
    small.textContent = todo.date;

    div.appendChild(strong);
    div.appendChild(small);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = () => {
      deleteTodo(index);
    };

    li.appendChild(div);
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
  });
}

// Fungsi tambah todo baru
function addTodo(event) {
  event.preventDefault();

  const task = taskInput.value.trim();
  const date = dateInput.value;

  // Validasi input
  if (!task || !date) {
    alert("Task and Date cannot be empty!");
    return;
  }

  // Tambah todo ke array
  todos.push({ task, date });

  // Reset form input
  taskInput.value = "";
  dateInput.value = "";

  // Render ulang daftar todo
  renderTodo();
}

// Fungsi hapus todo berdasarkan index
function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodo();
}

// Fungsi hapus semua todo
function deleteAll() {
  if (confirm("Are you sure you want to delete all tasks?")) {
    todos = [];
    renderTodo();
  }
}

// Fungsi filter todo berdasarkan tanggal hari ini
function filterTodos() {
  const today = new Date().toISOString().split("T")[0];
  const filtered = todos.filter(todo => todo.date === today);
  renderTodo(filtered);
}

// Event listener
todoForm.addEventListener("submit", addTodo);
filterBtn.addEventListener("click", filterTodos);
deleteAllBtn.addEventListener("click", deleteAll);

// Render awal (jika ada data)
renderTodo();
