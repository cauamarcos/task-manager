// Seleções
const addForm = document.querySelector("#add-form");
const editForm = document.querySelector("#edit-form");

const addTodo = document.querySelector("#add-todo");
const editTodo = document.querySelector("#edit-todo");
const dashboard = document.querySelector("#dashboard");

const todoInput = document.querySelector("#todo-input");
const editInput = document.querySelector("#edit-input");
const searchInput = document.querySelector("#search-input");

const prioritySelect = document.querySelector("#priority-select");
const priorityEdit = document.querySelector("#priority-edit");
const statusSelect = document.querySelector("#status-select");
const priorityFilterSelect = document.querySelector("#priority-filter-select");
const cancelBtn = document.querySelector("#cancel-edit-btn");
const eraseBtn = document.querySelector("#erase-btn");
const dashboardBtn = document.querySelector("#dashboard-btn");
const logoutBtn = document.querySelector('#logout-btn');

const todoList = document.querySelector("#todo-list");

const dashboardPrioritySelect = document.querySelector("#dashboard-priority-select");

let oldTitle;
let mychart;

// Funções
function saveTodo(text, idTask, done = 0, priority) {
    const todo = document.createElement("div");
    todo.classList.add("todo");
    todo.setAttribute("data-id", idTask);

    const todoTitle = document.createElement("abbr");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    if (priority == "low") {
        todo.classList.add("low");
        todoTitle.title = "Prioridade baixa";
    } else if (priority == "medium") {
        todo.classList.add("medium");
        todoTitle.title = "Prioridade média";
    } else {
        todo.classList.add("high");
        todoTitle.title = "Prioridade alta";
    }

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check">';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen">';
    todo.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-todo");
    deleteBtn.innerHTML = '<i class="fa-solid fa-x">';
    todo.appendChild(deleteBtn);

    if (done) todo.classList.add("done");

    todoList.appendChild(todo);
    todoInput.value = "";
    todoInput.focus();
}

async function criarTask(descricao, prioridade) {
    try {
        const idCliente = localStorage.getItem("idCliente");
        if (!idCliente) {
            // Redireciona para o login se não houver ID
            window.location.href = "../templates/login.html";
        }

        const response = await fetch(`http://localhost:3000/tasks/criar/${idCliente}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                descricao: descricao,
                prioridade: prioridade,
            }),
        });
        const novaTarefa = await response.json();
        if (novaTarefa.status === false) {
            console.error(novaTarefa.msg);
            return null;
        } else {
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
        //
        tarefas.data.forEach((tarefa) => {
            saveTodo(tarefa.descricao, tarefa.id, tarefa.finalizada ? 1 : 0, tarefa.prioridade);
        });
    } catch (error) {
        console.error("Erro ao carregar tarefas:", error);
    }
}

async function deletarTask(idTask) {
    const idCliente = localStorage.getItem("idCliente");
    if (!idCliente) {
        // Redireciona para o login se não houver ID
        window.location.href = "../templates/login.html";
    }
    try {
        const response = await fetch(`http://localhost:3000/tasks/deletar/${idTask}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        const result = await response.json();

        if (result.status) {
            console.log("Tarefa removida com sucesso!");
        } else {
            console.error("Erro ao remover tarefa:", result.error);
        }
    } catch (error) {
        console.error("Erro ao deletar tarefa:", error);
    }
}

async function alterarTask(idTask, descricao, finalizada, prioridade) {
    const idCliente = localStorage.getItem("idCliente");
    if (!idCliente) {
        // Redireciona para o login se não houver ID
        window.location.href = "../templates/login.html";
    }
    try {
        const response = await fetch(`http://localhost:3000/tasks/alterar/${idTask}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ descricao: descricao, finalizada: finalizada, prioridade: prioridade }),
        });

        const result = await response.json();

        if (result.status) {
            console.log("Tarefa alterada com sucesso!");
            return result.data;
        } else {
            console.error("Erro ao alterar tarefa:", result.error);
            return null;
        }
    } catch (error) {
        console.error("Erro ao alterar tarefa:", error);
    }
}

const toggleForms = () => {
    editTodo.classList.toggle("hide");
    addTodo.classList.toggle("hide");
};

const showDashboard = () => {
    if (!editTodo.classList.contains("hide")) editTodo.classList.add("hide");
    if (!addTodo.classList.contains("hide")) addTodo.classList.add("hide");
    dashboard.classList.remove("hide");

    dashboardBtn.innerText = "Voltar";
};

const hideDashboard = () => {
    addTodo.classList.remove("hide");
    dashboard.classList.add("hide");

    dashboardBtn.innerText = "Ver dashboard";
};

const updateTodo = (idTodo, text, priority) => {
    const todos = document.querySelectorAll(".todo");
    todos.forEach((todo) => {
        if (todo.dataset.id === idTodo) {
            let todoTitle = todo.querySelector("abbr");
            todoTitle.innerText = text;
            if (priority == "low") {
                if (!todo.classList.contains("low")) {
                    todo.classList.add("low");
                    todoTitle.title = "Prioridade baixa";
                    if (todo.classList.contains("medium")) todo.classList.remove("medium");
                    if (todo.classList.contains("high")) todo.classList.remove("high");
                }
            }
            if (priority == "medium") {
                if (!todo.classList.contains("medium")) {
                    todo.classList.add("medium");
                    todoTitle.title = "Prioridade média";
                    if (todo.classList.contains("low")) todo.classList.remove("low");
                    if (todo.classList.contains("high")) todo.classList.remove("high");
                }
            }
            if (priority == "high") {
                if (!todo.classList.contains("high")) {
                    todo.classList.add("high");
                    todoTitle.title = "Prioridade alta";
                    if (todo.classList.contains("low")) todo.classList.remove("low");
                    if (todo.classList.contains("medium")) todo.classList.remove("medium");
                }
            }
        }
    });
};

const getSearchTodos = (search) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("abbr").innerText.toLowerCase();

        const normalizedSearch = search.toLowerCase();

        todo.style.display = "flex";

        if (!todoTitle.includes(normalizedSearch)) todo.style.display = "none";
    });
};

const filterTodosByStatus = (statusValue) => {
    const todos = document.querySelectorAll(".todo");

    switch (statusValue) {
        case "all":
            todos.forEach((todo) => (todo.style.display = "flex"));
            break;
        case "done":
            todos.forEach((todo) => {
                todo.classList.contains("done") ? (todo.style.display = "flex") : (todo.style.display = "none");
            });
            break;
        case "todo":
            todos.forEach((todo) => {
                !todo.classList.contains("done") ? (todo.style.display = "flex") : (todo.style.display = "none");
            });
            break;
        default:
            break;
    }
};

const filterTodosByPriority = (priorityValue) => {
    const todos = document.querySelectorAll(".todo");

    switch (priorityValue) {
        case "all":
            todos.forEach((todo) => (todo.style.display = "flex"));
            filterTodosByStatus(statusSelect.value);
            break;
        case "low":
            todos.forEach((todo) => {
                if (todo.style.display == "flex") todo.classList.contains("low") ? (todo.style.display = "flex") : (todo.style.display = "none");
            });
            break;
        case "medium":
            todos.forEach((todo) => {
                if (todo.style.display == "flex") todo.classList.contains("medium") ? (todo.style.display = "flex") : (todo.style.display = "none");
            });
            break;
        case "high":
            todos.forEach((todo) => {
                if (todo.style.display == "flex") todo.classList.contains("high") ? (todo.style.display = "flex") : (todo.style.display = "none");
            });
            break;
        default:
            break;
    }
};

async function buscarDados(idCliente) {
    try {
        if (!idCliente) {
            // Redireciona para o login se não houver ID
            window.location.href = "../templates/login.html";
        }
        const response = await fetch(`http://localhost:3000/tasks/dashboards/${idCliente}/`);
        const result = await response.json();
        if (result.status === false) {
            console.error(result.msg);
            return null;
        } else {
            return result.data;
        }
    } catch (error) {
        console.error("Erro ao buscar dados para o dashboard", error);
    }
}

function graficoPizzaTodos(baixa, media, alta) {
    const ctx = document.getElementById("graficoPizza");
    
    if (mychart) {
        mychart.destroy();
    }

    mychart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Baixa", "Média", "Alta"],
            datasets: [
                {
                    label: "Número de tarefas",
                    data: [baixa, media, alta],
                    backgroundColor: ["green", "orange", "red"],
                    hoverOffset: 8,
                },
            ],
        },
    });
}

function graficoPizzaPrioridade(feitos, a_fazer) {
    const ctx = document.getElementById("graficoPizza");
    
    if (mychart) {
        mychart.destroy();
    }

    mychart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Feitos", "A Fazer"],
            datasets: [
                {
                    label: "Número de tarefas",
                    data: [feitos, a_fazer],
                    backgroundColor: ["green", "red"],
                    hoverOffset: 8,
                },
            ],
        },
    });
}

// Eventos
addForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const priority = prioritySelect.value;
    const inputValue = todoInput.value;
    if (inputValue) {
        const novaTarefa = await criarTask(inputValue, priority);
        if (novaTarefa !== null) saveTodo(novaTarefa.data[0].descricao, novaTarefa.data[0].id, novaTarefa.data[0].finalizada ? 1 : 0, priority);
    }
});

document.addEventListener("click", async (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    // o pai será a div todo
    let todoTitle;

    if (parentEl && parentEl.querySelector("abbr")) todoTitle = parentEl.querySelector("abbr").innerText;

    if (targetEl.classList.contains("finish-todo")) {
        const todoId = parentEl.dataset.id;
        const finalizada = !parentEl.classList.contains("done");
        const prioridade = prioritySelect.value;
        const response = await alterarTask(todoId, todoTitle, finalizada, prioridade);
        if (response != null) {
            parentEl.classList.toggle("done");
        } else {
            console.error("Erro ao finalizar tarefa");
        }
    }

    // Remover a tarefa
    if (targetEl.classList.contains("delete-todo")) {
        const todoId = parentEl.dataset.id; // Pegamos o ID da tarefa armazenado no atributo data-id
        console.log("Id: ", todoId);
        await deletarTask(todoId); // Chama a função para remover a tarefa no backend

        parentEl.remove(); // Remove a tarefa do HTML
    }

    if (targetEl.classList.contains("edit-todo")) {
        toggleForms();

        editInput.value = todoTitle;
        const idTodo = parentEl.dataset.id;

        editForm.addEventListener(
            "submit",
            async (e) => {
                e.preventDefault();
                async function logoutUser() {
                    try {
                        localStorage.removeItem('idCliente')
                        console.log('Logged out successfully!');
                        window.location.href = '../templates/login.html';
                    } catch (error) {
                        console.error('Error during logout:', error);
                    }
                }
                
                logoutBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    logoutUser();
                });
                const editInputValue = editInput.value;
                const prioridade = priorityEdit.value;
                console.log("script_prioridade: ", prioridade);
                if (editInputValue) {
                    const data = await alterarTask(idTodo, editInputValue, parentEl.classList.contains("done"), prioridade);

                    if (data !== null) {
                        updateTodo(data[0].id, data[0].descricao, data[0].prioridade);
                    } else {
                        console.error("Erro ao alterar tarefa");
                    }
                }
                toggleForms();
            },
            { once: true }
        );
    }
});

cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();

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

statusSelect.addEventListener("change", (e) => {
    const statusValue = e.target.value;

    filterTodosByStatus(statusValue);
    filterTodosByPriority(priorityFilterSelect.value);
});

priorityFilterSelect.addEventListener("change", (e) => {
    const priorityFilterValue = e.target.value;

    filterTodosByStatus(statusSelect.value);
    filterTodosByPriority(priorityFilterValue);
});

dashboardBtn.addEventListener("click", async () => {
    if (dashboard.classList.contains("hide")) {
        const idCliente = localStorage.getItem("idCliente");
        var data = await buscarDados(idCliente);
        let baixa, media, alta;
        data.forEach((prioridade) => {
            if (prioridade.prioridade == "low") baixa = prioridade.total_tarefas;
            else if (prioridade.prioridade == "medium") media = prioridade.total_tarefas;
            else alta = prioridade.total_tarefas;
        });
        dashboardPrioritySelect.dispatchEvent(new Event("change"));

        showDashboard();
    } else hideDashboard();
});

dashboardPrioritySelect.addEventListener("change", async () => {
    const idCliente = localStorage.getItem("idCliente");
    var data = await buscarDados(idCliente);
    let baixa, baixaFeitas, baixaNaoFeitas, media, mediaFeitas, mediaNaoFeitas, alta, altaFeitas, altaNaoFeitas;
    data.forEach((prioridade) => {
        if (prioridade.prioridade == "low") {
            baixa = prioridade.total_tarefas;
            baixaFeitas = prioridade.feitas;
            baixaNaoFeitas = prioridade.a_fazer;
        } else if (prioridade.prioridade == "medium") {
            media = prioridade.total_tarefas;
            mediaFeitas = prioridade.feitas;
            mediaNaoFeitas = prioridade.a_fazer;
        } else {
            alta = prioridade.total_tarefas;
            altaFeitas = prioridade.feitas;
            altaNaoFeitas = prioridade.a_fazer;
        }
        switch (dashboardPrioritySelect.value) {
            case "all":
                graficoPizzaTodos(baixa, media, alta);
                break;
            case "low":
                graficoPizzaPrioridade(baixaFeitas, baixaNaoFeitas);
                break;
            case "medium":
                graficoPizzaPrioridade(mediaFeitas, mediaNaoFeitas);
                break;
            case "high":
                graficoPizzaPrioridade(altaFeitas, altaNaoFeitas);
                break;
            default:
                break;
        }
    });
});

async function logoutUser() {
    try {
        localStorage.removeItem('idCliente')
        console.log('Logged out successfully!');
        window.location.href = '../templates/login.html';
    } catch (error) {
        console.error('Error during logout:', error);
    }
}

logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    logoutUser();
});

// inicialização
carregarTarefas();
