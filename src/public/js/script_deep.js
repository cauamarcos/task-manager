document.addEventListener('DOMContentLoaded', () => {
    const addForm = document.getElementById('add-form');
    const editForm = document.getElementById('edit-form');
    const searchForm = document.getElementById('search-form');
    const todoList = document.getElementById('todo-list');
    const cancelEditBtn = document.getElementById('cancel-edit-btn');
    const eraseBtn = document.getElementById('erase-btn');
    const filterSelect = document.getElementById('filter-select');

    let editId;

    // Função para carregar as tarefas
    const loadTodos = async () => {
        const response = await fetch('http://localhost:3000/todos');
        const todos = await response.json();
        todoList.innerHTML = '';
        todos.forEach(todo => {
            const todoItem = document.createElement('div');
            todoItem.classList.add('todo-item');
            todoItem.innerHTML = `
                <p>${todo.task}</p>
                <div class="actions">
                    <button onclick="editTodo('${todo.id}', '${todo.task}')"><i class="fa-solid fa-pen"></i></button>
                    <button onclick="deleteTodo('${todo.id}')"><i class="fa-solid fa-trash"></i></button>
                </div>
            `;
            todoList.appendChild(todoItem);
        });
    };

    // Adicionar tarefa
    addForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const task = document.getElementById('todo-input').value;
        await fetch('http://localhost:3000/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ task }),
        });
        loadTodos();
        addForm.reset();
    });

    // Editar tarefa
    const editTodo = async (id, task) => {
        editId = id;
        editForm.classList.remove('hide');
        document.getElementById('edit-input').value = task;
    };

    editForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const task = document.getElementById('edit-input').value;
        await fetch(`http://localhost:3000/todos/${editId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ task }),
        });
        loadTodos();
        editForm.classList.add('hide');
    });

    cancelEditBtn.addEventListener('click', () => {
        editForm.classList.add('hide');
    });

    // Deletar tarefa
    const deleteTodo = async (id) => {
        await fetch(`http://localhost:3000/todos/${id}`, {
            method: 'DELETE',
        });
        loadTodos();
    };

    // Pesquisar e filtrar tarefas
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchTerm = document.getElementById('search-input').value;
        const filter = filterSelect.value;
        // Implemente a lógica de pesquisa e filtro aqui
    });

    eraseBtn.addEventListener('click', () => {
        document.getElementById('search-input').value = '';
        loadTodos();
    });

    loadTodos();
});