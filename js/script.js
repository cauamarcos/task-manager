// Seleções
const addForm = document.querySelector("#add-form");
const editForm = document.querySelector("#edit-form");

const todoInput = document.querySelector("#todo-input");
const editInput = document.querySelector("#edit-input");
const searchInput = document.querySelector("#search-input");

const filterSelect = document.querySelector("#filter-select");
const cancelBtn = document.querySelector("#cancel-edit-btn");
const eraseBtn = document.querySelector("#erase-btn");

const todoList = document.querySelector("#todo-list");

let oldTitle;

// Funções
function saveTodo(text, done = 0, save = 1) {
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("p");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check">'
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen">'
    todo.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-todo");
    deleteBtn.innerHTML = '<i class="fa-solid fa-x">'
    todo.appendChild(deleteBtn);

    if(done)
        todo.classList.add("done");

    if(save)
        saveTodoLocalStorage({text, done});

    todoList.appendChild(todo);

    todoInput.value = "";
    todoInput.focus();
}

const toggleForms = () => {
    editForm.classList.toggle("hide");
    addForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
}

const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("p");

        if(todoTitle.innerText === oldTitle) {
            todoTitle.innerText = text;

            updateTodoLocalStorage(oldTitle, text);
        }
    });
}

const getSearchTodos = (search) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("p").innerText.toLowerCase();

        const normalizedSearch = search.toLowerCase();

        todo.style.display = "flex";

        if(!todoTitle.includes(normalizedSearch))
            todo.style.display = "none";
    })
}

const filterTodos = (filterValue) => {
    const todos = document.querySelectorAll(".todo");

    switch(filterValue) {
        case "all":
            todos.forEach((todo) => todo.style.display = "flex");
            break;
        case "done":
            todos.forEach((todo) => {
                todo.classList.contains("done") ?
                todo.style.display = "flex" :
                todo.style.display = "none"
            });
            break;
        case "todo":
            todos.forEach((todo) => {
                !todo.classList.contains("done") ?
                todo.style.display = "flex" :
                todo.style.display = "none"
            });
            break;
        default:
            break;
    }
}

function getTodosLocalStorage() {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];

    return todos;
}

function saveTodoLocalStorage(todo) {
    // pega os todos já salvos
    const todos = getTodosLocalStorage();
    // adiciona o novo todo ao resto
    todos.push(todo);
    // salva a lista atualizada no armazenamento local
    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
    const todos = getTodosLocalStorage();

    todos.forEach((todo) => {
        saveTodo(todo.text, todo.done, 0);
    })
}

function deleteTodoLocalStorage(todoText) {
    const todos = getTodosLocalStorage();

    const filteredTodos = todos.filter((todo) => todo.text !== todoText);

    localStorage.setItem("todos", JSON.stringify(filteredTodos));
}

function updateTodoStatusLocalStorage(todoText) {
    const todos = getTodosLocalStorage();

    todos.map((todo) => todo.text === todoText ? todo.done = !todo.done : null);

    localStorage.setItem("todos", JSON.stringify(todos));
}

function updateTodoLocalStorage(todoOldText, todoNewText) {
    const todos = getTodosLocalStorage();

    todos.map((todo) => todo.text === todoOldText ? todo.text = todoNewText : null);

    localStorage.setItem("todos", JSON.stringify(todos));
}

// Eventos
addForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoInput.value;
    if(inputValue)
        saveTodo(inputValue);
});

document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    // o pai será a div todo
    let todoTitle;

    if(parentEl && parentEl.querySelector("p"))
        todoTitle = parentEl.querySelector("p").innerText;

    if(targetEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle("done");

        updateTodoStatusLocalStorage(todoTitle);
    }

    if(targetEl.classList.contains("delete-todo")) {
        parentEl.remove();

        deleteTodoLocalStorage(todoTitle);
    }

    if(targetEl.classList.contains("edit-todo")) {
        toggleForms();

        editInput.value = todoTitle;
        oldTitle = todoTitle;
    }
});

cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();

    toggleForms();
});

editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;

    if(editInputValue)
        updateTodo(editInputValue);

    toggleForms();
});

searchInput.addEventListener("keyup", (e) => {
    const search = e.target.value;

    getSearchTodos(search);
});

eraseBtn.addEventListener("click", (e) => {
    e.preventDefault();

    searchInput.value = "";

    searchInput.dispatchEvent(new Event("keyup"));
    // dispara um evento de keyup para que a busca seja atualizada ao clicar no botão
});

filterSelect.addEventListener("change", (e) => {
    const filterValue = e.target.value;

    filterTodos(filterValue);
});

// inicialização
loadTodos();