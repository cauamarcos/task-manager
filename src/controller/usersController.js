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

async function logoutUser (req, res) {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;

        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ status: false, message: 'Failed to destroy session' });
            }
            res.status(200).json({ status: true, message: 'Logged out successfully' });
        });
    } catch (error) {
        console.error('Error during logout:', error.message);
        res.status(500).json({ status: false, message: 'Error during logout' });
    }
};

export { logarUser, cadastrarUser, logoutUser };