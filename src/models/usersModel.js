import conectarAoBanco from "../config/dbConfig.js";

const supabase = await conectarAoBanco();

// Funçao para logar o user
async function logarUser(email, senha) {
    console.log(email)
    console.log(senha)
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
                msg: "Email ou senha incorretos",
                data: null
            };
        }
        return {
            status: true,
            msg: "Usuario autenticado",
            data: data
        };
    } catch (error) {
        console.log(error);
        return {
            status: false,
            msg: "Erro ao tentar fazer login",
            data: null
        };
    }
}

// Funccao para cadastrar o user
async function cadastrarUser(nome, email, senha) {
    try {
        const { data, error } = await supabase
            .from("users")
            .insert([{ nome: nome, email: email, senha: senha }])
            .select();

        if (error) {
            throw error;
        }

        if (data.length === 0) {
            return {
                status: false,
                msg: "Usuario nao cadastrado"
            };
        } else {
            return {
                status: true,
                msg: "Usuario cadastrado"
            };
        }
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

export { logarUser, cadastrarUser };