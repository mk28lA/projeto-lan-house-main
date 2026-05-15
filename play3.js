// ========== LISTA DE JOGOS ==========
const jogos = [

   { nome: "Assassin's Creed Brotherhood", img: "imgs/Play3/ACB.png" },
   { nome: "Assassin's Creed II", img: "imgs/Play3/ACII.png" },
   { nome: "Assassin's Creed Revelations", img: "imgs/Play3/ACRF.png" },
{ nome: "Batman: Arkham Asylum", img: "imgs/Play3/BAA.png" },
   { nome: "Batman: Arkham City", img: "imgs/Play3/BAC.png" },
{ nome: "Battlefield III", img: "imgs/Play3/BATTLE3.png" },
   { nome: "Bayonetta", img: "imgs/Play3/BAYONETTA.png" },
   { nome: "BioShock", img: "imgs/Play3/BIOSHOCK.png" },
   { nome: "BioShock Infinite", img: "imgs/Play3/BIOSHOCKINFINITE.png" },
   { nome: "Borderlands", img: "imgs/Play3/BORDERLANDS.png" },
   { nome: "Borderlands II", img: "imgs/Play3/BORDERLANDS2.png" },
   { nome: "Call Of Duty: Black Ops", img: "imgs/Play3/CODBO.png" },
   { nome: "Call Of Duty: Black Ops II", img: "imgs/Play3/CODBOII.png" },
   { nome: "Call Of Duty: Modern Warfare II", img: "imgs/Play3/CODMW2.png" },
   { nome: "Call Of Duty: Modern Warfare III", img: "imgs/Play3/CODMW3.png" },
   { nome: "Call Of Duty 4: Modern Warfare", img: "imgs/Play3/COD4.png" },
   { nome: "Castlevania: Lords Of Shadow", img: "imgs/Play3/CLOS.png" },
   { nome: "Dark Souls", img: "imgs/Play3/DSC.png" },
   { nome: "Dark Souls II", img:"imgs/Play3/DS2.png" },
{ nome: "Dead Space", img: "imgs/Play3/DS.png" },
{ nome: "Dead Space II", img: "imgs/Play3/DSII.png" },
{ nome: "Demon's Souls", img: "imgs/Play3/D_SS.png" },
{ nome: "Devil May Cry 4", img: "imgs/Play3/DMC4.png" },
{ nome: "Diablo III", img: "imgs/Play3/DIABLO3.png" },
{ nome: "Fallout 3", img: "imgs/Play3/FALLOUT3.png" },
{ nome: "Fallout: New Vegas", img: "imgs/Play3/FNV.png" },
{ nome: "Far Cry 3", img: "imgs/Play3/Far Cry 3.png" },
{ nome: "Fifa 09", img: "imgs/Play3/FIFA09.png" },
{ nome: "Fifa 10", img: "imgs/Play3/FIFA10.png" },
{ nome: "Fifa 11", img: "imgs/Play3/FIFA11.png" },
{ nome: "Fifa 12", img: "imgs/Play3/FIFA12.png" },
{ nome: "Fifa 13", img: "imgs/Play3/FIFA13.png" },
{ nome: "Fifa 14", img: "imgs/Play3/FIFA14.png" },
{ nome: "Final Fantasy XIII", img: "imgs/Play3/FFXIII.png" },
{ nome: "Final Fantasy XIII 2", img: "imgs/Play3/FFXIII2.png" },
{ nome: "God Of War III", img: "imgs/Play3/GOWIII.png" },
{ nome: "God Of War: Ascension", img: "Imgs/Play3/GOWA.png" },
{ nome: "Gran Turismo 5", img:"imgs/Play3/GT5.png" },
{ nome: "Gran Turismo 5 Prologue", img:"imgs/Play3/GT5P.png" },
{ nome: "Gran Turismo 6", img:"imgs/Play3/GT6.png" },
{ nome: "Grand theft auto IV", img:"imgs/Play3/GTAIV.png" },
{ nome: "Grand Theft Auto V", img:"imgs/Play3/GTA V.png" },
{ nome: "Heavy Rain", img:"imgs/Play3/HR.png" },
{ nome: "The Ico & Shadow of the Colossus Collection", img:"imgs/Play3/TISOTCC.png" },
{ nome: "Infamous 1", img:"imgs/Play3/INFAMOUS.png" },
{ nome: "Infamous 2", img:"imgs/Play3/INFAMOUS2.png" },
{ nome: "Killzone 2", img:"imgs/Play3/KILLZONE2.png" },
{ nome: "Killzone 3", img:"imgs/Play3/KILLZONE3.png" },
{ nome: "L.A. Noire", img:"imgs/Play3/LANOIRE.png" },
{ nome: "Lego Batman", img:"imgs/Play3/LEGOBAT.png" },
{ nome: "Lego Indiano Jones", img:"imgs/Play3/LEGOINDIANAJONES.png" },
{ nome: "Lego Star Wars III", img:"imgs/Play3/LEGOSTARWARS3.png" },
{ nome: "LittleBigPlanet", img:"imgs/Play3/LBP.png" },
{ nome: "LittleBigPlanet 2", img:"imgs/Play3/LBP2.png" },
{ nome: "Mass Effect 2", img:"imgs/Play3/ME2.png" },
{ nome: "Mass Effect 3", img:"imgs/Play3/ME3.png" },
{ nome: "Metal Gear Solid 4: Guns Of The Patriots", img:"imgs/Play3/MGS4GOTP.png" },
{ nome: "Metal Gear Rising: Revengeance", img:"imgs/Play3/MGRR.png" },
{ nome: "Minecraft", img: "imgs/Play3/MINECRAFT.png" },
{ nome: "Motorstorm", img:"imgs/Play3/MSA.png" },
{ nome: "Need For Speed: Hoot Pursuit", img:"imgs/Play3/NFSHP.png" },
{ nome: "Portal 2", img:"imgs/Play3/PORTAL2.png" },
{ nome: "Ratchet & Clank Future: Tolls Of Destruction", img:"imgs/Play3/RATCHETCTFTOD.png" },
{ nome: "Ratchet & Clank Future: A Clack In Time", img:"imgs/Play3/RATCHET.png" },
{ nome: "Red Dead Redemption ", img:"imgs/Play3/RDR.png" },
{ nome: "Resident Evil 5", img:"imgs/Play3/RE5.png" },
{ nome: "Resident Evil 6", img:"imgs/Play3/RE6.png" },
{ nome: "Skate 3", img:"imgs/Play3/SKATE3.png" },
{ nome: "Soul Calibur IV", img:"imgs/Play3/SCIV.png" },
{ nome: "Street Fighter IV ", img:"imgs/Play3/SFIV.png" },
{ nome: "Super Street Fighter IV", img:"imgs/Play3/SSFIV.png" },
{ nome: "Tekken 6", img:"imgs/Play3/TTK6.png" },
{ nome: "The Elder Scrolls V: Skyrim", img:"imgs/Play3/SKYRIM.png" },
{ nome: "The Last Of Us", img:"imgs/Play3/TLOUD.png" },
{ nome: "Tomb Raider (2013)", img:"imgs/Play3/TR.png" },
{ nome: "Uncharted: Drake s Fortune", img:"imgs/Play3/UDF.png" },
{ nome: "Uncharted 2: Among Thieves", img:"imgs/Play3/U2AT.png" },
{ nome: "Uncharted 3: Drake s Deception", img:"imgs/Play3/U3DD.png" },
{ nome: "Warhalk", img:"imgs/Play3/WARHAWK.png" },
{ nome: "XCOM: Enemy Unknown", img: "imgs/Play3/XCOM.png" },
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