// ========== LISTA DE JOGOS ==========
const jogos = [

   { nome: "007 First Light - Specialist Edition", img: "imgs/Play5/007FLSE.png" },
{ nome: "Astro Bot", img: "imgs/Play5/AB.png" },
{ nome: "Call of Duty: Black Ops 6", img: "imgs/Play5/CODBO6.png" },
{ nome: "Call of Duty: Modern Warfare II", img: "imgs/Play5/CODMW2.png" },
{ nome: "Call of Duty: Modern Warfare III", img: "imgs/Play5/MW3.png" },
{ nome: "Clair Obscur: Expedition 33", img: "imgs/Play5/COE33.png" },
{ nome: "Demon's Souls", img: "imgs/Play5/DSR.png" },
{ nome: "Death Stranding 2: On the Beach", img: "imgs/Play5/DS2.png" },
{ nome: "EA Sports FC 25", img: "imgs/Play5/EAFC25.png" },
{ nome: "EA Sports FC 26", img: "imgs/Play5/EAFC26.png" },
{ nome: "Elden Ring", img: "imgs/Play5/ER.png" },
{ nome: "Final Fantasy VII Rebirth", img: "imgs/Play5/FFVIIR.png" },
{ nome: "Final Fantasy XVI", img: "imgs/Play5/FFXVI.png" },
{ nome: "Fortnite", img: "imgs/Play5/FORTNITE.png" },
{ nome: "Ghost of Tsushima Director's Cut", img: "imgs/Play5/GOTDC.png" },
{ nome: "Ghost of Yōtei", img: "imgs/Play5/GOY.png" },
{ nome: "God of War Ragnarök", img: "imgs/Play5/GOWR.png" },
{ nome: "Grand Theft Auto V (GTA 5)", img: "imgs/Play5/GTA5.png" },
{ nome: "Gran Turismo 7", img: "imgs/Play5/GT7.png" },
{ nome: "Helldivers 2", img: "imgs/Play5/HELLDIVERS2.png" },
{ nome: "Hogwarts Legacy", img: "imgs/Play5/HOGWARTSLEGACY.png" },
{ nome: "Horizon Forbidden West", img: "imgs/Play5/HFW.png" },
{ nome: "Kena: Bridge of Spirits", img: "imgs/Play5/KBOS.png" },
{ nome: "Marvel's Spider-Man 2", img: "imgs/Play5/SPIDER2.png" },
{ nome: "Marvel's Spider-Man: Miles Morales", img: "imgs/Play5/MORALESSPIDER.png" },
{ nome: "Metal Gear Solid Δ: Snake Eater", img: "imgs/Play5/MGSSE.png" },
{ nome: "Minecraft", img: "imgs/Play5/MINECRAFT.png" },
{ nome: "NBA 2K25", img: "imgs/Play5/NBA2k25.png" },
{ nome: "NBA 2K26", img: "imgs/Play5/NBA 2K26.png" },
{ nome: "Ratchet & Clank: Rift Apart", img: "imgs/Play5/RECRA.png" },
{ nome: "Resident Evil 4 (Remake)", img: "imgs/Play5/RE4R.png" },
{ nome: "Resident Evil Requiem", img: "imgs/Play5/RERE.png" },
{ nome: "Stellar Blade", img: "imgs/Play5/SB.png" },
{ nome: "The Last of Us Part I", img: "imgs/Play5/TLOUPT1.png" },
{ nome: "The Last of Us Part II Remastered", img: "imgs/Play5/TLOUPT2.png" },
{ nome: "Until Dawn", img: "imgs/Play5/UD.png" },

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

