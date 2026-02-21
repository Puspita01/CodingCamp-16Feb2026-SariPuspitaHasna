const addBtn = document.getElementById("add-btn");
const todoInput = document.getElementById("todo-input");
const dateInput = document.getElementById("date-input");
const todoList = document.getElementById("todo-list");
const deleteAllBtn = document.getElementById("delete-all-btn");
const filterBtn = document.getElementById("filter-btn");

let todos = [];

addBtn.addEventListener("click", function () {
    const task = todoInput.value.trim();
    const date = dateInput.value;

    if (task === "" || date === "") {
        alert("Please fill all fields!");
        return;
    }

    const todo = {
        id: Date.now(),
        task,
        date,
        completed: false
    };

    todos.push(todo);
    renderTodos();
    todoInput.value = "";
    dateInput.value = "";
});

function renderTodos(filteredTodos = todos) {
    todoList.innerHTML = "";

    if (filteredTodos.length === 0) {
        todoList.innerHTML = `<tr><td colspan="4">No task found</td></tr>`;
        return;
    }

    filteredTodos.forEach(todo => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td class="${todo.completed ? "completed" : ""}">${todo.task}</td>
            <td>${todo.date}</td>
            <td>${todo.completed ? "Done" : "Pending"}</td>
            <td>
                <button onclick="toggleStatus(${todo.id})">✔</button>
                <button onclick="deleteTodo(${todo.id})">🗑</button>
            </td>
        `;

        todoList.appendChild(row);
    });
}

function toggleStatus(id) {
    todos = todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    renderTodos();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

deleteAllBtn.addEventListener("click", function () {
    todos = [];
    renderTodos();
});

filterBtn.addEventListener("click", function () {
    const today = new Date().toISOString().split("T")[0];
    const filtered = todos.filter(todo => todo.date === today);
    renderTodos(filtered);
});

renderTodos();