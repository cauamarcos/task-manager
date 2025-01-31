import conectarAoBanco from "../config/dbConfig";

const supabase = await conectarAoBanco();

// Funçao para logar o user
async function logarUser(email, senha) {
    try {
        const { data, error } = await supabase
            .from("users")
            .select("id") // Seleciona apenas o necessário para melhorar a performance
            .eq("email", email)
            .eq("senha", senha);

        if (error) {
            throw error;
        }

        if (data.length === 0) {
            return {
                status: false,
                msg: "Email ou senha incorretos"
            };
        }

        return {
            status: true,
            msg: "Usuario autenticado"
        };
    } catch (error) {
        console.log(error);
        return {
            status: false,
            msg: "Erro ao tentar fazer login"
        };
    }
}

// Funccao para cadastrar o user
async function cadastrarUser(name, email, senha) {
    var response = null;
    try {
        const { data, error } = await supabase
            .from("users")
            .insert([{ name: name, email: email, senha: senha }])
            .select();

        if (error) {
            throw error;
        }

        if (data.length === 0) {
            response = {
                status: false,
                msg: "Usuario nao cadastrado"
            };
        } else {
            response = {
                status: true,
                msg: "Usuario cadastrado"
            };
        }
        return response;
    } catch (error) {
        if (error.message.includes("duplicate key value")) {
            return {
                status: false,
                msg: "E-mail ja cadastrado"
            };
        }

        console.log(error);
        return {
            status: false,
            msg: "Erro ao cadastrar usuario"
        };
    }
}

export default { logarUser, cadastrarUser };