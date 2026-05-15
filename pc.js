// ========== LISTA DE JOGOS ==========
const jogos = [
{ nome: "Baldur's Gate 3", img: "imgs/PC/bg3.png" },
{ nome: "Cyberpunk 2077", img: "imgs/PC/cp.png" },
{ nome: "Dark Souls III", img: "imgs/PC/ds3.png" },
{ nome: "DOOM (2016)", img: "imgs/PC/Domm .png" },
{ nome: "Elden Ring", img: "imgs/PC/er.jpg" },
{ nome: "Fallout 4", img: "imgs/PC/Fallout4.png" },
{ nome: "Genshin impact", img: "imgs/PC/genshinimpact.png" },
{ nome: "God of War (2018)", img: "imgs/PC/god18.png" },
{ nome: "Grand Theft Auto V", img: "imgs/PC/GTAV.png" },
{ nome: "Hollow Knight", img: "imgs/PC/hk.png" },
{ nome: "Horizon Zero Dawn", img: "imgs/PC/sr.png" },
{ nome: "Minecraft", img: "imgs/PC/mine.png" },
{ nome: "Red Dead Redemption 2", img: "imgs/PC/rdrii.png" },
{ nome: "Resident Evil Village", img: "imgs/PC/rev.png" },
{ nome: "Stardew Valley", img: "imgs/PC/stardewvalley.png" },
{ nome: "Spider-man remaster", img: "imgs/PC/msmr.png"},
{ nome: "Subnautica", img: "imgs/pc/subnautica.png" },
{ nome: "The Elder Scrolls V: Skyrim", img: "imgs/PC/cs.png" },
{ nome: "The Sims 4", img: "imgs/PC/Sims4.png" },
{ nome: "The Witcher 3: Wild Hunt", img: "imgs/PC/twwv4.png" },
{ nome: "XCOM 2", img: "imgs/PC/xcom2.png" }

];

// ========== PAGINAÇÃO ==========
const jogosPorPagina = 9;
let paginaAtual = 1;
const listaJogosDiv = document.getElementById("listaJogos");
const paginacaoDiv = document.getElementById("paginacao");

// ========== FUNÇÃO PARA RENDER JOGOS ==========
function renderJogos() {
    const pesquisaValor = document.getElementById("pesquisa").value.toLowerCase();
    const jogosFiltrados = jogos.filter(j => j.nome.toLowerCase().includes(pesquisaValor));

    const totalPaginas = Math.ceil(jogosFiltrados.length / jogosPorPagina);
    if (paginaAtual > totalPaginas) paginaAtual = totalPaginas || 1;

    const start = (paginaAtual - 1) * jogosPorPagina;
    const end = start + jogosPorPagina;
    const jogosPagina = jogosFiltrados.slice(start, end);

    // Renderizar os cards
    listaJogosDiv.innerHTML = "";
    jogosPagina.forEach(j => {
        listaJogosDiv.innerHTML += `
        <div class="card">
            <img src="${j.img}" alt="${j.nome}">
            <h3>${j.nome}</h3>
        </div>`;
    });

    // Renderizar a paginação
    paginacaoDiv.innerHTML = "";
    for (let i = 1; i <= totalPaginas; i++) {
        paginacaoDiv.innerHTML += `<button class="${i===paginaAtual?'active':''}" onclick="mudarPagina(${i})">${i}</button>`;
    }
}

// ========== FUNÇÃO PARA MUDAR PAGINA ==========
function mudarPagina(p) {
    paginaAtual = p;
    renderJogos();
}

// ========== PESQUISA ==========
document.getElementById("pesquisa").addEventListener("keyup", () => {
    paginaAtual = 1;
    renderJogos();
});

// ====== RENDER INICIAL ======
renderJogos();

