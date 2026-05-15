// ========== LISTA DE JOGOS ==========
const jogos = [

   { nome: "Assassin's Creed Odyssey", img: "imgs/Play4/ACO.png" },
   { nome: "Batman: Arkham Knight", img: "imgs/Play4/BATAK.png" },
{ nome: "Batllefield 1", img: "imgs/Play3/BATTL1.png" },
{ nome: "bloodborne", img: "imgs/Play4/BLOODB.png" },
{ nome: "Call of Duty: Black Ops III", img: "imgs/Play4/CODBLACK.png" },
{ nome: "Call of Duty: WWII", img: "imgs/Play4/CODWWII.png" },
{ nome: "Call of Duty: MOdern Warfare (2019)", img: "imgs/Play4/CODMW.png" },
{ nome: "Days Gone", img: "imgs/Play4/DG.png" },
{ nome: "Death Stranding", img: "imgs/Play4/DS.png" },
{ nome: "DOOM Eternal", img: "imgs/Play4/DOOM.png" },
{ nome: "Elden Ring", img: "imgs/Play4/ERING.png" },
{ nome: "Fallout 4", img: "imgs/Play4/FALL4.png" },
{ nome: "Final Fantasy VII Remake", img: "imgs/Play4/FFVIIR.png" },
{ nome: "Final Fantasy XV", img: "imgs/Play4/FFXV.png" },
{ nome: "God of War (2018)", img: "imgs/Play4/GOW.png" },
{ nome: "God of War III Remastered", img: "imgs/Play4/GOWR.png" },
{ nome: "God of War: Ragnarok", img: "imgs/Play4/GOWRAGNAROK.png" },
{ nome: "Ghost of Tsushima", img: "imgs/Play4/GHOST.png" },
{ nome: "Gran Turismo Sport", img: "imgs/Play4/GTSPORTS.png" },
{ nome: "Grand Theft Auto V (Premium Edition)", img: "imgs/Play4/GTAV.png" },
{ nome: "Hogwarts Legacy", img: "imgs/Play4/HL.png" },
{ nome: "Horizon Zero Dawn", img: "imgs/Play4/HRD.png" },
{ nome: "Horizon Forbidden West", img: "imgs/Play4/HFW.png" },
{ nome: "Kingdow Hearts III", img: "imgs/Play4/KHIII.png" },
{ nome: "Mafia: Definitive Edition", img: "imgs/Play4/MARFIADE.png" },
{ nome: "Marvel s Spider-Man: Miles Morales", img: "imgs/Play4/SPIDER.png" },
{ nome: "Metal Gear Solid V: The Phantom Pain", img: "imgs/Play4/MGSTPP.png" },
{ nome: "Minecraft: Play Station 4 Edition", img: "imgs/Play4/MINE.png" },
{ nome: "Monster Hunter: World", img: "imgs/Play4/MHW.png" },
{ nome: "Mortal Kombat 11", img: "imgs/Play4/MK11.png" },
{ nome: "Need For Speed Heat", img: "imgs/Play4/NFSH.png" },
{ nome: "Nioh 2", img: "imgs/Play4/NIOHII.png" },
{ nome: "No Man s Sky", img: "imgs/Play4/NMS.png" },
{ nome: "Persona 5 Royal", img: "imgs/Play4/PERSO5R.png" },
{ nome: "Read Dead Redemption 2", img: "imgs/Play4/RDIIR.png" },
{ nome: "Resident Evil 2 (remake)", img: "imgs/Play4/RE2.png" },
{ nome: "Resident Evil 4 (Remake)", img: "imgs/Play4/RE4.png" },
{ nome: "Rise of Tomb Raider", img: "imgs/Play4/ROTTR.png" },
{ nome: "Sekiro: Shadows Die twice", img: "imgs/Play4/SEKIRO.png" },
{ nome: "Shadow of The Colossus", img: "imgs/Play4/SOTC.png" },
{ nome: "Star Wars: Squadrons", img: "imgs/Play4/SWS.png" },
{ nome: "The Last of us Part I", img: "imgs/Play4/TLOU1.png" },
{ nome: "The Last of us Part II", img: "imgs/Play4/TLOUII.png" },
{ nome: "The Last of Remastered", img: "imgs/Play4/TLOUR.png" },
{ nome: "The Witcher 3: Wild Hunt", img: "imgs/Play4/TW3WH.png" },
{ nome: "Tony Hawk s Pro Skater 1+2", img: "imgs/Play4/THPS1M2.png" },
{ nome: "Uncharted 4: A Thief s End", img: "imgs/Play4/U4.png" },
{ nome: "uncharted: The Nathan Drake Collection", img: "imgs/Play4/UTN.png" },
{ nome: "Watch Dogs 2", img: "imgs/Play4/WD2.png" },
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

