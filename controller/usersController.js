import { logarUser, cadastrarUser } from "../models/usersModel.js";

async function logarUser(req, res) {
    var email = req.body.email;
    var senha = req.body.senha;

    const response = await logarUser(email, senha);

    res.send(JSON.stringify(response));
}

async function cadastrarUser(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var senha = req.body.senha;

    const response = await cadastrarUser(name, email, senha);

    res.send(JSON.stringify(response));
}

export default { logarUser, cadastrarUser };