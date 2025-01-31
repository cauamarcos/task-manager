import conectarAoBanco from "../config/dbConfig.js";

const supabase = await conectarAoBanco();

//Lista todas as taks de um user
async function listarTasks(idCliente) {
    try {
        const { data, error } = await supabase.from('tasks').select('*').eq('users_id', idCliente)

        if (error) {
            throw error;
        }
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
        throw error
    }
}

//Cria uma task para um user
async function criarTask(idCliente, descricao) {
    try {
        const { data, error } = await supabase.from('tasks').insert([{ descricao: descricao, users_id: idCliente, finalizada: false }]).select()

        if (error) {
            throw error;
        }
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
        throw error
    }
}

//Altera uma task com base no id
async function alterarTask(idTask, desc, finalizado) {
    try {
        const { data, error } = await supabase.from(tasks).update({ descricao: desc, finalizada: finalizado }).eq('id', idTask).select();

        if (error) {
            throw error;
        }
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
        throw error
    }
}

//Deleta uma task com base no id
async function deletarTask(idTask) {
    try {
        const { data, error } = await supabase.from(tasks).delete().eq('id', idTask)

        if (error) {
            throw error;
        }
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
        throw error
    }
}

//Filtrar as taks de um user de acordo com o status de finalizada
async function filtrarTasks(idCliente, finalizado) {
    try {
        const { data, error } = await supabase.from(tasks).select('*').eq('users_id', idCliente).eq('finalizada', finalizado)

        if (error) {
            throw error;
        }
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
        throw error
    }
}

export default { listarTasks, criarTask, alterarTask, deletarTask, filtrarTasks }