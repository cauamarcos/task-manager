const title = document.querySelector("h1");

const titleTexts = ["Task Manager", "Bem-vindo", "Olá"];
var index = 1;

setInterval(() => {
    title.innerText = titleTexts[index];

    if (index == 2) index = 0;
    else index += 1;
}, 3000);
