import usersModel from "../models/tasksModel.js";

async function listarTasks(req, res) {
    var user_id = req.params.idUser;

    const response = await usersModel.listarTasks(user_id);

    res.send(JSON.stringify(response));
}

async function criarTask(req, res) {
    var user_id = req.params.idUser;
    var descricao = req.body.descricao;
    var prioridade = req.body.prioridade;
    const response = await usersModel.criarTask(user_id, descricao, prioridade);

    res.send(JSON.stringify(response));
}

async function alterarTask(req, res) {
    var task_id = req.params.idTask;
    var descricao = req.body.descricao;
    var finalizada = req.body.finalizada;
    var prioridade = req.body.prioridade;
    const timestamp = finalizada ? new Date().toISOString() : null;
    const response = await usersModel.alterarTask(task_id, descricao, finalizada, timestamp, prioridade);

    res.send(JSON.stringify(response));
}

async function deletarTask(req, res) {
    var task_id = req.params.idTask;

    const response = await usersModel.deletarTask(task_id);

    res.send(JSON.stringify(response));
}

async function buscarDados(req, res) {
    var user_id = req.params.idUser;

    const response = await usersModel.buscarDados(user_id);
    console.log("Controleer: ", response);
    res.send(JSON.stringify(response));
}

export { listarTasks, criarTask, alterarTask, deletarTask, buscarDados };