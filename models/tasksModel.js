import conectarAoBanco from "../config/dbConfig.js";

const supabase = await conectarAoBanco();

async function getTasksCliente(idCliente){
    try{
        const { data, error } = await supabase.from('tasks').select('*').eq('users_id', idCliente)
    
        if (error) {
            throw error;
        }

        console.log(data)
        return data;
    }catch(error){
        console.log(error)
        throw error
    }
}

async function criaTask(idCliente, descricao){
    try{
        const { data, error } = await supabase.from('tasks').insert([{ descricao: descricao, users_id: idCliente, finalizada: false}]).select()
        
        if (error) {
            throw error;
        }

        console.log(data)
        return data;
    }catch(error){
        console.log(error)
        throw error
    }
}

async function alteraTask(idTask, desc, finalizado){
    try{
        const {data, error} = await supabase.from(tasks).update({descricao: desc, finalizada: finalizado}).eq('id', idTask).select();

        if (error) {
            throw error;
        }

        console.log(data)
        return data;
    }catch(error){
        console.log(error)
        throw error
    }
}

async function excluiTasks(idTask){
    try{
        const {data, error} = await supabase.from(tasks).delete().eq('id', idTask)
        
        if (error) {
            throw error;
        }

        console.log(data)
        return data;
    }catch(error){
        console.log(error)
        throw error
    }
}

async function filtraTarefas(idCliente, finalizado) {
    try{
        const {data, error} = await supabase.from(tasks).select('*').eq('users_id', idCliente).eq('finalizada', finalizado)
        
        if (error) {
            throw error;
        }

        console.log(data)
        return data;
    }catch(error){
        console.log(error)
        throw error
    }
}

export default {getTasksCliente, criaTask, alteraTask, excluiTasks, filtraTarefas}