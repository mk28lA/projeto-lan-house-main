// ========== LISTA DE JOGOS ==========
const jogos = [
{ nome: "Assassin's Creed: Bloodlines", img: "imgs/Psp/ACB.png" },
{ nome: "Burnout Legends", img: "imgs/Psp/BURNOUT.png" },
{ nome: "Crisis Core: Final Fantasy VII", img: "imgs/Psp/CCFFVII.png" },
{ nome: "Dante's Inferno", img: "imgs/Psp/DI.png" },
{ nome: "Daxter", img: "imgs/Psp/DAXTER.png" },
{ nome: "Dissidia Final Fantasy", img: "imgs/Psp/DFF.png" },
{ nome: "Dragon Ball Z: Shin Budokai", img: "imgs/Psp/DBZSB.png" },
{ nome: "FIFA 12", img: "imgs/Psp/FIFA12.png" },
{ nome: "Final Fantasy Tactics: The War of the Lions", img: "imgs/Psp/FFTTWOTL.png" },
{ nome: "God of War: Chains of Olympus", img: "imgs/Psp/GOWCOO.png" },
{ nome: "God of War: Ghost of Sparta", img: "imgs/Psp/GOWGOS.png" },
{ nome: "Gran Turismo", img: "imgs/Psp/GT.png" },
{ nome: "Grand Theft Auto: Liberty City Stories", img: "imgs/Psp/GTALCS.png" },
{ nome: "Grand Theft Auto: Vice City Stories", img: "imgs/Psp/GTAVCS.png" },
{ nome: "Kingdom Hearts: Birth by Sleep", img: "imgs/Psp/KHBBS.png" },
{ nome: "LittleBigPlanet", img: "imgs/Psp/LBP.png" },
{ nome: "Medal of Honor: Heroes", img: "imgs/Psp/MOHH.png" },
{ nome: "Metal Gear Solid: Peace Walker", img: "imgs/Psp/MGSPW.png" },
{ nome: "Midnight Club 3: DUB Edition", img: "imgs/Psp/MC3DUBE.png" },
{ nome: "Monster Hunter Freedom 2", img: "imgs/Psp/MH2.png" },
{ nome: "Monster Hunter Freedom Unite", img: "imgs/Psp/MHF2.png" },
{ nome: "Monster Hunter Portable 3rd", img: "imgs/Psp/MH.png" },
{ nome: "Need for Speed Carbon: Own the City", img: "imgs/Psp/NFSCODC.png" },
{ nome: "Need for Speed: Most Wanted 5-1-0", img: "imgs/Psp/NFSMW.png" },
{ nome: "Persona 3 Portable", img: "imgs/Psp/PERSONA3.png" },
{ nome: "Ratchet & Clank: Size Matters", img: "imgs/Psp/R&CSM.png" },
{ nome: "Silent Hill: Origins", img: "imgs/Psp/SH.png" },
{ nome: "Star Wars: Battlefront II", img: "imgs/Psp/SWBII.png" },
{ nome: "Tekken: Dark Resurrection", img: "imgs/Psp/TDR.png" },
{ nome: "The 3rd Birthday", img: "imgs/Psp/T3rdB.png" },
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

