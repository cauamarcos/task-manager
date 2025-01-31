const form = document.querySelector("form");
const title = document.querySelector("h1");
const cancelBtn = document.querySelector("#cancel-btn");

const titleTexts = ["Task Manager", "Bem-vindo", "Olá"];
var index = 1;

setInterval(() => {
    title.innerText = titleTexts[index];

    if (index == 2) index = 0;
    else index += 1;
}, 3000);

cancelBtn.addEventListener("click", () => {
    // retorna para a página de login
    window.location.href = "../templates/login.html";
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.name.valueOf.trim();
    const email = form.email.valueOf.trim();
    const password = form.password.valueOf.trim();

    if (!email || !password) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/users/cadastro/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: name, email: email, senha: password })
        });

        if (!response.ok) {
            throw new Error("Erro ao cadastrar. Tente novamente.");
        }

        alert("Cadastro realizado com sucesso!");
        window.location.href = "../templates/login.html"; // Redireciona para a página de login
    } catch (error) {
        alert(error.message);
    }
});