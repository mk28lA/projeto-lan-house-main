let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

function salvar() {
    localStorage.setItem("clientes", JSON.stringify(clientes));
}

function cadastrar() {
    let nome = document.getElementById("nome").value;

    if (nome === "") {
        alert("Digite um nome!");
        return;
    }

    clientes.push({ nome: nome, pontos: 0 });
    document.getElementById("nome").value = "";

    salvar();
    atualizarLista();
}

function adicionarPonto(index) {
    clientes[index].pontos++;
    salvar();
    atualizarLista();
}

function removerCliente(index) {
    clientes.splice(index, 1);
    salvar();
    atualizarLista();
}

function atualizarLista() {
    let lista = document.getElementById("clientes");
    lista.innerHTML = "";

    clientes.forEach((cliente, index) => {
        let li = document.createElement("li");

        li.innerHTML = `
            <span>${cliente.nome} - <span class="pontos">${cliente.pontos} pontos</span></span>
            <div class="acoes">
                <button onclick="adicionarPonto(${index})">+1</button>
                <button class="remover" onclick="removerCliente(${index})">X</button>
            </div>
        `;

        lista.appendChild(li);
    });
}

atualizarLista();