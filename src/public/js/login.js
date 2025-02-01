const title = document.querySelector("h1");
const form = document.querySelector("form");
const registerBtn = document.querySelector("#register-btn");

const titleTexts = ["Task Manager", "Bem-vindo", "Olá"];
var index = 1;

setInterval(() => {
    title.innerText = titleTexts[index];

    if (index == 2) index = 0;
    else index += 1;
}, 3000);

// login.js
registerBtn.addEventListener("click", () => {
    // Redireciona para a página de cadastro
    window.location.href = "../templates/cadastro.html";
});


form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value.trim();

    if (!email || !password) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email, senha: password })
        });
        const data = await response.json();
        if (!data.status) {
            throw new Error("Erro! E-mail ou senha invalidos");
        }
        else {
            localStorage.setItem("idCliente", data.data[0].id);
            window.location.href = "../templates/index.html"; // Redireciona após o login
        }
    } catch (error) {
        alert(error.message);
    }
});
