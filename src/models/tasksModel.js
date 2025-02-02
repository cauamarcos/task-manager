import conectarAoBanco from "../config/dbConfig.js";

const supabase = await conectarAoBanco();

// Lista todas as tasks de um user
async function listarTasks(idCliente) {
    try {
        const { data, error } = await supabase.from('task').select('*').eq('users_id', idCliente);
        if (error) {
            return { status: false, msg: `Erro ao listar tarefas: ${error.message}`, data: null };
        }

        return { status: true, msg: "Tarefas listadas com sucesso.", data: data };
    } catch (error) {
        return { status: false, msg: `Erro ao listar tarefas: ${error.message}`, data: null };
    }
}

// Cria uma task para um user
async function criarTask(idCliente, descricao, prioridade) {
    try {
        const { data, error } = await supabase
            .from('task')
            .insert([{
                descricao: descricao,
                users_id: idCliente,
                finalizada: false,
                prioridade: prioridade
            }]).select();

        if (error) {
            return { status: false, msg: `Erro ao criar tarefa: ${error.message}`, data: null };
        }

        return { status: true, msg: "Tarefa criada com sucesso.", data: data };
    } catch (error) {
        return { status: false, msg: `Erro ao criar tarefa: ${error.message}`, data: null };
    }
}

// Altera uma task com base no id
async function alterarTask(idTask, desc, finalizado, timestamp, prioridade) {
    try {
        const { data, error } = await supabase.from('task').update({ descricao: desc, finalizada: finalizado, ended_at: timestamp, prioridade: prioridade }).eq('id', idTask).select('*');
        if (error) {
            return { status: false, msg: `Erro ao alterar tarefa: ${error.message}`, data: null };
        }
        return { status: true, msg: "Tarefa alterada com sucesso.", data: data };
    } catch (error) {
        return { status: false, msg: `Erro ao alterar tarefa: ${error.message}`, data: null };
    }
}

// Deleta uma task com base no id
async function deletarTask(idTask) {
    try {
        const { data, error } = await supabase.from('task').delete().eq('id', idTask);

        if (error) {
            return { status: false, msg: `Erro ao deletar tarefa: ${error.message}`, data: null };
        }

        return { status: true, msg: "Tarefa deletada com sucesso.", data: data };
    } catch (error) {
        return { status: false, msg: `Erro ao deletar tarefa: ${error.message}`, data: null };
    }
}

// Filtra as tasks de um user de acordo com o status de finalizada
async function buscarDados(idCliente) {
    try {
        console.log(idCliente)
        const { data, error } = await supabase.rpc("dashboard_query", { user_id: idCliente });  

        if (error) {
            return { status: false, msg: `Erro ao buscar dados para o dashboard: ${error.message}`, data: null };
        }
        return { status: true, msg: "Dados buscados com sucesso", data: data };
    } catch (error) {
        return { status: false, msg: `Erro ao conexao com o supabase: ${error.message}`, data: null };
    }
}

export default { listarTasks, criarTask, alterarTask, deletarTask, buscarDados };
