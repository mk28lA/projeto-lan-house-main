// ========== LISTA DE JOGOS ==========
const jogos = [
    { nome: "007: Nightfire", img: "imgs/Play2/007N.png" },
    { nome: "007: Everything or Nothing", img: "imgs/Play2/007EON.png" },
    { nome: "Ace Combat 4: Shattered Skies", img: "imgs/Play2/ACIV.png" },
    { nome: "Ace Combat 5: The Unsung War", img: "imgs/Play2/ACV.png" },
    { nome: "Black", img: "imgs/Play2/BLACK.png" },
    { nome: "Bully", img: "imgs/Play2/BULLY.png" },
    { nome: "Burnout 3: Takedown", img: "imgs/Play2/BIIIT.png" },
    { nome: "Crash Bandicoot: The Wrath of Cortex", img: "imgs/Play2/CBTWOC.png" },
    { nome: "Crash Nitro Kart", img: "imgs/Play2/CNK.png" },
    { nome: "Crash Tag Team Racing", img: "imgs/Play2/CTTR.png" },
    { nome: "Dark Cloud 2", img: "imgs/Play2/DCII.png" },
    { nome: "Devil May Cry", img: "imgs/Play2/TMC.png" },   
    { nome: "Devil May Cry 3: Dante's Awakening", img: "imgs/Play2/DMCIIISE.png" },
    { nome: "Dragon Ball Z: Budokai Tenkaichi 3", img: "imgs/Play2/DBZBTIII.png" },
    { nome: "Dragon Quest VIII: Journey of the Cursed King", img: "imgs/Play2/DQVIII.png" },
    { nome: "Final Fantasy X", img: "imgs/Play2/FFX.png" },
    { nome: "Final Fantasy XII", img: "imgs/Play2/FFXII.png" },
    { nome: "God of War", img: "imgs/Play2/GOW.png" },
    { nome: "God of War II", img: "imgs/Play2/GOWII.png" },
    { nome: "Gran Turismo 3: A-Spec", img: "imgs/Play2/GTIIIAS.png" },
    { nome: "Gran Turismo 4", img: "imgs/Play2/GTIV.png" },
    { nome: "Gta III", img: "imgs/Play2/GTAIII.png" },
    { nome: "Gta: San Andreas", img: "imgs/Play2/GTASA.png" },
    { nome: "Gta: Vice City", img: "imgs/Play2/GTAVC.png" },
    { nome: "Guitar Hero II ", img: "imgs/Play2/GHII.png" },
    { nome: "Guitar Hero III: Legends of Rock", img: "imgs/Play2/GHIIILOR.png" },
    { nome: "Ico", img: "imgs/Play2/ICO.png" },
    { nome: "Jak and Daxter: The Precursor Legacy", img: "imgs/Play2/JAD.png" },
    { nome: "Kingdom Hearts", img: "imgs/Play2/KH.png" },
    { nome: "Kingdom Hearts II", img: "imgs/Play2/KHII.png" },  
    { nome: "Madden NFL 2004", img: "imgs/Play2/M2004.png" },
    { nome: "Madden NFL 2005", img: "imgs/Play2/M2005.png" },
    { nome: "Medal of Honor: Frontline", img: "imgs/Play2/MOHF.png" },
    { nome: "Metal Gear Solid 2: Sons of Liberty", img: "imgs/Play2/MGSIISOL.png" },
    { nome: "Metal Gear Solid 3: Snake Eater", img: "imgs/Play2/MGSIIISE.png" },
    { nome: "Midnight Club 3: DUB Edition", img: "imgs/Play2/MNC3DE.png" },
    { nome: "Need for Speed: Underground", img: "imgs/Play2/NFSU.png" },
    { nome: "Need for Speed: Underground II", img: "imgs/Play2/NFSUII.png" },
    { nome: "Need for Speed: Most Wanted", img: "imgs/Play2/NFSMW.png" },
    { nome: "Okami", img: "imgs/Play2/OKAMI.png" },
    { nome: "Ratchet & Clank: Up Your Arsenal", img: "imgs/Play2/RECUYA.png" },
    { nome: "Resident Evil 4", img: "imgs/Play2/REIV.png" },
    { nome: "Shadow of the Colossus", img: "imgs/Play2/SOTC.png" },
    { nome: "Shilent Hill 2", img: "imgs/Play2/SHII.png" },
    { nome: "Sly Cooper and the Thievius Raccoonus", img: "imgs/Play2/SCATTR.png" },
    { nome: "SoulCalibur II", img: "imgs/Play2/SCII.png" },
    { nome: "SoulCalibur III", img: "imgs/Play2/SCIII.png" },
    { nome: "Star Wars: Battlefront II", img: "imgs/Play2/SWBII.png" },
    { nome: "SSX 3", img: "imgs/Play2/SSXIII.png" },
    { nome: "Tekken 5", img: "imgs/Play2/TKKV.png" },
    { nome: "The Simpsons: Hit & Run", img: "imgs/Play2/SIMPSONS.png" },
    { nome: "Tony Hawk's Underground", img: "imgs/Play2/TWU.png" },
    { nome: "Twisted Metal: Black", img: "imgs/Play2/TMB.png" },
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



