import usersModel from "../models/tasksModel.js";

async function getTasksCliente(req, res){
    var user_id = req.params.idUser;

    const response = await usersModel.getTasksCliente(user_id);

    res.send(JSON.stringify(response));
}

async function criaTask(req, res){
    var user_id = req.params.idUser;
    var descricao = req.body.descricao;

    const response = await usersModel.criaTask(user_id, descricao);

    res.send(JSON.stringify(response));
}

async function alteraTask(req, res){
    var task_id = req.params.idTask;
    var descricao = req.body.descricao;
    var finalizada = req.body.finalizada;

    const response = await usersModel.alteraTask(task_id, descricao, finalizada);

    res.send(JSON.stringify(response));
}

async function excluiTasks(req, res){
    var task_id = req.params.idTask;

    const response = await usersModel.excluiTasks(task_id);

    res.send(JSON.stringify(response));
}

async function filtraTarefas(req, res) {
    var user_id = req.params.idUser;
    var finalizada = req.body.finalizada;

    const response = await usersModel.filtraTarefas(user_id, finalizada);

    res.send(JSON.stringify(response));
}

export default {getTasksCliente, criaTask, alteraTask, excluiTasks, filtraTarefas};