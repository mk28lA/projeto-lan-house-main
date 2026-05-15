// ========== LISTA DE JOGOS ==========
const jogos = [

{ nome: "Assassin's Creed II", img: "imgs/xbox360/AC2.png" },
{ nome: "Assassin's Creed: Ezio Triology", img: "imgs/xbox360/ACET.png" },
{ nome: "Batman: Arkham City", img: "imgs/xbox360/BATAC.png" },
{ nome: "Battlefield 3", img: "imgs/xbox360/BATTLEFIELD3.png" },
{ nome: "BioShock", img: "imgs/xbox360/BS.png" },
{ nome: "BioShock Infinite", img: "imgs/xbox360/BSI.png" },
{ nome: "Borderlands 2", img: "imgs/xbox360/BORDERLANDS2.png" },
{ nome: "Call of Duty: Black Ops", img: "imgs/xbox360/CODBO.png" },
{ nome: "Call of Duty: Black Ops II", img: "imgs/xbox360/CODBO2.png" },
{ nome: "Call of Duty: Modern Warfare 2", img: "imgs/xbox360/CODMW2.png" },
{ nome: "Call of Duty: Modern Warfare 3", img: "imgs/xbox360/CODMW3.png" },
{ nome: "Call of Duty 4: Modern Warfare", img: "imgs/xbox360/COD4MW.png" },
{ nome: "Crackdown", img: "imgs/xbox360/CRACKDOWN.png" },
{ nome: "Dark Souls", img: "imgs/xbox360/DARKS.png" },
{ nome: "Dead or Alive 4", img: "imgs/xbox360/DOA4.png" },
{ nome: "Dead Space", img: "imgs/xbox360/DS.png" },
{ nome: "Dishonored", img: "imgs/xbox360/DISHO.png" },
{ nome: "Fable II", img: "imgs/xbox360/FABLEII.png" },
{ nome: "Fallout 3", img: "imgs/xbox360/FALLOUT3.png" },
{ nome: "Fallout: New Vegas", img: "imgs/xbox360/FNV.png" },
{ nome: "Forza Motorsport 4", img: "imgs/xbox360/FORZAMS4.png" },
{ nome: "Gears of War", img: "imgs/xbox360/GOW.png" },
{ nome: "Gears of War 2", img: "imgs/xbox360/GOW2.png" },
{ nome: "Gears of War 3", img: "imgs/xbox360/GOW3.png" },
{ nome: "Grand Theft Auto IV", img: "imgs/xbox360/GTAIV.png" },
{ nome: "Grand Theft Auto V", img: "imgs/xbox360/GTAV.png" },
{ nome: "Halo 3", img: "imgs/xbox360/HALO3.png" },
{ nome: "Halo 3: ODST", img: "imgs/xbox360/HALO3ODST.png" },
{ nome: "Halo 4", img: "imgs/xbox360/HALO4.png" },
{ nome: "Halo: Reach", img: "imgs/xbox360/HALOREACH.png" },
{ nome: "Kinect Adventures!", img: "imgs/xbox360/KA.png" },
{ nome: "Kinect Sports", img: "imgs/xbox360/KS.png" },
{ nome: "Lost Odyssey", img: "imgs/xbox360/LO.png" },
{ nome: "Mass Effect 2", img: "imgs/xbox360/ME2.png" },
{ nome: "Mass Effect Trilogy", img: "imgs/xbox360/MET.png" },
{ nome: "Minecraft: Xbox 360 Edition", img: "imgs/xbox360/MINE360.png" },
{ nome: "Ninja Gaiden II", img: "imgs/xbox360/NGII.png" },
{ nome: "Portal 2", img: "imgs/xbox360/PORTAL2.png" },
{ nome: "Red Dead Redemption", img: "imgs/xbox360/RDR.png" },
{ nome: "Resident Evil 5", img: "imgs/xbox360/REV.png" },
{ nome: "Skyrim: The Elder Scrolls V", img: "imgs/xbox360/SKYRIM.png" },
{ nome: "Sleeping Dogs", img: "imgs/xbox360/SD.png" },
{ nome: "Sonic Ultimate Genesis Collection", img: "imgs/xbox360/SUGC.png" },
{ nome: "Tom Clancy's Rainbow Six Vegas", img: "imgs/xbox360/TCRSV.png" },
{ nome: "Tomb Raider (2013)", img: "imgs/xbox360/TR2k13.png" },
{ nome: "Viva Piñata", img: "imgs/xbox360/VP.png" },
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

