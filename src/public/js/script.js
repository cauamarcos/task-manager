

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
function saveTodo(text, idTask, done = 0, save = 1) {
    const todo = document.createElement("div");
    todo.classList.add("todo");
    //todo.dataset.id = idTask;
    console.log("isTask: ", idTask);
    todo.setAttribute("data-id", idTask);

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

    if (done)
        todo.classList.add("done");

    todoList.appendChild(todo);
    todoInput.value = "";
    todoInput.focus();
}

async function criarTask(descricao) {
    // const idCliente = localStorage.getItem("idCliente");
    //console.log(idCliente)
    try {
        const idCliente = localStorage.getItem("idCliente");
        if (!idCliente) {
            // Redireciona para o login se não houver ID
            window.location.href = "../templates/login.html";
        }

        const response = await fetch(`http://localhost:3000/tasks/criar/${idCliente}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                descricao: descricao,
            })
        });
        const novaTarefa = await response.json();
        if (novaTarefa.status === false) {
            console.error(novaTarefa.msg);
            return null;
        }
        else {
            //console.log("Tarefa criada:", novaTarefa);
            return novaTarefa;
        }

    } catch (error) {
        console.error("Erro ao criar tarefas:", error);
    }
}

async function carregarTarefas() {
    const idCliente = localStorage.getItem("idCliente");
    if (!idCliente) {
        // Redireciona para o login se não houver ID
        window.location.href = "../templates/login.html";
    }

    try {
        const response = await fetch(`http://localhost:3000/tasks/${idCliente}/`);
        const tarefas = await response.json();
        //console.log(tarefas);
        tarefas.data.forEach((tarefa) => {
            saveTodo(tarefa.descricao, tarefa.id, tarefa.finalizada ? 1 : 0, 0);
        });

    } catch (error) {
        console.error("Erro ao carregar tarefas:", error);
    }
}

// Chama essa função ao carregar a página
document.addEventListener("DOMContentLoaded", carregarTarefas);

async function deletarTask(id) {
    try {
        const response = await fetch(`http://localhost:3000/tasks/deletar/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });

        const result = await response.json();

        if (result.status) {
            console.log("Tarefa removida com sucesso:", id);
        } else {
            console.error("Erro ao remover tarefa:", result.error);
        }

    } catch (error) {
        console.error("Erro ao deletar tarefa:", error);
    }
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

        if (todoTitle.innerText === oldTitle) {
            todoTitle.innerText = text;
        }
    });
}

const getSearchTodos = (search) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("p").innerText.toLowerCase();

        const normalizedSearch = search.toLowerCase();

        todo.style.display = "flex";

        if (!todoTitle.includes(normalizedSearch))
            todo.style.display = "none";
    })
}

const filterTodos = (filterValue) => {
    const todos = document.querySelectorAll(".todo");

    switch (filterValue) {
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

// Eventos
addForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const inputValue = todoInput.value;
    if (inputValue) {
        const novaTarefa = await criarTask(inputValue);
        if (novaTarefa !== null) saveTodo(novaTarefa.data[0].descricao, novaTarefa.data[0].id, novaTarefa.data[0].finalizada ? 1 : 0, 0);
    }
});

document.addEventListener("click", async (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    // o pai será a div todo
    let todoTitle;

    if (parentEl && parentEl.querySelector("p"))
        todoTitle = parentEl.querySelector("p").innerText;

    if (targetEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle("done");
    }

    // Remover a tarefa
    if (targetEl.classList.contains("delete-todo")) {
        const todoId = parentEl.dataset.id;  // Pegamos o ID da tarefa armazenado no atributo data-id
        console.log("Id: ", todoId);
        await deletarTask(todoId);  // Chama a função para remover a tarefa no backend

        parentEl.remove();  // Remove a tarefa do HTML
    }

    if (targetEl.classList.contains("edit-todo")) {
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

    if (editInputValue)
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
