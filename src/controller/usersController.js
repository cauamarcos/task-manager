import { logarUser as logarUserModel, cadastrarUser as cadastrarUserModel} from "../models/usersModel.js";

async function logarUser(req, res) {
    var email = req.body.email;
    var senha = req.body.senha;

    const response = await logarUserModel(email, senha);

    res.send(JSON.stringify(response));
}

async function cadastrarUser(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var senha = req.body.senha;

    const response = await cadastrarUserModel(name, email, senha);

    res.send(JSON.stringify(response));
}

export { logarUser, cadastrarUser };