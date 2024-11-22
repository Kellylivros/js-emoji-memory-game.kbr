const emojis = [
    "cachorro.jpg",
    "cachorro.jpg",
    "gato.jpg",
    "gato.jpg",
    "leao.jpg",
    "leao.jpg",
    "crianca.jpg",
    "crianca.jpg",
    "gorila.jpg",
    "gorila.jpg",
    "mar.jpg",
    "mar.jpg",
    "natureza.jpg",
    "natureza.jpg",
    "urso.jpg",
    "urso.jpg"
];

let openCards = [];

// Embaralha as imagens
let shuffledEmojis = emojis.sort(() => Math.random() - 0.5);

// Adiciona as cartas no tabuleiro
for (let i = 0; i < shuffledEmojis.length; i++) {
    let box = document.createElement("div");
    box.className = "item";
    box.dataset.emoji = shuffledEmojis[i];

    // Adiciona uma imagem escondida
    let img = document.createElement("img");
    img.src = `./src/images/${shuffledEmojis[i]}`;
    img.alt = shuffledEmojis[i].split(".")[0]; // Ex: cachorro, gato
    img.className = "hidden"; // Inicialmente escondido
    box.appendChild(img);

    // Adiciona o evento de clique
    box.onclick = handleClick;
    document.querySelector(".game").appendChild(box);
}

function handleClick() {
    if (openCards.length < 2 && !this.classList.contains("boxOpen")) {
        this.classList.add("boxOpen");

        // Mostra a imagem
        const img = this.querySelector("img");
        img.classList.remove("hidden");

        openCards.push(this);

        if (openCards.length === 2) {
            setTimeout(checkMatch, 150);
        }
    }
}

function checkMatch() {
    if (openCards[0].dataset.emoji === openCards[1].dataset.emoji) {
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
    } else {
        openCards.forEach(card => {
            card.classList.remove("boxOpen");
            const img = card.querySelector("img");
            img.classList.add("hidden"); // Esconde novamente
        });
    }

    openCards = [];

    // Verifica se todas as cartas foram encontradas
    if (document.querySelectorAll(".boxMatch").length === emojis.length) {
        setTimeout(() => alert("Você venceu!"), 300);
    }
}