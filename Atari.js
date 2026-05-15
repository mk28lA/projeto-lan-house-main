// ========== LISTA DE JOGOS ==========
const jogos = [
{ nome: "Asteroids", img: "imgs/Atari/asteronds.jpeg" },
{ nome: "Battlezone", img: "imgs/Atari/battlezone.jpeg" },
{ nome: "Berzerk", img: "imgs/Atari/berzerk.png" },
{ nome: "Centipede", img: "imgs/Atari/centipede.png" },
{ nome: "Combat", img: "imgs/Atari/combat.png" },
{ nome: "Decathlon", img: "imgs/Atari/Decathlon.png" },
{ nome: "Defender", img: "imgs/Atari/defender.png" },
{ nome: "ET: The Extra Terrestrial", img: "imgs/Atari/et.jpeg" },
{ nome: "Frogger", img: "imgs/Atari/frogger.png" },
{ nome: "Frostbite", img: "imgs/Atari/frostbite.png" },
{ nome: "Galaxian", img: "imgs/Atari/galaxian.png" },
{ nome: "Joust", img: "imgs/Atari/jouse.jpeg" },
{ nome: "Jungle Hunt", img: "imgs/Atari/jungle.png" },
{ nome: "Kangaroo", img: "imgs/Atari/kangoroo.jpeg" },
{ nome: "Keystone Kapers", img: "imgs/Atari/keystone.png" },
{ nome: "Megamania", img: "imgs/Atari/megamania.png" },
{ nome: "Missile Command", img: "imgs/Atari/missilecommand.png" },
{ nome: "Pac-Man", img: "imgs/Atari/pacman.png" },
{ nome: "Pitfall!", img: "imgs/Atari/pitfall.png" },
{ nome: "Phoenix", img: "imgs/Atari/phoenix.jpeg" },
{ nome: "Pole Position", img: "imgs/Atari/poleposition.png" },
{ nome: "River Raid", img: "imgs/Atari/silverband.jpeg" },
{ nome: "Seaquest", img: "imgs/Atari/seaquest.png" },
{ nome: "Space Invaders", img: "imgs/Atari/spaceinvaders.png" },
{ nome: "Spider-Man", img: "imgs/Atari/spiderman.png" },
{ nome: "Superman", img: "imgs/Atari/superman.jpeg" },
{ nome: "Tennis", img: "imgs/Atari/tennis.png" },
{ nome: "Vanguard", img: "imgs/Atari/vanguard.jpeg" },
{ nome: "Yar's Revenge", img: "imgs/Atari/yarsrevenge.png" },


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

