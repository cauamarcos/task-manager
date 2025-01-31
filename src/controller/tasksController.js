import usersModel from "../models/tasksModel.js";

async function listarTasks(req, res){
    var user_id = req.params.idUser;

    const response = await usersModel.listarTasks(user_id);

    res.send(JSON.stringify(response));
}

async function criarTask(req, res){
    var user_id = req.params.idUser;
    var descricao = req.body.descricao;

    const response = await usersModel.criarTask(user_id, descricao);

    res.send(JSON.stringify(response));
}

async function alterarTask(req, res){
    var task_id = req.params.idTask;
    var descricao = req.body.descricao;
    var finalizada = req.body.finalizada;

    const response = await usersModel.alterarTask(task_id, descricao, finalizada);

    res.send(JSON.stringify(response));
}

async function deletarTask(req, res){
    var task_id = req.params.idTask;

    const response = await usersModel.deletarTask(task_id);

    res.send(JSON.stringify(response));
}

async function filtrarTasks(req, res) {
    var user_id = req.params.idUser;
    var finalizada = req.body.finalizada;

    const response = await usersModel.filtrarTasks(user_id, finalizada);

    res.send(JSON.stringify(response));
}

export {listarTasks, criarTask, alterarTask, deletarTask, filtrarTasks};