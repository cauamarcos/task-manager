import conectarAoBanco from "../config/dbConfig.js";

const conexao = await conectarAoBanco();


// Criar uma nova tarefa
export const createTodo = async (req, res) => {
    const { task, done } = req.body;

    const { data, error } = await supabase
        .from('todos')
        .insert([{ task, done }])
        .select();

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.status(201).json(data);
};

// Listar todas as tarefas
export const getAllTodos = async (req, res) => {
    const { data, error } = await supabase
        .from('todos')
        .select('*');

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.status(200).json(data);
};

// Atualizar uma tarefa
export const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { task, done } = req.body;

    const { data, error } = await supabase
        .from('todos')
        .update({ task, done })
        .eq('id', id)
        .select();

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.status(200).json(data);
};

// Deletar uma tarefa
export const deleteTodo = async (req, res) => {
    const { id } = req.params;

    const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id);

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.status(204).send();
};

// Filtrar tarefas por status (feito ou a fazer)
export const filterTodos = async (req, res) => {
    const { status } = req.params;

    let query = supabase
        .from('todos')
        .select('*');

    if (status === 'done') {
        query = query.eq('done', true);
    } else if (status === 'todo') {
        query = query.eq('done', false);
    }

    const { data, error } = await query;

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.status(200).json(data);
};