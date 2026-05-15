// ========== LISTA DE JOGOS ==========
const jogos = [
    { nome: "007 - Tomorrow Never Dies", img: "imgs/Play1/007.png" },
    { nome: "Ace Combat 2", img: "imgs/Play1/AC2.png" },
    { nome: "Ace Combat 3", img: "imgs/Play1/AC3.png" },
    { nome: "Ape Escape", img: "imgs/Play1/AE.png" },
    { nome: "Alunda", img: "imgs/Play1/ALUNDA.png" },
    { nome: "Blood Omen", img: "imgs/Play1/BOLOK.png" },
    { nome: "Castlevania", img: "imgs/Play1/CSOTN.png" },
    { nome: "Crono Cross", img: "imgs/Play1/CC.png" },
    { nome: "Crash Bandicoot 1", img: "imgs/Play1/crash.png" },
    { nome: "Crash Bandicoot 2", img: "imgs/Play1/CRASH2.png" },
    { nome: "Crash Bandicoot 3", img: "imgs/Play1/CRASH3.png" },
    { nome: "Crash Team Racing", img: "imgs/Play1/GTR.png" },   
    { nome: "Dino Crisis", img: "imgs/Play1/DC.png" },
    { nome: "Driver", img: "imgs/Play1/Drive.png" },
    { nome: "Final Fantasy VII", img: "imgs/Play1/FFVII.png" },
    { nome: "Final Fantasy VIII", img: "imgs/Play1/FFVIII.png" },
    { nome: "Final Fantasy IX", img: "imgs/Play1/FFIX.png" },
    { nome: "Gran Turismo 1", img: "imgs/Play1/GT.png" },
    { nome: "Gran Turismo 2", img: "imgs/Play1/GT2.png" },
    { nome: "Jack chan Stuntmaster", img: "imgs/Play1/JCS.png" },
    { nome: "Koudelka", img: "imgs/Play1/Koudelka.png" },
    { nome: "Legacy Of Kain", img: "imgs/Play1/LOKSR.png" },
    { nome: "Medal of Honor 1", img: "imgs/Play1/MOH.png" },
    { nome: "Medal of Honor Underground", img: "imgs/Play1/MOHU.png" },
    { nome: "Metal Gear Solid", img: "imgs/Play1/MGS.png" },
    { nome: "Paraside Eve", img: "imgs/Play1/PE.png" },
    { nome: "Persona 1", img: "imgs/Play1/PERSONA.png" },
    { nome: "Persona 2", img: "imgs/Play1/PERSONA2.png" },
    { nome: "Resident Evil", img: "imgs/Play1/RE.png" },
    { nome: "Resident Evil 2", img: "imgs/Play1/RE2.png" },  
    { nome: "Resident Evil 3", img: "imgs/Play1/RE3.png" },
    { nome: "Silent Hill", img: "imgs/Play1/SH.png" },
    { nome: "Spyro The Dragon", img: "imgs/Play1/SPYRO.png" },
    { nome: "Syphon Filter", img: "imgs/Play1/SF.png" },
    { nome: "Tekken 3", img: "imgs/Play1/TKK3.png" },
    { nome: "Tomb Raider", img: "imgs/Play1/TR.png" }, 
    { nome: "Tomb Raider 2", img: "imgs/Play1/TR2.png" },
    { nome: "Tomb Raider 3", img: "imgs/Play1/TR3.png" },
    { nome: "Tomb Raider Chronicles", img: "imgs/Play1/TRC.png" },
    { nome: "Tomb Raider The Last Revelation", img: "imgs/Play1/TRTLR.png" },
    { nome: "Tony Hawk's Pro Skater", img: "imgs/Play1/THPS.png" },
    { nome: "Tony Hawk's Pro Skater 2", img: "imgs/Play1/TWPS2.png" },
    { nome: "Tony Hawk's Pro Skater 3", img: "imgs/Play1/TWPS3.png" },
    { nome: "Tony Hawk's Pro Skater 4", img: "imgs/Play1/TWPS4.png" },
    { nome: "Twisted Metal", img: "imgs/Play1/TM.png" },
    { nome: "Valkyrie Profile", img: "imgs/Play1/VP.png" },
    { nome: "Wild Arms", img: "imgs/Play1/WA.png" },
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

